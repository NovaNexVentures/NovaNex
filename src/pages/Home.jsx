import React, { useState, useEffect, useRef } from 'react'
import Btn1 from '../components/Btn1.jsx'
import Btn2 from '../components/Btn2.jsx'
import HomeCard from '../components/Home-Card.jsx'
import card1 from '../assets/card1.svg'
import MovingS from '../components/MovingS.jsx'
import Globe from '../components/Globe.jsx';
import '../styles/Home.css'

export default function Home() {
  const aboutRef = useRef(null)
  const [aboutInView, setAboutInView] = useState(false)

  const ctaRef = useRef(null)
  const [ctaInView, setCtaInView] = useState(false)

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
      id: 'swap',
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
                <div role="button" tabIndex={0}>
                  <Btn1 text="BOOK A FREE SESSION" />
                </div>
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => { const el = document.querySelector('.home-container-5'); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); const el = document.querySelector('.home-container-2'); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }); } }}
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
      <section className='home-container-2'>
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

      <section className='home-container-4'>
        <div className="home-section-4">
          <div className="grid-bg" aria-hidden="true"></div>

          <div className={`CTA-heading ${ctaInView ? 'in-view' : ''}`} ref={ctaRef}>
            <h1 className="CTA-line"><span className="CTA-word cta-w-1">EMPOWERING</span> <span className="CTA-word cta-w-2">BUSINESSES</span> <span className="CTA-word cta-w-3">WITH</span><span className="CTA-word cta-w-4">CUTTING-EDGE</span> <span className="CTA-word cta-w-5">TECHNOLOGY</span></h1>  
            <h1 className="CTA-line"> <span className="CTA-word cta-w-6">AND</span> <span className="CTA-word cta-w-7">INNOVATIVE</span> <span className="CTA-word cta-w-8">DIGITAL</span></h1>
            <h1 className="CTA-line"><span className="CTA-word cta-w-9">EXPERIENCES</span> <span className="CTA-word cta-w-10"></span> <span className="CTA-word cta-w-11"></span> <span className="CTA-word cta-w-12"></span></h1>
          </div>

          <div className="CTA">
            <div className="cta-btn btn1-wrap">
              <Btn1 text="OUR PORTFOLIO" />
            </div>
            <div className="cta-btn btn2-wrap">
              <div>
                <Btn2 text="LET'S CONNECT" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='home-container-5'>
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

      <section className='home-container-6'>
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
    </>
  )
}



