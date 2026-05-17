"use client";
export default function Expertise() {
  const skills = [
    { num: '01', title: 'Creative Production', desc: 'Directing cinematic content, professional photography, and AI-assisted production workflows.', tags: ['Creative Direction', 'Photography', 'Videography', 'UGC Campaigns'] },
    { num: '02', title: 'Design & Visual', desc: 'Crafting brand identities and high-conversion advertising creatives for digital platforms.', tags: ['Branding', 'UI/UX Design', 'Visual Communication', 'Figma'] },
    { num: '03', title: 'Adobe Suite', desc: 'Expert-level execution across the creative cloud for high-end post-production.', tags: ['Photoshop', 'After Effects', 'Premiere Pro', 'DaVinci Resolve'] },
    { num: '04', title: 'Front-End Dev', desc: 'Engineering interactive, immersive digital experiences with modern web technologies.', tags: ['Three.js', 'WebGL', 'JavaScript', 'Responsive UI'] },
    { num: '05', title: 'AI & Automation', desc: 'Optimizing creative outputs through prompt engineering and custom AI workflows.', tags: ['Prompt Engineering', 'Claude', 'ChatGPT', 'Workflow Automation'] },
    { num: '06', title: 'Strategy & Marketing', desc: 'MBA-backed digital strategies focused on brand communication and team leadership.', tags: ['Digital Marketing', 'Campaign Strategy', 'Team Leadership', 'Project Management'] },
  ];

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
    <section id="skills" aria-labelledby="skills-h">
      <div className="gneb"
        style={{ width: '380px', height: '380px', background: 'radial-gradient(circle,rgba(0,212,255,.07),transparent 70%)', bottom: '-60px', left: '-50px' }}
        aria-hidden="true"></div>
      <div className="label reveal in">Expertise</div>
      <h2 id="skills-h" className="sh reveal in d1">Craft &amp;<br /><em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>Capability.</em></h2>

      <div className="pgrid">
        {skills.map((s, i) => (
          <article key={i} className={`pc reveal in ${i % 3 === 1 ? 'd1' : i % 3 === 2 ? 'd2' : ''}`} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
            <div className="pcg" aria-hidden="true"></div>
            <div>
              <div className="pnum" aria-hidden="true">{s.num}</div>
              <div className="ppla">Core Capability</div>
              <h3 className="ptit">{s.title}</h3>
              <p className="pdsc">{s.desc}</p>
            </div>
            <div className="tags" style={{ marginTop: '1.5rem' }}>
              {s.tags.map((t, j) => <span key={j} className="tag">{t}</span>)}
            </div>
          </article>
        ))}
      </div>

      <style jsx>{`
        .pgrid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.4rem;
          margin-top: 2.5rem !important; /* Elegant vertical separation to prevent overlaps */
          margin-bottom: 1.5rem !important;
        }
        .pc {
          background: var(--sf);
          border: 1px solid rgba(255, 255, 255, .06);
          border-radius: 16px;
          padding: 2.2rem 2rem;
          position: relative;
          overflow: hidden;
          transition: border-color .4s, transform .4s var(--sp);
          min-height: 250px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .pc:hover {
          border-color: var(--brd2);
          transform: translateY(-6px);
          box-shadow: 0 20px 60px rgba(0, 212, 255, .08);
        }
        .pcg {
          position: absolute;
          bottom: -70px;
          right: -50px;
          width: 180px;
          height: 180px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(0, 212, 255, .08) 0%, transparent 70%);
        }
        .pnum {
          font-family: var(--ru);
          font-size: 4.5rem;
          font-weight: 400;
          line-height: 1;
          color: transparent;
          -webkit-text-stroke: 1px rgba(255, 255, 255, .05);
          position: absolute;
          right: 1.4rem;
          top: .7rem;
        }
        .ppla {
          font-family: var(--ex);
          font-size: .58rem;
          font-weight: 600;
          letter-spacing: .2em;
          text-transform: uppercase;
          color: var(--cyan);
          opacity: .5;
          margin-bottom: .85rem;
        }
        .ptit {
          font-family: var(--ex);
          font-size: 1.6rem;
          font-weight: 200;
          line-height: 1.2;
          margin-bottom: .7rem;
        }
        .pdsc {
          font-size: .85rem;
          color: var(--muted);
          line-height: 1.65;
          max-width: 36ch;
          text-align: justify;
        }
        .tags { display: flex; flex-wrap: wrap; gap: .38rem }
        .tag {
          font-family: var(--ex);
          font-size: .63rem;
          font-weight: 400;
          letter-spacing: .05em;
          padding: .27rem .78rem;
          background: var(--sf2);
          border: 1px solid rgba(255, 255, 255, .06);
          border-radius: 100px;
          color: var(--muted);
          transition: all .22s;
        }
        .tag:hover {
          border-color: var(--brd2);
          color: var(--cyan);
          background: var(--cyand);
        }
        @media(max-width: 968px) {
          .pgrid { 
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); 
            margin-top: 1.8rem !important;
            margin-bottom: 0.8rem !important;
          }
        }
      `}</style>
    </section>
  );
}
