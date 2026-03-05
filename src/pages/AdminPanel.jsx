import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Btn1 from '../components/Btn1';
import Btn2 from '../components/Btn2';
import API_URL from '../config';

export default function AdminPanel() {
    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);
    const [leads, setLeads] = useState([]);

    // Form State
    const [formData, setFormData] = useState({ title: '', subtitle: '', description: '', tags: '', images: '' });
    const [isEditing, setIsEditing] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        if (!token) {
            navigate('/admin');
        } else {
            fetchProjects();
            fetchLeads();
        }
    }, [navigate]);

    const fetchLeads = async () => {
        const token = localStorage.getItem('adminToken');
        try {
            const res = await fetch(`${API_URL}/leads`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await res.json();
            if (Array.isArray(data)) setLeads(data);
        } catch (err) {
            console.error(err);
        }
    };

    const fetchProjects = async () => {
        try {
            const res = await fetch(`${API_URL}/projects`);
            const data = await res.json();
            if (Array.isArray(data)) setProjects(data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        navigate('/admin');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('adminToken');

        const payload = {
            ...formData,
            tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
            images: formData.images.split(',').map(url => url.trim()).filter(Boolean)
        };

        const url = isEditing ? `${API_URL}/projects/${isEditing}` : `${API_URL}/projects`;
        const method = isEditing ? 'PUT' : 'POST';

        try {
            const res = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });
            if (res.ok) {
                setFormData({ title: '', subtitle: '', description: '', tags: '', images: '' });
                setIsEditing(null);
                fetchProjects();
            } else {
                alert('Failed to save project');
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleEdit = (p) => {
        setFormData({
            title: p.title,
            subtitle: p.subtitle,
            description: p.description,
            tags: p.tags.join(', '),
            images: p.images.join(', ')
        });
        setIsEditing(p._id);
    };

    const handleDelete = async (id) => {
        const token = localStorage.getItem('adminToken');
        if (window.confirm('Are you sure you want to delete this project?')) {
            try {
                const res = await fetch(`${API_URL}/projects/${id}`, {
                    method: 'DELETE',
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (res.ok) fetchProjects();
            } catch (err) {
                console.error(err);
            }
        }
    };

    const handleDeleteLead = async (id) => {
        const token = localStorage.getItem('adminToken');
        if (window.confirm('Are you sure you want to delete this lead submission?')) {
            try {
                const res = await fetch(`${API_URL}/leads/${id}`, {
                    method: 'DELETE',
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (res.ok) fetchLeads();
            } catch (err) {
                console.error(err);
            }
        }
    };

    const inputStyle = {
        padding: '0.8rem', backgroundColor: 'transparent', border: '1px solid var(--yellow)',
        color: 'var(--yellow)', outline: 'none', fontFamily: 'var(--font-family)', fontSize: '1rem',
        borderRadius: '4px', width: '100%', boxSizing: 'border-box'
    };

    return (
        <div className="home-container-1" style={{ minHeight: '100vh', padding: '8rem 2rem', alignItems: 'center' }}>
            <div style={{ width: '100%', maxWidth: '1200px', display: 'flex', flexDirection: 'column', zIndex: 10 }}>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                    <h1 className="home-t" style={{ fontSize: 'var(--font-scale-2)' }}>ADMIN PANEL</h1>
                    <button onClick={handleLogout} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                        <Btn2 text="LOGOUT" />
                    </button>
                </div>

                <section style={{ marginBottom: '4rem', padding: '2rem', border: '1px solid var(--yellow)', borderRadius: '8px', background: 'rgba(0,0,0,0.5)' }}>
                    <h2 style={{ color: 'var(--yellow)', fontFamily: 'var(--font-family)', marginBottom: '1.5rem' }}>
                        {isEditing ? 'Edit Project' : 'Add New Project'}
                    </h2>
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <input style={inputStyle} type="text" placeholder="Title" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} required />
                        <input style={inputStyle} type="text" placeholder="Subtitle" value={formData.subtitle} onChange={e => setFormData({ ...formData, subtitle: e.target.value })} required />
                        <textarea style={{ ...inputStyle, minHeight: '100px' }} placeholder="Description" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} required />
                        <input style={inputStyle} type="text" placeholder="Tags (comma separated)" value={formData.tags} onChange={e => setFormData({ ...formData, tags: e.target.value })} />
                        <input style={inputStyle} type="text" placeholder="Image URLs (comma separated)" value={formData.images} onChange={e => setFormData({ ...formData, images: e.target.value })} />

                        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                            <button type="submit" style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}>
                                <Btn1 text={isEditing ? 'UPDATE PROJECT' : 'SAVE PROJECT'} />
                            </button>
                            {isEditing && (
                                <button type="button" onClick={() => { setIsEditing(null); setFormData({ title: '', subtitle: '', description: '', tags: '', images: '' }); }} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}>
                                    <Btn2 text="CANCEL" />
                                </button>
                            )}
                        </div>
                    </form>
                </section>

                <section>
                    <h3 style={{ color: 'var(--yellow)', fontFamily: 'var(--font-family)', marginBottom: '1.5rem' }}>Current Projects ({projects.length})</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
                        {projects.map(p => (
                            <div key={p._id} style={{ border: '1px solid rgba(255, 217, 0, 0.4)', padding: '1.5rem', borderRadius: '4px', background: 'rgba(0,0,0,0.6)', display: 'flex', flexDirection: 'column' }}>
                                <h4 style={{ color: 'var(--yellow)', margin: '0 0 0.5rem 0', fontFamily: 'var(--font-family)', fontSize: '1.2rem' }}>{p.title}</h4>
                                <p style={{ color: '#ccc', margin: '0 0 1rem 0', fontSize: '0.9rem', flexGrow: 1 }}>{p.subtitle}</p>
                                <div style={{ display: 'flex', gap: '1rem' }}>
                                    <button onClick={() => handleEdit(p)} style={{ background: 'none', border: '1px solid var(--yellow)', color: 'var(--yellow)', padding: '0.5rem 1rem', cursor: 'pointer', borderRadius: '4px' }}>Edit</button>
                                    <button onClick={() => handleDelete(p._id)} style={{ background: 'none', border: '1px solid #ff4444', color: '#ff4444', padding: '0.5rem 1rem', cursor: 'pointer', borderRadius: '4px' }}>Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section style={{ marginTop: '4rem', marginBottom: '4rem' }}>
                    <h3 style={{ color: 'var(--yellow)', fontFamily: 'var(--font-family)', marginBottom: '1.5rem' }}>Lead Submissions ({leads.length})</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
                        {leads.map(lead => (
                            <div key={lead._id} style={{ border: '1px solid rgba(255, 217, 0, 0.4)', padding: '1.5rem', borderRadius: '4px', background: 'rgba(0,0,0,0.6)', display: 'flex', flexDirection: 'column' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                                    <h4 style={{ color: 'var(--yellow)', margin: 0, fontFamily: 'var(--font-family)', fontSize: '1.2rem' }}>{lead.name}</h4>
                                    <span style={{ fontSize: '0.8rem', color: '#888' }}>{new Date(lead.createdAt).toLocaleDateString()}</span>
                                </div>
                                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', fontSize: '0.9rem' }}>
                                    {lead.email && <a href={`mailto:${lead.email}`} style={{ color: '#ccc', textDecoration: 'none' }}>✉ {lead.email}</a>}
                                    {lead.phone && <a href={`tel:${lead.phone}`} style={{ color: '#ccc', textDecoration: 'none' }}>☏ {lead.phone}</a>}
                                </div>
                                <div style={{ color: '#eee', flexGrow: 1, padding: '1rem', background: 'rgba(0,0,0,0.3)', borderRadius: '4px', whiteSpace: 'pre-wrap', fontSize: '0.95rem', marginBottom: '1rem' }}>
                                    {lead.message}
                                </div>
                                <button onClick={() => handleDeleteLead(lead._id)} style={{ background: 'none', border: '1px solid #ff4444', color: '#ff4444', padding: '0.4rem 0.8rem', cursor: 'pointer', borderRadius: '4px', alignSelf: 'flex-start', fontSize: '0.8rem' }}>Delete Lead</button>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}
