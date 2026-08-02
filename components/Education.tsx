"use client";
export default function Education() {
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const c = e.currentTarget;
    const r = c.getBoundingClientRect();
    const dx = (e.clientX - r.left - r.width / 2) / (r.width / 2);
    const dy = (e.clientY - r.top - r.height / 2) / (r.height / 2);
    c.style.transform = `perspective(900px) rotateX(${-dy * 5}deg) rotateY(${dx * 5}deg) translateY(-4px)`;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.style.transform = '';
  };

  return (
    <section id="edu" aria-labelledby="edu-h">
      <div className="gneb"
        style={{ width: '500px', height: '500px', background: 'radial-gradient(circle,rgba(0,212,255,0.08),transparent 70%)', top: '-100px', left: '-100px' }}
        aria-hidden="true"></div>
      <div className="eagrid">
        <div>
          <div className="label reveal in">Education</div>
          <h2 id="edu-h" className="reveal in d1" style={{ margin: '1.2rem 0 2.5rem' }}>Academic<br /><em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>Foundation.</em></h2>
          <div className="elist">
            <div className="ei reveal in d1" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
              <h3 className="edeg">MBA · Travel &amp; Tourism Management</h3>
              <div className="esch">Central University of Kerala</div>
              <div className="emeta"><span>2023 - 2025</span><span>CGPA 6.67</span></div>
            </div>
            <div className="ei reveal in d2" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
              <h3 className="edeg">BA English Literature</h3>
              <div className="esch">Kannur University</div>
              <div className="emeta"><span>2020 - 2023</span><span>CGPA 6.83</span></div>
            </div>
            <div className="reveal in d3" style={{ marginTop: '1rem' }}>
              <div className="label" style={{ margin: '0.8rem 0 0.8rem' }}>Certifications</div>
              <div className="certs">
                <div className="cert">Web Based Technologies &amp; Multimedia Applications</div>
                <div className="cert">Online Learning &amp; Multimedia Applications</div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="label reveal in">Recognition</div>
          <h2 className="reveal in d1" style={{ margin: '1.2rem 0 2.5rem' }}>Awards &amp;<br /><em style={{ color: 'var(--neonb)', fontStyle: 'italic' }}>Achievements.</em></h2>
          <div className="alist">
            <div className="ai reveal in d1" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
              <div className="aico" aria-hidden="true">📸</div>
              <div>
                <span className="atit">Photography &amp; Visual Narrative Distinction (X2)</span>
                <span className="adsc">Awarded for outstanding conceptual photography, visual storytelling, and artistic composition.</span>
              </div>
            </div>
            <div className="ai reveal in d2" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
              <div className="aico" aria-hidden="true">⚡</div>
              <div>
                <span className="atit">Creative Media &amp; Marketing Innovation</span>
                <span className="adsc">Recognized for high-impact cinematic production and strategic digital brand communication.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        #edu {
          padding-top: clamp(1.5rem, 3vw, 2.5rem) !important;
        }
        .eagrid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(2rem, 5vw, 5rem);
          align-items: start;
        }
        @media(max-width:800px) { 
          .eagrid { grid-template-columns: 1fr } 
          #edu { padding-top: 1.2rem !important; }
        }
        .elist, .alist { display: flex; flex-direction: column; gap: 1.1rem }
        .ei, .ai {
          border: 1px solid rgba(255, 255, 255, .06);
          border-radius: 14px;
          transition: border-color .3s, transform .3s var(--sp);
          position: relative;
          overflow: hidden;
          text-align: justify;
        }
        .ei { background: var(--sf); padding: 1.7rem 1.9rem }
        .ei:hover { border-color: rgba(255, 184, 77, .3); transform: translateX(6px) }
        .ei::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255, 184, 77, .2), transparent);
        }
        .edeg { font-family: var(--ex); font-size: 1.38rem; font-weight: 200; line-height: 1.2; margin-bottom: .3rem }
        .esch { font-size: .76rem; color: var(--gold); font-weight: 400; margin-bottom: .7rem; font-family: var(--ex); letter-spacing: .04em }
        .emeta { display: flex; gap: 1.5rem; font-size: .72rem; color: var(--dim) }
        .certs { display: flex; flex-direction: column; gap: .65rem; margin-top: 1.4rem }
        .cert { font-size: .76rem; color: var(--muted); padding: .55rem 1rem; background: var(--sf2); border: 1px solid rgba(255, 255, 255, .05); border-radius: 8px }
        .ai { background: var(--sf); padding: 1.4rem 1.65rem; display: flex; gap: 1.1rem; align-items: flex-start }
        .ai:hover { border-color: rgba(124, 77, 255, .4); transform: translateX(6px) }
        .aico { font-size: 1.2rem; flex-shrink: 0; margin-top: .05rem }
        .atit { font-family: var(--ex); font-size: 1.1rem; font-weight: 300; display: block; margin-bottom: .28rem; color: var(--txt) }
        .adsc { font-size: .78rem; color: var(--muted); line-height: 1.55 }
      `}</style>
    </section>
  );
}
