import React, { useState, useEffect, useRef } from 'react'
import Btn1 from '../components/Btn1.jsx'
import Btn2 from '../components/Btn2.jsx'
import HomeCard from '../components/Home-Card.jsx'
import card1 from '../assets/card1.svg'
import MovingS from '../components/MovingS.jsx'
import Globe from '../components/Globe.jsx';
import '../styles/Home.css'
import API_URL from '../config';

export default function Home() {
  const aboutRef = useRef(null)
  const [aboutInView, setAboutInView] = useState(false)

  const ctaRef = useRef(null)
  const [ctaInView, setCtaInView] = useState(false)
  const [showSuccessPopup, setShowSuccessPopup] = useState(false)

  useEffect(() => {
    if (!aboutRef.current) return
    const el = aboutRef.current
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setAboutInView(true)
            obs.disconnect()
          }
        })
      },
      { root: null, rootMargin: '0px 0px -20% 0px', threshold: 0.15 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (!ctaRef.current) return
    const el = ctaRef.current
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCtaInView(true)
            obs.disconnect()
          }
        })
      },
      { root: null, rootMargin: '0px 0px -20% 0px', threshold: 0.15 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  const products = [
    {
      id: 'ai-automation',
      icon: '⟲',
      title: 'AI-Powered Automation',
      bannerTitle: 'AI-Powered Automation',
      description:
        "STREAMLINING COMPLEX BUSINESS WORKFLOWS WITH INTELLIGENT, AUTOMATED SYSTEMS THAT REDUCE OPERATIONAL OVERHEAD AND MAXIMIZE TEAM PRODUCTIVITY."
    },
    {
      id: 'Send',
      icon: '✈',
      title: 'Custom SaaS Solutions',
      bannerTitle: 'Custom SaaS Solutions',
      description:
        'BUILDING SCALABLE SOFTWARE AS A SERVICE PLATFORMS FEATURING MULTI-TENANT ARCHITECTURES DESIGNED FOR SEAMLESS PERFORMANCE AND GROWTH.',
    },
    {
      id: 'market',
      icon: '▦',
      title: 'Predictive AI Modeling',
      bannerTitle: 'Predictive AI Modeling',
      description: 'USING ADVANCED MACHINE LEARNING TO FORECAST KEY TRENDS AND STRATEGIC BUSINESS OUTCOMES FOR ENHANCED OPERATIONAL SUCCESS.',
    },
    {
      id: 'ephemeral',
      icon: '▣',
      title: 'Natural Language Processing (NLP)',
      bannerTitle: 'Natural Language Processing',
      description: 'IMPLEMENTING ARTIFICIAL INTELLIGENCE THAT CAN UNDERSTAND INTERPRET AND GENERATE HUMAN LANGUAGE FOR SUPERIOR SUPPORT AND AUTOMATION.',
    },
    {
      id: 'api',
      icon: '▤',
      title: 'Third-Party API Integrations',
      bannerTitle: 'Third-Party API Integrations',
      description: 'CONNECTING YOUR EXISTING TOOLS TO EXTERNAL SERVICES LIKE PAYMENT GATEWAYS OR CRM SYSTEMS FOR SEAMLESS INTEGRATION..',
    },
    {
      id: 'docs',
      icon: '▤',
      title: 'Cloud System Integration',
      bannerTitle: 'Cloud System Integration',
      description: 'CONNECTING DISPARATE SOFTWARE AND ENTERPRISE SYSTEMS INTO A UNIFIED CLOUD ENVIRONMENT FOR OPTIMIZED DATA FLOW AND EFFICIENCY.',
    },
  ];

  const [selectedProduct, setSelectedProduct] = useState(0);

  const faqs = [
    {
      q: 'HOW DOES NOVANEX ENSURE EXCELLENCE?',
      a: 'We use a collaborative process to deliver high-performance solutions that exceed your specific business expectations.',
    },
    {
      q: 'WHAT SERVICES DO YOU PROVIDE?',
      a: 'Our expertise includes custom software development, AI automation, web solutions, and advanced API integrations.',
    },
    {
      q: 'WHO ARE YOUR IDEAL CLIENTS?',
      a: 'We empower visionary businesses worldwide with cutting-edge technology to drive innovation and sustainable growth.',
    },
    {
      q: 'WHAT SETS YOUR AGENCY APART?',
      a: 'We redefine digital innovation by combining intuitive design with powerful technology that sets industry standards.',
    },
    {
      q: 'HOW DO WE GET STARTED?',
      a: 'Book a free session today to transform your visionary ideas into powerful digital experiences.',
    },
  ];

  const [openFaq, setOpenFaq] = useState(-1); // start closed by default

  function toggleFaq(i) {
    // debug: log toggles so it's easy to verify in browser console
    // (remove this log when debugging is complete)
    // eslint-disable-next-line no-console
    console.log('toggleFaq', { index: i, prev: openFaq });
    setOpenFaq((prev) => (prev === i ? -1 : i));
  }

  function selectProduct(index) {
    setSelectedProduct(index);
  }

  return (
    <>
      <section className="home-container-1">
        <div className="hero">
          <div className='hero-1'>
            <div className="hero-left">
              <div className="headline">
                <h1 className="home-t home-t1"><span className='home-t-sp1'>CREATE</span><span className='home-t-sp2'>CONNECT</span></h1>
                <h1 className="home-t home-t2"><span className='home-t-sp3'>INNOVATE</span><span className='home-t-sp4'></span></h1>

              </div>

              <p className="hero-sub">
                Transforming ideas into digital reality. We craft cutting-edge solutions
                <br />
                that drive growth and innovation for businesses worldwide.
              </p>

              <div className="hero-ctas">
                <div role="button" tabIndex={0} onClick={() => { document.getElementById('get-in-touch')?.scrollIntoView({ behavior: 'smooth' }); }}>
                  <Btn1 text="BOOK A FREE SESSION" />
                </div>
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => { window.location.href = '/#services'; }}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); window.location.href = '/#services'; } }}
                >
                  <Btn2 text="OUR SERVICES" />
                </div>
              </div>
            </div>
            <div className="hero-right">
              <Globe />
            </div>
          </div>
        </div>

        <div className="cards-row">
          <HomeCard
            icon={card1}
            title={'SOFTWARE DEVELOPMENT'}
            subtitle={'Custom software solutions tailored to your business needs'}
            description={'From web applications to enterprise systems.'}
          />

          <HomeCard
            icon={card1}
            title={'AI AUTOMATION'}
            subtitle={'AI-driven solutions automate complexity, gaining insights'}
            description={'and delivering smart results.'}
          />

          <HomeCard
            icon={card1}
            title={'API DEVELOPMENT'}
            subtitle={'Build secure, scalable apis for high-performance data'}
            description={' exchange and seamless ecosystem integration.'}
          />
        </div>

      </section>
      <section className='home-container-2' id="about">
        <div className="About-App">
          <div className="About-left">
            <p className="About-sub">
              /ABOUT APP
            </p>
            <div className={`About-headline ${aboutInView ? 'in-view' : ''}`} ref={aboutRef}>
              <h1 className="About-t About-t1 About-t-all"><span className='About-Words about-w-1'>CRAFTING</span><span className='About-Words about-w-2'>DIGITAL</span><span className='About-Words about-w-3'>EXCELLENCE</span><span className='About-Words about-w-4'></span></h1>
              <h1 className="About-t About-t2 About-t-all"><span className='About-Words about-w-5'></span><span className='About-Words about-w-6'></span><span className='About-Words about-w-7'></span></h1>
              <h1 className="About-t About-t2 About-t-all"><span className='About-Words about-w-8'></span><span className='About-Words about-w-9'></span><span className='About-Words about-w-10'></span></h1>
              <h1 className="About-t About-t2 About-t-all"><span className='About-Words about-w-11'></span><span className='About-Words about-w-12'></span><span className='About-Words about-w-13'></span></h1>
            </div>
          </div>
        </div>

        <div className="About-cards-row">
          <HomeCard
            className="About-Card"
            title={'/ MISSION'}
            subtitle={''}
            description={<>
              NOVANEX REDEFINES INNOVATION. WE BUILD POWERFUL, ACCESSIBLE TECHNOLOGY BY PUSHING BOUNDARIES AND CHALLENGING THE STATUS QUO.
            </>}
          />

          <HomeCard
            className="About-Card"
            title={'/ VISION'}
            subtitle={''}
            description={<>
              WE BELIEVE IN A COLLABORATIVE PROCESS THAT PUTS YOUR VISION AT THE CENTER. OUR ITERATIVE APPROACH ENSURES WE DELIVER SOLUTIONS THAT NOT ONLY MEET BUT EXCEED YOUR EXPECTATIONS.
            </>}
          />
        </div>
      </section>
      <MovingS />

      <section className='home-container-3'>
        <div className="home-section-3">
          <video
            className="bg-video"
            src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
            autoPlay
            muted
            loop
            playsInline
          />

          <div className="video-overlay" />

          <div className="center-plus" aria-hidden="true">
            <span className="plus-vertical" />
            <span className="plus-horizontal" />
          </div>

          <div className="corner top-left" />
          <div className="corner top-right" />
          <div className="corner bottom-left" />
          <div className="corner bottom-right" />

          <div className="section-caption">COLLABORATIVE PROCESS PUTS VISION AT CENTER TO EXCEED EXPECTATIONS.</div>
        </div>
      </section>

      <section className='home-container-4' id="projects">
        <div className="home-section-4">
          <div className="grid-bg" aria-hidden="true"></div>

          <div className={`CTA-heading ${ctaInView ? 'in-view' : ''}`} ref={ctaRef}>
            <h1 className="CTA-line"><span className="CTA-word cta-w-1">EMPOWERING</span> <span className="CTA-word cta-w-2">BUSINESSES</span> <span className="CTA-word cta-w-3">WITH</span><span className="CTA-word cta-w-4">CUTTING-EDGE</span> <span className="CTA-word cta-w-5">TECHNOLOGY</span></h1>
            <h1 className="CTA-line"> <span className="CTA-word cta-w-6">AND</span> <span className="CTA-word cta-w-7">INNOVATIVE</span> <span className="CTA-word cta-w-8">DIGITAL</span></h1>
            <h1 className="CTA-line"><span className="CTA-word cta-w-9">EXPERIENCES</span> <span className="CTA-word cta-w-10"></span> <span className="CTA-word cta-w-11"></span> <span className="CTA-word cta-w-12"></span></h1>
          </div>

          <div className="CTA">
            <div className="cta-btn btn1-wrap" onClick={() => window.location.href = '/projects'}>
              <Btn1 text="OUR PROJECTS" />
            </div>
            <div className="cta-btn btn2-wrap">
              <div>
                <Btn2 text="LET'S CONNECT" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='home-container-5' id="services">
        <h3 className="products-heading">SOFTWARE SOLUTIONS FOR EVERY<br />USE CASE</h3>
        <div className="products-section">
          <div className="products-left">
            <ul className="products-list">
              {products.map((p, i) => (
                <li
                  key={p.id}
                  role="button"
                  tabIndex={0}
                  className={`products-item ${selectedProduct === i ? 'active' : ''}`}
                  onClick={() => selectProduct(i)}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') selectProduct(i); }}
                >
                  <span className="products-icon">{p.icon}</span>
                  <span className="products-label">{p.title}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="products-right">
            <div className="products-panel">
              <div className="products-panel-grid" aria-hidden="true"></div>
              <h2 className="products-title">{products[selectedProduct].bannerTitle.split('\n').map((line, idx) => (
                <span key={idx}>{line}<br /></span>
              ))}</h2>
              <p className="products-desc">{products[selectedProduct].description}</p>
            </div>
          </div>
        </div>
      </section>

      <section className='home-container-6' id="get-in-touch">
        <div className="lead-form-section" style={{ padding: '4rem 2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: 'transparent' }}>
          <p className="faq-pretitle" style={{ width: '100%', maxWidth: '800px', textAlign: 'left' }}>/ Get in touch</p>
          <h2 className="faq-heading" style={{ width: '100%', maxWidth: '800px', textAlign: 'left', marginBottom: '2rem' }}>START YOUR NEXT BIG<br />PROJECT WITH US</h2>

          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const form = e.target;
              const data = {
                name: form.name.value,
                email: form.email.value,
                phone: form.phone.value,
                message: form.message.value
              };
              try {
                const res = await fetch(`${API_URL}/leads`, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(data)
                });
                if (res.ok) {
                  setShowSuccessPopup(true);
                  form.reset();
                } else {
                  alert('Something went wrong. Please try again later.');
                }
              } catch (err) {
                alert('Network error. Please make sure the server is running.');
              }
            }}
            style={{
              width: '100%',
              maxWidth: '800px',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
              background: 'rgba(0,0,0,0.5)',
              padding: '2rem',
              border: '1px solid var(--yellow)',
              borderRadius: '8px'
            }}
          >
            <div className="contact-form-row">
              <input
                type="text" name="name" placeholder="Your Name" required
                style={{ padding: '1rem', background: 'transparent', border: '1px solid rgba(255, 217, 0, 0.4)', color: 'white', borderRadius: '4px', outline: 'none', fontFamily: 'var(--font-family)', fontSize: '1rem' }}
                onFocus={(e) => e.target.style.borderColor = 'var(--yellow)'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(255, 217, 0, 0.4)'}
              />
              <input
                type="email" name="email" placeholder="Your Email" required
                style={{ padding: '1rem', background: 'transparent', border: '1px solid rgba(255, 217, 0, 0.4)', color: 'white', borderRadius: '4px', outline: 'none', fontFamily: 'var(--font-family)', fontSize: '1rem' }}
                onFocus={(e) => e.target.style.borderColor = 'var(--yellow)'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(255, 217, 0, 0.4)'}
              />
            </div>
            <input
              type="tel" name="phone" placeholder="Your Phone Number"
              style={{ padding: '1rem', background: 'transparent', border: '1px solid rgba(255, 217, 0, 0.4)', color: 'white', borderRadius: '4px', outline: 'none', fontFamily: 'var(--font-family)', fontSize: '1rem' }}
              onFocus={(e) => e.target.style.borderColor = 'var(--yellow)'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(255, 217, 0, 0.4)'}
            />
            <textarea
              name="message" placeholder="Tell us about your project" required rows="4"
              style={{ padding: '1rem', background: 'transparent', border: '1px solid rgba(255, 217, 0, 0.4)', color: 'white', borderRadius: '4px', outline: 'none', fontFamily: 'var(--font-family)', fontSize: '1rem', resize: 'vertical' }}
              onFocus={(e) => e.target.style.borderColor = 'var(--yellow)'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(255, 217, 0, 0.4)'}
            ></textarea>
            <button type="submit" style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', alignSelf: 'flex-start', marginTop: '0.5rem' }}>
              <Btn1 text="SUBMIT INQUIRY" />
            </button>
          </form>
        </div>
      </section>

      <section className='home-container-7'>
        <div className="faq-section">
          <p className="faq-pretitle">/ Frequently Asked Questions</p>
          <h2 className="faq-heading">YOUR MOST COMMON<br />QUESTIONS ABOUT APP ANSWERED</h2>

          <div className="faq-list-wrap">
            <ul className="faq-list">
              {faqs.map((f, i) => (
                <li key={i} className={`faq-item ${openFaq === i ? 'open' : ''}`}>
                  <button
                    type="button"
                    className="faq-question"
                    onClick={() => toggleFaq(i)}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleFaq(i); } }}
                    aria-expanded={openFaq === i}
                  >
                    <span className="faq-qtext">{f.q}</span>
                    <span className="faq-toggle" aria-hidden="true">{openFaq === i ? '×' : '+'}</span>
                  </button>

                  <div className="faq-body" aria-hidden={openFaq === i ? 'false' : 'true'}>
                    {f.a.split('\n').map((line, idx) => (
                      <p key={idx}>{line}</p>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {showSuccessPopup && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000,
          backdropFilter: 'blur(5px)'
        }}>
          <div style={{
            background: 'rgba(10, 10, 10, 0.95)',
            border: '1px solid var(--yellow)',
            padding: '3rem 2rem',
            borderRadius: '8px',
            maxWidth: '500px',
            width: '90%',
            textAlign: 'center',
            position: 'relative',
            boxShadow: '0 0 20px rgba(255, 217, 0, 0.1)'
          }}>
            <button
              onClick={() => setShowSuccessPopup(false)}
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: 'none',
                border: 'none',
                color: 'var(--yellow)',
                fontSize: '1.5rem',
                cursor: 'pointer'
              }}
            >
              ×
            </button>
            <h2 style={{ color: 'var(--yellow)', fontFamily: 'var(--font-family)', marginBottom: '1rem', fontSize: '2rem' }}>THANK YOU</h2>
            <p style={{ color: '#ccc', marginBottom: '2rem', fontSize: '1.1rem', lineHeight: '1.5' }}>
              Your inquiry has been successfully submitted. We will get back to you shortly.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
              <div onClick={() => window.open('https://wa.me/1234567890', '_blank')} style={{ width: '100%', maxWidth: '280px' }}>
                <Btn1 text="CALL US NOW" />
              </div>
              <div onClick={() => { setShowSuccessPopup(false); window.location.href = '/#projects'; }} style={{ width: '100%', maxWidth: '280px' }}>
                <Btn2 text="VIEW PROJECTS" />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}



