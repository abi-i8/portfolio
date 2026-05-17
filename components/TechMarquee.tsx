"use client";
export default function TechMarquee() {
  const techs = [
    { 
      name: 'Three.js', 
      class: 'three',
      icon: (
        <svg className="tm-icon" width="30" height="30" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
      )
    },
    { 
      name: 'React', 
      class: 'react',
      icon: (
        <svg className="tm-icon" width="30" height="30" viewBox="-11.5 -10.23 23 20.46" fill="none">
          <circle cx="0" cy="0" r="2.05" fill="currentColor"/>
          <g stroke="currentColor" strokeWidth="1.5" fill="none">
            <ellipse rx="11" ry="4.2"/>
            <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
            <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
          </g>
        </svg>
      )
    },
    { 
      name: 'Next.js', 
      class: 'next',
      icon: (
        <svg className="tm-icon" width="30" height="30" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.8" fill="none" />
          <path d="M16 8.5V15.5M8 8.5V15.5M8 8.5l8 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
      )
    },
    { 
      name: 'JavaScript', 
      class: 'js',
      icon: (
        <svg className="tm-icon" width="30" height="30" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.8" fill="none" />
          <text x="12" y="15.5" textAnchor="middle" fontSize="8" fontWeight="900" fill="currentColor" fontFamily="var(--ex)">JS</text>
        </svg>
      )
    },
    { 
      name: 'Photoshop', 
      class: 'ps',
      icon: (
        <svg className="tm-icon" width="30" height="30" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.8" fill="none" />
          <text x="12" y="15.5" textAnchor="middle" fontSize="8" fontWeight="900" fill="currentColor" fontFamily="var(--ex)">Ps</text>
        </svg>
      )
    },
    { 
      name: 'After Effects', 
      class: 'ae',
      icon: (
        <svg className="tm-icon" width="30" height="30" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.8" fill="none" />
          <text x="12" y="15.5" textAnchor="middle" fontSize="8" fontWeight="900" fill="currentColor" fontFamily="var(--ex)">Ae</text>
        </svg>
      )
    },
    { 
      name: 'Premiere', 
      class: 'pr',
      icon: (
        <svg className="tm-icon" width="30" height="30" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.8" fill="none" />
          <text x="12" y="15.5" textAnchor="middle" fontSize="8" fontWeight="900" fill="currentColor" fontFamily="var(--ex)">Pr</text>
        </svg>
      )
    },
    { 
      name: 'Figma', 
      class: 'fig',
      icon: (
        <svg className="tm-icon" width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
          <path d="M8 2a3 3 0 000 6h3V2H8zm3 6a3 3 0 00-3 3 3 3 0 003 3h3V8h-3zm0 6a3 3 0 00-3 3 3 3 0 003 3 3 3 0 003-3v-3h-3zm3-6a3 3 0 000 6h3V8h-3zm3-6a3 3 0 000 6h3V2h-3z" />
        </svg>
      )
    },
    { 
      name: 'Blender', 
      class: 'blender',
      icon: (
        <svg className="tm-icon" width="30" height="30" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="1.8" fill="none" />
          <path d="M12 4c-4.42 0-8 3.58-8 8s3.58 8 8 8 8-3.58 8-8" stroke="currentColor" strokeWidth="1.8" fill="none" />
          <path d="M14 6l4-2M15 8.5l4.5-.5M15 11l5 1" stroke="currentColor" strokeWidth="1.8" fill="none" />
        </svg>
      )
    },
    { 
      name: 'WebGL', 
      class: 'webgl',
      icon: (
        <svg className="tm-icon" width="30" height="30" viewBox="0 0 24 24" fill="none">
          <polygon points="12 2 22 8 22 16 12 22 2 16 2 8" stroke="currentColor" strokeWidth="1.8" fill="none" />
          <line x1="12" y1="2" x2="12" y2="22" stroke="currentColor" strokeWidth="1.8" />
          <line x1="12" y1="12" x2="22" y2="8" stroke="currentColor" strokeWidth="1.8" />
          <line x1="12" y1="12" x2="2" y2="8" stroke="currentColor" strokeWidth="1.8" />
        </svg>
      )
    },
  ];

  return (
    <div className="tm-wrap reveal in">
      <div className="tm-track">
        {techs.concat(techs).map((t, i) => (
          <div key={i} className={`tm-item ${t.class}`}>
            {t.icon}
            <span className="tm-name">{t.name}</span>
          </div>
        ))}
      </div>
      <style jsx>{`
        .tm-wrap {
          width: 100vw;
          margin-left: calc(-50vw + 50%);
          position: relative;
          padding: 1.25rem 0 !important;
          overflow: hidden;
          background: linear-gradient(to right, transparent, rgba(0, 212, 255, 0.01), transparent);
          border-top: 1px solid rgba(0, 212, 255, 0.08);
          border-bottom: 1px solid rgba(0, 212, 255, 0.08);
          mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
          margin-top: 1.5rem !important;
        }
        .tm-track {
          display: flex;
          align-items: center;
          width: max-content;
          gap: 3rem !important;
          animation: tm-scroll 40s linear infinite;
        }
        @keyframes tm-scroll { from { transform: translateX(0) } to { transform: translateX(-50%) } }
        .tm-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 7.5rem !important; /* Forces every item to occupy the exact same horizontal footprint! */
          text-align: center;
          gap: 0.68rem !important;
          transition: all .4s var(--sp);
          opacity: 0.75;
          animation: tm-float 4s ease-in-out infinite alternate;
        }
        .tm-item:nth-child(even) { animation-delay: -2s }
        @keyframes tm-float { from { transform: translateY(-2.5px) } to { transform: translateY(2.5px) } }
        .tm-item:hover { opacity: 1; transform: scale(1.08) translateY(-2.5px); }
        
        .tm-icon {
          width: 30px !important;
          height: 30px !important;
          transition: all .3s ease;
        }
        
        .tm-name {
          font-family: var(--ex);
          font-size: .72rem !important;
          font-weight: 600;
          letter-spacing: .15em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.4);
          transition: color 0.3s ease;
        }

        /* Default Premium Colored Branding and Smooth Glowing */
        .tm-item.three { color: #ffffff; }
        .tm-item.react { color: #61DAFB; }
        .tm-item.next { color: #ffffff; }
        .tm-item.js { color: #F7DF1E; }
        .tm-item.ps { color: #31A8FF; }
        .tm-item.ae { color: #9999FF; }
        .tm-item.pr { color: #EA77FF; }
        .tm-item.fig { color: #F24E1E; }
        .tm-item.blender { color: #E87D0D; }
        .tm-item.webgl { color: #cc3333; }

        .tm-item:hover .tm-name {
          color: #ffffff !important;
        }

        /* High-End Soft Dropshadow Glowing on Hover */
        .tm-item.three:hover { filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.55)); }
        .tm-item.react:hover { filter: drop-shadow(0 0 10px rgba(97, 218, 251, 0.6)); }
        .tm-item.next:hover { filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.55)); }
        .tm-item.js:hover { filter: drop-shadow(0 0 10px rgba(247, 223, 30, 0.6)); }
        .tm-item.ps:hover { filter: drop-shadow(0 0 10px rgba(49, 168, 255, 0.6)); }
        .tm-item.ae:hover { filter: drop-shadow(0 0 10px rgba(153, 153, 255, 0.6)); }
        .tm-item.pr:hover { filter: drop-shadow(0 0 10px rgba(234, 119, 255, 0.6)); }
        .tm-item.fig:hover { filter: drop-shadow(0 0 10px rgba(242, 78, 30, 0.6)); }
        .tm-item.blender:hover { filter: drop-shadow(0 0 10px rgba(232, 125, 13, 0.6)); }
        .tm-item.webgl:hover { filter: drop-shadow(0 0 10px rgba(204, 51, 51, 0.7)); }

        @media (max-width: 768px) {
          .tm-wrap {
            padding: 0.9rem 0 !important;
            margin-top: 1.1rem !important;
          }
          .tm-track {
            gap: 1.5rem !important; /* Tightened track gap for mobile view */
          }
          .tm-item {
            width: 4.8rem !important; /* Compact item footprint to fit more elements */
            gap: 0.45rem !important;
          }
          .tm-icon {
            width: 24px !important; /* Sleek, crisp sizing on mobile devices */
            height: 24px !important;
          }
          .tm-name {
            font-size: .56rem !important; /* Extremely readable compact typography */
          }
        }
      `}</style>
    </div>
  );
}
