"use client";
export default function About() {
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
    <section id="about" aria-labelledby="about-h">
      <div className="gneb"
        style={{ width: '480px', height: '480px', background: 'radial-gradient(circle,rgba(124,77,255,.11),transparent 70%)', top: '-80px', right: '-80px' }}
        aria-hidden="true"></div>
      <span className="abg" aria-hidden="true">A</span>

      <div className="label reveal in">About</div>
      <div className="agrid" style={{ marginTop: '1.5rem' }}>
        <div className="atxt">
          <h2 id="about-h" className="reveal in d1">Multidisciplinary<br /><em style={{ color: 'var(--cyan)', fontStyle: 'italic' }}>by Design.</em></h2>
          <p className="reveal in d2" style={{ marginTop: '1.8rem' }}>
            A <strong>Creative Media Technologist</strong> where my <strong>Core Disciplines</strong> - Creative Media,
            Visual Branding,
            AI-assisted
            Creative Workflows, and Front-End Development converge into one fluid, purposeful practice.
          </p>
          <p className="reveal in d3">
            Combining an MBA's strategic depth with hands-on mastery of
            <strong> Three.js, WebGL, After Effects, and Generative AI</strong> - building
            experiences that live at the edge of craft and code.
          </p>
          <p className="reveal in d4">
            Whether directing a cinematic shoot, designing a brand identity, or
            engineering an immersive digital experience - precision, intelligence, and
            taste guide every decision.
          </p>
          <div className="adiv reveal in d4"></div>
          <ul className="fl reveal in d4" role="list">
            <li><span className="fk">Base</span><span className="fv">Kerala, India</span></li>
            <li><span className="fk">Currently</span><span className="fv">Creative Media Specialist · WebCastle Media</span></li>
            <li><span className="fk">Focus</span><span className="fv">Creative Media · AI Workflows · Three.js · WebGL · Branding</span></li>
            <li><span className="fk">Speaks</span><span className="fv">English · Malayalam · Hindi · Tamil</span></li>
          </ul>
        </div>
        <div className="scards">
          <div className="scard reveal in d1" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
            <div className="snum">5+</div>
            <div className="stxt">Years of experience in Designing, Photography &amp; Digital Media Production</div>
          </div>
          <div className="scard reveal in d2" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
            <div className="snum">12+</div>
            <div className="stxt">Technical Stacks - Expertise across Creative Media, AI Workflows &amp; Front-End</div>
          </div>
          <div className="scard reveal in d3" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
            <div className="snum">24+</div>
            <div className="stxt">Clients - Delivering high-impact creative solutions for global brands &amp; agencies</div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .abg {
          position: absolute;
          right: clamp(.5rem, 4vw, 5rem);
          top: 0;
          font-family: var(--ru);
          font-size: clamp(12rem, 25vw, 26rem);
          font-weight: 400;
          line-height: 1;
          color: transparent;
          -webkit-text-stroke: 1px rgba(124, 77, 255, .05);
          pointer-events: none;
          user-select: none;
        }
        .agrid {
          display: grid;
          grid-template-columns: 1.15fr .85fr;
          gap: clamp(3rem, 6vw, 7rem);
          align-items: start;
        }
        @media(max-width:860px) { .agrid { grid-template-columns: 1fr } }
        .atxt p {
          font-size: 1.02rem;
          line-height: 1.95;
          color: var(--muted);
          margin-bottom: 1.5rem;
          text-align: justify;
        }
        .atxt p strong { color: var(--txt); font-weight: 400 }
        .adiv { width: 40px; height: 1px; background: var(--brd); margin: 2rem 0 }
        .fl { list-style: none }
        .fl li {
          display: flex;
          align-items: baseline;
          gap: 1.5rem;
          padding: .8rem 0;
          border-bottom: 1px solid transparent;
          border-image: linear-gradient(to right, rgba(255, 255, 255, 0.05), transparent) 1;
        }
        .fk {
          font-family: var(--ex);
          font-size: .58rem;
          font-weight: 500;
          letter-spacing: .18em;
          text-transform: uppercase;
          color: var(--dim);
          min-width: 78px;
          flex-shrink: 0;
        }
        .fv { font-size: .88rem; color: var(--muted) }
        .scards { display: flex; flex-direction: column; gap: 1.15rem }
        .scard {
          background: var(--sf);
          border: 1px solid var(--brd);
          border-radius: 14px;
          padding: 1.85rem 2.1rem;
          position: relative;
          overflow: hidden;
          transition: border-color .4s, transform .4s var(--sp);
        }
        .scard:hover {
          border-color: rgba(0, 212, 255, .35);
          transform: translateY(-4px);
        }
        .snum {
          font-family: var(--ru);
          font-size: 4rem;
          font-weight: 400;
          line-height: 1;
          color: var(--cyan);
          margin-bottom: .35rem;
        }
        .stxt { font-size: .8rem; color: var(--muted); line-height: 1.55 }
      `}</style>
    </section>
  );
}
