import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Btn1 from '../components/Btn1';
import '../styles/Home.css'; // inherit global aesthetic
import API_URL from '../config';

export default function AdminLogin() {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password })
            });
            const data = await res.json();

            if (data.success) {
                localStorage.setItem('adminToken', data.token);
                navigate('/admin/panel');
            } else {
                setError(data.message || 'Login failed');
            }
        } catch (err) {
            setError('Error connecting to server');
        }
    };

    return (
        <div className="home-container-1" style={{ alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '2rem' }}>
            <div style={{ maxWidth: '400px', width: '100%', textAlign: 'center', zIndex: 10 }}>
                <h1 className="home-t" style={{ fontSize: 'var(--font-scale-2)', marginBottom: '1rem' }}>ADMIN LOGIN</h1>
                {error && <p style={{ color: 'red', marginBottom: '1rem' }}>{error}</p>}
                <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <input
                        type="password"
                        placeholder="Enter Admin Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{
                            padding: '1rem',
                            backgroundColor: 'transparent',
                            border: '1px solid var(--yellow)',
                            color: 'var(--yellow)',
                            outline: 'none',
                            fontFamily: 'var(--font-family)',
                            fontSize: '1rem',
                            borderRadius: '4px'
                        }}
                    />
                    <button type="submit" style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', alignSelf: 'center' }}>
                        <Btn1 text="LOGIN" />
                    </button>
                </form>
            </div>
        </div>
    );
}
