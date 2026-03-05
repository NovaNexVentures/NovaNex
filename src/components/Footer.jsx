import React from 'react';
import Btn2 from './Btn2.jsx';
import logo from '../assets/footer logo.svg';
import '../styles/Footer.css';
import { useNavigate } from 'react-router-dom';

export default function Footer() {
  const navigate = useNavigate();

  const handleNavClick = (id) => {
    if (window.location.pathname === '/') {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        window.history.pushState(null, '', `/#${id}`);
      } else {
        window.location.href = `/#${id}`;
      }
    } else {
      window.location.href = `/#${id}`;
    }
  };

  return (
    <div className='footer-bg'>
      <footer className="footer-inner" role="contentinfo">

        <div className="footer-cta">
          <div className="footer-cta-text">
            <h2>Ready to Innovate?</h2>
            <p>Transform your business with cutting-edge AI automation and bespoke software solutions.</p>
          </div>
          <div onClick={() => handleNavClick('get-in-touch')}>
            <Btn2 text="BOOK A FREE SESSION" />
          </div>
        </div>

        <div className="footer-grid">
          <div className="footer-col footer-brand">
            <img src={logo} alt="NovaNex Logo" className="footer-logo" />
            <p>
              NovaNex empowers visionary businesses worldwide with transformative technology, intuitive design, and AI-driven excellence.
            </p>
          </div>

          <div className="footer-col">
            <h4>QUICK LINKS</h4>
            <ul className="footer-list">
              <li><button onClick={() => navigate('/')} className="footer-link" style={{ background: 'none', border: 'none', padding: 0, fontFamily: 'inherit', cursor: 'pointer', textAlign: 'left' }}>HOME</button></li>
              <li><button onClick={() => handleNavClick('about')} className="footer-link" style={{ background: 'none', border: 'none', padding: 0, fontFamily: 'inherit', cursor: 'pointer', textAlign: 'left' }}>ABOUT</button></li>
              <li><button onClick={() => navigate('/projects')} className="footer-link" style={{ background: 'none', border: 'none', padding: 0, fontFamily: 'inherit', cursor: 'pointer', textAlign: 'left' }}>PROJECTS</button></li>
              <li><button onClick={() => handleNavClick('services')} className="footer-link" style={{ background: 'none', border: 'none', padding: 0, fontFamily: 'inherit', cursor: 'pointer', textAlign: 'left' }}>SERVICES</button></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>CONTACT</h4>
            <div className="contact-info">
              <span>info@novanex.com.pk</span>
              <a href="mailto:contact@novanex.com.pk">contact@novanex.com.pk</a>
              <a href="tel:+923265025286">+92 (326) 5025286</a>
            </div>
          </div>

          <div className="footer-col">
            <h4>FOLLOW US</h4>
            <ul className="footer-list">
              <li><a href="https://twitter.com/novanexventures" className="footer-link">TWITTER (X)</a></li>
              <li><a href="https://www.linkedin.com/company/novanexventures/" className="footer-link">LINKEDIN</a></li>
              <li><a href="https://github.com/NovaNexVentures" className="footer-link">GITHUB</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} NOVANEX. ALL RIGHTS RESERVED.</p>
          <div className="footer-legal">
            <a href="#">PRIVACY POLICY</a>
            <a href="#">TERMS OF SERVICE</a>
          </div>
        </div>

      </footer>
    </div>
  );
}
