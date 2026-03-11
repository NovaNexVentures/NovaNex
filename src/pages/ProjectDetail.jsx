import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Btn2 from '../components/Btn2';
import '../styles/Home.css';
import '../styles/Home-Card.css';
import API_URL from '../config';

export default function ProjectDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${API_URL}/projects/${id}`)
            .then(res => res.json())
            .then(data => {
                if (data._id) setProject(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return <div className="home-container-2" style={{ padding: '8rem 2rem', alignItems: 'center', minHeight: '100vh' }}><p style={{ color: 'var(--yellow)', fontFamily: '"JetBrains Mono", monospace' }}>[ LOADING PROJECT ]</p></div>;
    }

    if (!project) {
        return (
            <div className="home-container-2" style={{ padding: '8rem 2rem', alignItems: 'center', minHeight: '100vh' }}>
                <p style={{ color: 'red', marginBottom: '2rem', fontFamily: '"JetBrains Mono", monospace' }}>[ ERROR: PROJECT NOT FOUND ]</p>
                <div onClick={() => navigate('/projects')} style={{ cursor: 'pointer' }}><Btn2 text="BACK TO PROJECTS" /></div>
            </div>
        );
    }

    return (
        <div className="home-container-2" style={{ padding: '8rem 2rem', alignItems: 'center', minHeight: '100vh' }}>
            <div style={{ width: '100%', maxWidth: '1000px', display: 'flex', flexDirection: 'column', zIndex: 10 }}>
                <div style={{ marginBottom: '4rem', alignSelf: 'flex-start' }}>
                    <div onClick={() => { navigate('/projects'); window.scrollTo(0, 0); }} style={{ cursor: 'pointer' }}>
                        <Btn2 text="← ALL PROJECTS" />
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '3rem' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '1rem' }}>
                        {project.tags.map(tag => (
                            <span key={tag} style={{
                                fontFamily: '"JetBrains Mono", monospace',
                                fontSize: '11px',
                                color: 'var(--yellow)',
                                textTransform: 'uppercase',
                                letterSpacing: '0.15em',
                                padding: '6px 14px',
                                border: '1px solid var(--border)'
                            }}>
                                {tag}
                            </span>
                        ))}
                    </div>

                    <h1 className="home-t" style={{ fontSize: 'clamp(48px, 6vw, 96px)', lineHeight: 1, textTransform: 'uppercase', margin: 0 }}>
                        {project.title}
                    </h1>
                    <p className="HC-sub" style={{ fontSize: 'clamp(18px, 2vw, 24px)', color: '#ccc', marginTop: '1rem', maxWidth: '800px', lineHeight: 1.5 }}>
                        {project.subtitle}
                    </p>

                    {project.projectLink && (
                        <div style={{ marginTop: '2rem' }}>
                            <a href={project.projectLink} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                                <Btn2 text="VISIT LIVE PROJECT ↗" />
                            </a>
                        </div>
                    )}
                </div>

                {project.images && project.images[0] && (
                    <div style={{ width: '100%', marginBottom: '4rem' }}>
                        <img src={project.images[0]} alt={project.title} style={{ width: '100%', maxHeight: '700px', objectFit: 'cover', border: '1px solid var(--border)' }} />
                    </div>
                )}

                <div className="HC-card" style={{
                    padding: '3rem 4rem',
                    display: 'flex',
                    flexDirection: 'column',
                    border: '1px solid var(--border)',
                    position: 'relative',
                    width: '100%',
                    height: 'auto',
                    overflow: 'visible'
                }}>
                    <div className="HC-grid" aria-hidden="true" />
                    <h3 style={{
                        fontFamily: '"JetBrains Mono", monospace',
                        fontSize: '12px',
                        color: 'var(--yellow)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.2em',
                        marginBottom: '2rem',
                        position: 'relative',
                        zIndex: 2
                    }}>
                        / PROJECT OVERVIEW
                    </h3>
                    <div className="HC-desc" style={{
                        color: '#ddd',
                        lineHeight: '1.8',
                        fontSize: '16px',
                        whiteSpace: 'pre-wrap',
                        maxWidth: '800px',
                        position: 'relative',
                        zIndex: 2
                    }}>
                        {project.description.split(/(#.*?#)/g).map((part, index) => {
                            if (part.startsWith('#') && part.endsWith('#') && part.length > 2) {
                                const headingText = part.slice(1, -1).trim();
                                return (
                                    <h3 key={index} style={{
                                        fontFamily: '"JetBrains Mono", monospace',
                                        fontSize: '12px',
                                        color: 'var(--yellow)',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.2em',
                                        marginTop: '2.5rem',
                                        marginBottom: '1rem',
                                        display: 'block'
                                    }}>
                                        / {headingText}
                                    </h3>
                                );
                            }
                            return <span key={index}>{part}</span>;
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
