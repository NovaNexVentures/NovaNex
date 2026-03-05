import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Btn1 from '../components/Btn1';
import '../styles/Home.css';
import '../styles/Home-Card.css';
import API_URL from '../config';

export default function Projects() {
    const [projects, setProjects] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${API_URL}/projects`)
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) setProjects(data);
            })
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="home-container-2" style={{ padding: '8rem 2rem', alignItems: 'center', minHeight: '100vh', display: 'flex' }}>
            <div style={{ width: '100%', maxWidth: '1200px', display: 'flex', flexDirection: 'column', zIndex: 10 }}>
                <div style={{ textAlign: 'left', marginBottom: '4rem', marginLeft: '5%' }}>
                    <p className="hero-eyebrow" style={{ color: 'var(--yellow)', fontSize: '12px', letterSpacing: '0.22em', marginBottom: '1rem', fontFamily: 'var(--font-mono, monospace)', textTransform: 'uppercase' }}>/ PORTFOLIO</p>
                    <h1 className="home-t" style={{ fontSize: 'clamp(40px, 6vw, 80px)', lineHeight: 1, marginBottom: '1.5rem', textTransform: 'uppercase' }}>
                        OUR <span style={{ color: 'var(--yellow)' }}>PROJECTS</span>
                    </h1>
                    <p className="hero-sub" style={{ margin: '0', maxWidth: '600px' }}>
                        Explore our cutting-edge work, engineered to perfection and matched with exceptional digital experiences.
                    </p>
                </div>

                {projects.length === 0 ? (
                    <p style={{ textAlign: 'center', color: '#888', fontFamily: 'var(--font-mono, monospace)' }}>No projects available yet.</p>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem', width: '100%' }}>
                        {projects.map(p => (
                            <article
                                key={p._id}
                                className="HC-card"
                                onClick={() => navigate(`/projects/${p._id}`)}
                                style={{
                                    cursor: 'pointer',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    paddingBottom: '30px',
                                    width: '100%',
                                    height: 'auto',
                                    minHeight: '380px'
                                }}
                            >
                                <div className="HC-grid" aria-hidden="true" />

                                {p.images && p.images[0] && (
                                    <div style={{ padding: '0 24px', paddingTop: '24px' }}>
                                        <img src={p.images[0]} alt={p.title} style={{ width: '100%', height: '220px', objectFit: 'cover', border: '1px solid var(--border)' }} />
                                    </div>
                                )}

                                <div className="HC-content" style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', paddingTop: p.images && p.images[0] ? '20px' : '28px' }}>
                                    <h3 className="HC-title" style={{ fontSize: '24px', textTransform: 'uppercase', marginBottom: '12px' }}>{p.title}</h3>
                                    <h4 className="HC-sub" style={{ lineHeight: 1.5, marginBottom: '20px', fontSize: '13px' }}>{p.subtitle}</h4>

                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '30px', flexGrow: 1 }}>
                                        {p.tags.slice(0, 4).map(tag => (
                                            <span key={tag} style={{
                                                fontFamily: '"JetBrains Mono", monospace',
                                                fontSize: '10px',
                                                color: 'var(--yellow)',
                                                textTransform: 'uppercase',
                                                letterSpacing: '0.15em',
                                                padding: '4px 10px',
                                                border: '1px solid var(--border)'
                                            }}>
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <div style={{ alignSelf: 'flex-start' }}>
                                        <Btn1 text="VIEW DETAILS" />
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
