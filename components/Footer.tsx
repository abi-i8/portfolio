"use client";
export default function Footer() {
  return (
    <footer>
      <div className="f-txt">© {new Date().getFullYear()} ABIJITH A R — CREATIVE MEDIA TECHNOLOGIST</div>
      <style jsx>{`
        footer {
          padding: 1.8rem 1rem !important;
          text-align: center;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          background: var(--void);
        }
        .f-txt {
          font-family: var(--ex);
          font-size: 0.55rem !important; /* Sleek, high-end minimal text sizing */
          color: var(--dim);
          opacity: 0.85;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          line-height: 1.6;
        }
        @media(max-width: 768px) {
          .f-txt {
            font-size: 0.52rem !important;
            letter-spacing: 0.18em;
          }
        }
      `}</style>
    </footer>
  );
}
