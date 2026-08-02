"use client";
export default function Experience() {
  return (
    <section id="exp" aria-labelledby="exp-h">
      <div className="gneb"
        style={{ width: '450px', height: '450px', background: 'radial-gradient(circle,rgba(124,77,255,.09),transparent 70%)', top: 0, right: 0 }}
        aria-hidden="true"></div>
      <div className="label reveal in">Experience</div>
      <h2 id="exp-h" className="sh reveal in d1">Where I've<br /><em style={{ color: 'var(--cyan)', fontStyle: 'italic' }}>Worked.</em></h2>

      <div className="tl" role="list">
        <article className="te reveal in" role="listitem">
          <div className="tdot" aria-hidden="true"></div>
          <div className="tdate">June 2026 - Present</div>
          <h3 className="trole">Creative Head</h3>
          <div className="tco">Adnora Productions</div>
          <ul className="tpts">
            <li>Lead the creative vision and execution of branding, advertising campaigns, and digital media projects.</li>
            <li>Manage and mentor a multidisciplinary team, ensuring high-quality deliverables within project timelines.</li>
            <li>Integrate AI-powered creative workflows to optimize design, content creation, and production efficiency.</li>
            <li>Lead the development of websites, web applications, and cross-platform software solutions.</li>
          </ul>
        </article>

        <article className="te reveal in d1" role="listitem">
          <div className="tdot" aria-hidden="true"></div>
          <div className="tdate">Jan 2020 - Present</div>
          <h3 className="trole">Content Creator &amp; Software Engineer (Web, Android &amp; iOS)</h3>
          <div className="tco">Freelance</div>
          <ul className="tpts">
            <li>Design and develop responsive websites, cross-platform mobile apps, and custom software solutions.</li>
            <li>Deliver creative branding solutions, including visual identities, marketing materials, and promotional content.</li>
            <li>Build interactive web experiences using modern technologies including Three.js and WebGL.</li>
            <li>Leverage AI-assisted workflows for content creation, image/video generation, and creative automation.</li>
          </ul>
        </article>

        <article className="te reveal in d2" role="listitem">
          <div className="tdot" aria-hidden="true"></div>
          <div className="tdate">Sept 2025 - June 2026</div>
          <h3 className="trole">Creative Media Specialist</h3>
          <div className="tco">WebCastle Media</div>
          <ul className="tpts">
            <li>Created visual content to strengthen brand identity and digital presence for in-house and external brands.</li>
            <li>Specialized in AI-assisted content creation using advanced prompt engineering workflows.</li>
            <li>Shot and edited multimedia marketing campaigns, commercial advertisements, and UGC-style content.</li>
            <li>Created interactive web visuals and immersive digital experiences using Three.js and front-end technologies.</li>
          </ul>
        </article>
        
        <article className="te reveal in d3" role="listitem">
          <div className="tdot" aria-hidden="true"></div>
          <div className="tdate">April 2024 - June 2024</div>
          <h3 className="trole">Intern</h3>
          <div className="tco">Southern Travels Pvt. Ltd.</div>
          <ul className="tpts">
            <li>Assisted in planning and coordinating trade shows, events, and tourism-related operations.</li>
            <li>Collaborated with internal teams and stakeholders to support event execution and logistics.</li>
          </ul>
        </article>
      </div>

      <style jsx>{`
        #exp {
          padding-bottom: clamp(1.5rem, 3vw, 2.5rem) !important;
        }
        .sh {
          margin-top: 1.2rem !important;
          margin-bottom: clamp(2.5rem, 5vw, 4rem) !important;
        }
        .tl { position: relative; padding-left: 1.5rem }
        .tl::before {
          content: '';
          position: absolute;
          left: 0;
          top: .5rem;
          bottom: 0;
          width: 1px;
          background: linear-gradient(to bottom, transparent, rgba(124, 77, 255, .4) 10%, rgba(124, 77, 255, .4) 80%, transparent 100%);
          opacity: 0.8;
        }
        .te { position: relative; padding-left: 2.5rem; padding-bottom: 4.5rem }
        .te:last-child { padding-bottom: 0 }
        .tdot {
          position: absolute;
          left: -1.94rem;
          top: .5rem;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: var(--deep);
          border: 2px solid var(--neon);
          box-shadow: 0 0 14px rgba(124, 77, 255, .6);
          transition: box-shadow .3s;
        }
        .te:hover .tdot { box-shadow: 0 0 26px rgba(124, 77, 255, 1) }
        .tdate {
          font-family: var(--ex);
          font-size: .58rem;
          font-weight: 500;
          letter-spacing: .2em;
          text-transform: uppercase;
          color: var(--dim);
          margin-bottom: .65rem;
        }
        .trole {
          font-family: var(--ex);
          font-size: clamp(1.5rem, 3.2vw, 2.3rem);
          font-weight: 200;
          line-height: 1.12;
          margin-bottom: .35rem;
        }
        .tco {
          font-size: .8rem;
          color: var(--gold);
          font-weight: 400;
          letter-spacing: .06em;
          margin-bottom: 1.6rem;
        }
        .tpts { list-style: none; display: flex; flex-direction: column; gap: .72rem }
        .tpts li {
          font-size: .9rem;
          color: var(--muted);
          line-height: 1.72;
          padding-left: 1.3rem;
          position: relative;
          max-width: 65ch;
          text-align: justify;
        }
        .tpts li::before {
          content: '›';
          position: absolute;
          left: 0;
          color: var(--neon);
          opacity: .6;
          font-size: 1rem;
        }
        @media(max-width:768px) {
          #exp {
            padding-bottom: 1.2rem !important;
          }
          .sh {
            margin-top: 1rem !important;
            margin-bottom: 2.2rem !important;
          }
          .tl { padding-left: 0 !important; }
          .tl::before { left: 4px !important; } /* Move timeline line to the left edge to save reading space */
          .te { 
            padding-left: 1.4rem !important; /* Save 20px+ of width to prevent word squishing! */
            padding-bottom: 2.8rem !important; /* Reduce excessive bottom gap */
          }
          .tdot { 
            left: 4px !important; 
            transform: translateX(-50%) !important; 
          }
          .trole {
            font-size: 1.4rem !important; /* Prevents long titles from wrap-cluttering */
          }
          .tco {
            margin-bottom: 0.95rem !important; /* Cleaner vertical transition */
          }
          .tpts {
            gap: 0.55rem !important; /* Neat bullet points spacing */
          }
          .tpts li {
            font-size: 0.85rem !important;
            line-height: 1.6 !important;
            text-align: left !important; /* Clean, natural spacing instead of ugly mobile justify word gaps! */
          }
        }
      `}</style>
    </section>
  );
}
