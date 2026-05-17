"use client";
export default function Marquee({ items }: { items: string[] }) {
  return (
    <div className="mwrap" aria-hidden="true">
      <div className="mtrack">
        {items.concat(items).map((item, i) => (
          <span key={i} className="mi">{item}</span>
        ))}
      </div>
      <style jsx>{`
        .mwrap {
          overflow: hidden;
          border-top: 1px solid var(--brd);
          border-bottom: 1px solid var(--brd);
          padding: 1.2rem 0;
          background: var(--deep);
        }
        .mtrack {
          display: flex;
          gap: 2.2rem;
          width: max-content;
          animation: mq 28s linear infinite;
        }
        @keyframes mq { to { transform: translateX(-50%) } }
        .mi {
          font-family: var(--ex);
          font-size: 1.3rem;
          font-weight: 200;
          font-style: italic;
          color: var(--muted);
          white-space: nowrap;
          display: flex;
          align-items: center;
          gap: 2.2rem;
        }
        .mi::after {
          content: '✦';
          color: var(--neon);
          opacity: .5;
          font-style: normal;
          font-size: .8rem;
        }
      `}</style>
    </div>
  );
}
