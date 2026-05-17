"use client";
export default function Contact() {
  const contacts = [
    { name: '+91 81118 00628', link: 'tel:+918111800628', icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
      </svg>
    )},
    { name: 'WhatsApp', link: 'https://wa.me/918111800628', icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.353-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.128.571-.074 1.758-.716 2.006-1.408.248-.693.248-1.288.174-1.408-.074-.12-.272-.198-.57-.348zM12.015 21.01c-1.63 0-3.225-.438-4.62-1.272l-.332-.198-3.442.903.92-3.353-.218-.347c-.917-1.458-1.401-3.144-1.401-4.88 0-5.002 4.07-9.073 9.078-9.073 2.424 0 4.703.943 6.416 2.656 1.712 1.713 2.654 3.992 2.654 6.417 0 5.004-4.072 9.075-9.083 9.075zm0-20.013c-6.07 0-11.01 4.939-11.01 11.01 0 1.94.509 3.834 1.474 5.513l-1.566 5.716 5.845-1.534c1.612.879 3.42 1.343 5.257 1.343 6.071 0 11.011-4.939 11.011-11.01 0-2.912-1.132-5.651-3.187-7.706-2.056-2.055-4.794-3.187-7.705-3.187z" />
      </svg>
    )},
    { name: '@abi.jith_i8', link: 'https://instagram.com/abi.jith_i8', icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
      </svg>
    )},
    { name: 'LinkedIn', link: 'https://linkedin.com/in/abijithar', icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
        <rect x="2" y="9" width="4" height="12"></rect>
        <circle cx="4" cy="4" r="2"></circle>
      </svg>
    )},
  ];

  return (
    <section id="contact">
      <div className="c-dot-wrapper">
        <div className="c-top-dot" aria-hidden="true"></div>
      </div>
      <div className="c-tag reveal in">LET'S CONNECT</div>
      <h2 id="contact-h" className="c-sh reveal in d1">Let's build something <span>extraordinary?</span></h2>
      <p className="c-p reveal in d2">&gt; Open to Collaborations & Creative Projects.</p>

      <div className="gneb"
        style={{ width: '600px', height: '400px', background: 'radial-gradient(circle,rgba(0,212,255,0.06),transparent 70%)', bottom: '10%', left: '50%', transform: 'translateX(-50%)', zIndex: -1 }}
        aria-hidden="true"></div>

      <div className="c-pills">
        {contacts.map((c, i) => (
          <a key={i} href={c.link} className={`pill reveal in d${i+1}`} target="_blank" rel="noopener noreferrer">
            {c.icon}
            {c.name}
          </a>
        ))}
      </div>

      <style jsx>{`
        #contact {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: clamp(6rem, 10vh, 12rem) 5% 4rem !important; /* Grounded vertically for perfect 'center bottom' entry! */
          position: relative;
        }
        #contact::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(0, 212, 255, 0.12) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 212, 255, 0.12) 1px, transparent 1px);
          background-size: 40px 40px;
          mask-image: radial-gradient(ellipse 80% 70% at 50% 44%, black 15%, transparent 85%);
          -webkit-mask-image: radial-gradient(ellipse 80% 70% at 50% 44%, black 15%, transparent 85%);
          z-index: -1;
          pointer-events: none;
        }
        .c-dot-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 1.2rem;
          width: 100%;
          z-index: 50;
        }
        .c-top-dot {
          width: 8px;
          height: 8px;
          background: linear-gradient(135deg, var(--cyan), var(--neon));
          border-radius: 50%;
          box-shadow: 0 0 10px var(--cyan), 0 0 20px var(--neon), 0 0 60px rgba(0, 212, 255, 0.4), 0 0 120px rgba(124, 77, 255, 0.15);
          animation: pulse 3s infinite ease-in-out;
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; box-shadow: 0 0 10px var(--cyan), 0 0 20px var(--neon), 0 0 60px rgba(0, 212, 255, 0.4), 0 0 120px rgba(124, 77, 255, 0.15); }
          50% { transform: scale(1.4); opacity: 0.9; box-shadow: 0 0 20px var(--cyan), 0 0 40px var(--neon), 0 0 100px rgba(0, 212, 255, 0.6), 0 0 200px rgba(124, 77, 255, 0.3); }
        }
        .c-tag { font-family: monospace; font-size: 0.75rem; color: var(--dim); letter-spacing: 0.25em; margin-bottom: 2rem; opacity: 0.8 }
        .c-sh { font-size: clamp(2.5rem, 6vw, 4.5rem); font-weight: 700; line-height: 1.1; margin-bottom: 1.5rem; color: #fff; letter-spacing: -0.02em }
        .c-sh span { font-weight: 700; font-style: italic; display: inline-block; padding-right: 0.15em; background: linear-gradient(90deg, var(--neon), var(--cyan)); -webkit-background-clip: text; background-clip: text; color: transparent; -webkit-text-fill-color: transparent }
        .c-p { color: var(--muted); font-family: monospace; font-size: 1rem; margin-bottom: 3.5rem; opacity: 0.8 }
        .c-pills { display: flex; flex-wrap: wrap; justify-content: center; gap: 1.2rem; max-width: 900px }
        .pill {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          background: rgba(255, 255, 255, 0.035);
          -webkit-backdrop-filter: blur(12px);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(0, 212, 255, 0.15);
          border-top: 1px solid rgba(255, 255, 255, 0.2);
          padding: 0.9rem 1.8rem;
          border-radius: 100px;
          color: #fff;
          text-decoration: none;
          font-size: 0.95rem;
          font-weight: 500;
          transition: transform 0.7s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.6s ease-out, background 0.3s var(--sp), box-shadow 0.3s var(--sp);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.05);
          opacity: 1;
        }
        .pill {
          backdrop-filter: blur(12px);
        }
        .pill:hover {
          background: rgba(124, 77, 255, 0.12);
          border-color: var(--cyan);
          transform: translateY(-6px);
          box-shadow: 0 15px 35px rgba(0, 212, 255, 0.2), inset 0 1px 1px rgba(255, 255, 255, 0.1);
        }
        .pill :global(svg) { color: var(--cyan); opacity: 0.8; transition: all 0.3s ease }
        .pill:hover :global(svg) { color: #fff; opacity: 1; filter: drop-shadow(0 0 8px var(--cyan)); }
        
        @media(max-width:768px) {
          #contact {
            padding: 5rem 1rem 3rem !important;
            min-height: 92vh !important; /* Full-screen viewport presence on mobile to push previous sections away */
            display: flex !important;
            flex-direction: column !important;
            justify-content: center !important;
            align-items: center !important;
          }
          .c-tag {
            color: var(--cyan) !important;
            opacity: 0.85 !important;
            margin-bottom: 1.2rem !important;
          }
          .c-sh {
            font-size: 2.1rem !important;
            line-height: 1.25 !important;
            margin-bottom: 1.2rem !important;
          }
          .c-p {
            font-size: 0.85rem !important;
            margin-bottom: 2.4rem !important;
          }
          .c-pills {
            gap: 0.75rem !important;
            width: 100% !important;
          }
          .pill {
            width: 100% !important;
            max-width: 290px !important;
            margin: 0 auto !important;
            justify-content: center;
            padding: 0.78rem 1.2rem !important;
            font-size: 0.85rem !important;
          }
        }
      `}</style>
    </section>
  );
}
