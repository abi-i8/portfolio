"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isSolid, setIsSolid] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const synthRef = useRef<any>(null);

  useEffect(() => {
    // Web Audio Ambient Synthesizer Class (Interstellar Cinematic Organ Synth)
    class SpaceSynth {
      private ctx: AudioContext | null = null;
      private masterGain: GainNode | null = null;
      private filter: BiquadFilterNode | null = null;
      private isPlaying = false;
      private chordIntervalId: any = null;
      private arpIntervalId: any = null;
      private currentChordIdx = 0;
      private arpStep = 0;

      init() {
        if (this.ctx) return;
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        this.ctx = new AudioContextClass();
        
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(0, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);

        // Lowpass filter for smooth organ/pad texture
        this.filter = this.ctx.createBiquadFilter();
        this.filter.type = 'lowpass';
        this.filter.frequency.setValueAtTime(420, this.ctx.currentTime); // Soft warm envelope cutoff
        this.filter.Q.setValueAtTime(2.5, this.ctx.currentTime);
        this.filter.connect(this.masterGain);

        // Soft ambient low space drone
        const subOsc = this.ctx.createOscillator();
        subOsc.type = 'sine';
        subOsc.frequency.setValueAtTime(110.00, this.ctx.currentTime); // Grounding A2 drone
        
        const subGain = this.ctx.createGain();
        subGain.gain.setValueAtTime(0.28, this.ctx.currentTime);
        subOsc.connect(subGain);
        subGain.connect(this.filter);
        subOsc.start();
      }

      private playInterstellarChord() {
        if (!this.ctx || !this.masterGain || !this.isPlaying) return;
        
        const now = this.ctx.currentTime;
        // Hans Zimmer Interstellar Theme Cinematic Chord Cycles
        const chords = [
          [110.00, 164.81, 220.00, 261.63, 329.63], // A Minor (Am)
          [87.31, 130.81, 174.61, 220.00, 261.63],  // F Major (F)
          [130.81, 196.00, 261.63, 329.63, 392.00], // C Major (C)
          [98.00, 146.83, 196.00, 246.94, 293.66]   // G Major (G)
        ];

        const notes = chords[this.currentChordIdx];

        notes.forEach((freq, idx) => {
          if (!this.ctx || !this.masterGain) return;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();

          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now);

          gain.gain.setValueAtTime(0, now);
          // Cinematic swelling pad fade-in
          gain.gain.linearRampToValueAtTime(0.32 / notes.length, now + 3.0 + idx * 0.3);
          gain.gain.setValueAtTime(0.32 / notes.length, now + 5.5);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 7.8);

          osc.connect(gain);
          gain.connect(this.filter!);

          osc.start(now);
          osc.stop(now + 8.0);
        });

        this.currentChordIdx = (this.currentChordIdx + 1) % chords.length;
      }

      private playArpeggioTick() {
        if (!this.ctx || !this.masterGain || !this.isPlaying) return;
        
        const now = this.ctx.currentTime;
        // High-pitched cascading space-organ arpeggios matched perfectly to chords!
        const arpPitches = [
          [659.25, 880.00, 1046.50, 1318.51], // Am: E5, A5, C6, E6
          [698.46, 880.00, 1046.50, 1396.91], // F: F5, A5, C6, F6
          [659.25, 783.99, 1046.50, 1318.51], // C: E5, G5, C6, E6
          [587.33, 783.99, 987.77, 1174.66]   // G: D5, G5, B5, D6
        ];

        const activeArp = arpPitches[(this.currentChordIdx === 0 ? 3 : this.currentChordIdx - 1)];
        const pattern = [0, 1, 2, 3, 2, 1]; // Cascadings
        const pitch = activeArp[pattern[this.arpStep % pattern.length]];

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle'; // Soft triangle wave for glass-organ warmth
        osc.frequency.setValueAtTime(pitch, now);

        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.038, now + 0.04);
        gain.gain.setValueAtTime(0.038, now + 0.12);
        // Beautiful cathedral delay emulation using long release tails
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.6);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start(now);
        osc.stop(now + 1.8);

        this.arpStep++;
      }

      start() {
        this.init();
        if (this.ctx && this.ctx.state === 'suspended') {
          this.ctx.resume();
        }
        this.isPlaying = true;
        
        const now = this.ctx!.currentTime;
        this.masterGain?.gain.setValueAtTime(0, now);
        this.masterGain?.gain.linearRampToValueAtTime(0.92, now + 2.0);

        this.playInterstellarChord();
        this.chordIntervalId = setInterval(() => {
          this.playInterstellarChord();
        }, 8000);

        this.arpIntervalId = setInterval(() => {
          this.playArpeggioTick();
        }, 340);
      }

      stop() {
        this.isPlaying = false;
        if (this.chordIntervalId) {
          clearInterval(this.chordIntervalId);
          this.chordIntervalId = null;
        }
        if (this.arpIntervalId) {
          clearInterval(this.arpIntervalId);
          this.arpIntervalId = null;
        }
        
        if (this.ctx) {
          const now = this.ctx.currentTime;
          // Cancel everything instantly to absolute silence - completely resolves mute leak bug!
          this.masterGain?.gain.cancelScheduledValues(now);
          this.masterGain?.gain.setValueAtTime(0, now);
          this.ctx.suspend();
        }
      }

      toggle() {
        if (this.isPlaying) {
          this.stop();
          return false;
        } else {
          this.start();
          return true;
        }
      }

      destroy() {
        this.stop();
        this.ctx?.close();
      }
    }

    synthRef.current = new SpaceSynth();

    return () => {
      synthRef.current?.destroy();
    };
  }, []);

  const handleSoundToggle = () => {
    if (!synthRef.current) return;
    const isPlaying = synthRef.current.toggle();
    setIsMuted(!isPlaying);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsSolid(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (!isMenuOpen) {
      document.body.classList.add("mob-open");
      document.body.style.overflow = "hidden";
    } else {
      document.body.classList.remove("mob-open");
      document.body.style.overflow = "";
    }
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.classList.remove("mob-open");
    document.body.style.overflow = "";
  };

  return (
    <>
      <header style={{ zIndex: 4000, position: 'relative' }}>
        <nav className={`nav ${isSolid ? "solid" : ""}`} id="nav">
          <a href="#top" className="logo" aria-label="Abijith A R - home">
            <span className="logo-prompt" aria-hidden="true">&gt;</span>
            <span className="logo-name">ABI</span>
            <span className="logo-cursor" aria-hidden="true"></span>
          </a>
          
          <ul className="navl" role="list">
            <li><a href="#about">About</a></li>
            <li><a href="#skills">Expertise</a></li>
            <li><a href="#exp">Work</a></li>
            <li><a href="#edu">Education</a></li>
          </ul>

          <div className="nav-right">
            <a href="#contact" className="nbtn">Connect</a>
            
            <button 
              className={`sound-toggle ${isMuted ? "muted" : ""}`}
              onClick={handleSoundToggle}
              aria-label={isMuted ? "Unmute ambient music" : "Mute ambient music"}
            >
              {isMuted ? (
                <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 5L6 9H2v6h4l5 4V5z"/>
                  <line x1="22" y1="9" x2="16" y2="15"/>
                  <line x1="16" y1="9" x2="22" y2="15"/>
                </svg>
              ) : (
                <div className="wave-container">
                  <svg className="mini-wave" viewBox="0 0 24 12" fill="none">
                    <defs>
                      <linearGradient id="wave-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#00d4ff" />
                        <stop offset="33%" stopColor="#5070ff" />
                        <stop offset="66%" stopColor="#7c4dff" />
                        <stop offset="100%" stopColor="#b04cff" />
                      </linearGradient>
                      <mask id="wave-mask">
                        {/* Mathematically forces the flowing wave to be narrow/small at the left-right edges and full/bigger in the center! */}
                        <ellipse cx="12" cy="6" rx="10.5" ry="5.5" fill="#fff" />
                      </mask>
                    </defs>
                    <g mask="url(#wave-mask)">
                      {/* Path 1: Primary Large Wave */}
                      <path 
                        className="wave-path-1"
                        d="M 0 6 C 6 2, 6 10, 12 6 C 18 2, 18 10, 24 6 C 30 2, 30 10, 36 6 C 42 2, 42 10, 48 6" 
                        stroke="url(#wave-grad)" 
                        strokeWidth="1.6" 
                        strokeLinecap="round"
                      />
                      {/* Path 2: Medium Wave */}
                      <path 
                        className="wave-path-2"
                        d="M 0 6 C 6 9, 6 3, 12 6 C 18 9, 18 3, 24 6 C 30 9, 30 3, 36 6 C 42 9, 42 3, 48 6" 
                        stroke="url(#wave-grad)" 
                        strokeWidth="1.1" 
                        opacity="0.65"
                        strokeLinecap="round"
                      />
                      {/* Path 3: Small/Fine Wave */}
                      <path 
                        className="wave-path-3"
                        d="M 0 6 C 6 11, 6 1, 12 6 C 18 11, 18 1, 24 6 C 30 11, 30 1, 36 6 C 42 11, 42 1, 48 6" 
                        stroke="url(#wave-grad)" 
                        strokeWidth="0.8" 
                        opacity="0.35"
                        strokeLinecap="round"
                      />
                    </g>
                  </svg>
                </div>
              )}
            </button>

            <button 
              className={`nham ${isMenuOpen ? "open" : ""}`} 
              onClick={toggleMenu}
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              <span></span><span></span><span></span>
            </button>
          </div>
        </nav>
      </header>

      <div className={`mob ${isMenuOpen ? "open" : ""}`} id="mob" role="dialog" aria-modal="true" aria-label="Navigation">
        <div className="mob-links">
          <a href="#about" onClick={closeMenu} style={{ transitionDelay: "0.1s" }}>About</a>
          <a href="#skills" onClick={closeMenu} style={{ transitionDelay: "0.15s" }}>Expertise</a>
          <a href="#exp" onClick={closeMenu} style={{ transitionDelay: "0.2s" }}>Work</a>
          <a href="#edu" onClick={closeMenu} style={{ transitionDelay: "0.25s" }}>Education</a>
          <a href="#contact" onClick={closeMenu} style={{ transitionDelay: "0.3s" }}>Contact</a>
        </div>
        <div className="mob-ft">
          <div className="m-line"></div>
          <div>Based in India — Available Worldwide</div>
        </div>
      </div>

      <style jsx>{`
        header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 5000;
        }
        nav.nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 500;
          height: var(--nh);
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          padding: 0 clamp(1.2rem, 5vw, 4rem);
          transition: background .5s, border .5s, -webkit-backdrop-filter .5s, backdrop-filter .5s;
          background: rgba(2, 4, 16, .25); /* Elegant translucent background at the top */
          -webkit-backdrop-filter: blur(20px) saturate(1.2);
          backdrop-filter: blur(20px) saturate(1.2);
          border-bottom: 1px solid rgba(0, 212, 255, 0.02);
        }
        nav.nav.solid {
          background: rgba(2, 4, 16, .55) !important;
          -webkit-backdrop-filter: blur(32px) saturate(1.4) !important;
          backdrop-filter: blur(32px) saturate(1.4) !important;
          border-bottom: 1px solid rgba(0, 212, 255, 0.09) !important;
        }
        .navl {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          gap: 2.2rem;
          justify-self: center;
        }
        .navl a {
          font-family: var(--ex);
          font-size: .65rem;
          font-weight: 500;
          letter-spacing: .22em;
          text-transform: uppercase;
          color: var(--muted);
          transition: color .2s;
          text-decoration: none;
        }
        .navl a:hover { color: var(--cyan) }
        .nav-right {
          justify-self: end;
          display: flex;
          align-items: center;
          gap: 0.8rem;
          z-index: 501;
        }
        .nbtn {
          font-family: var(--ex);
          font-size: .65rem;
          font-weight: 500;
          letter-spacing: .18em;
          text-transform: uppercase;
          padding: .55rem 1.5rem;
          border: 1px solid var(--brd);
          border-radius: 100px;
          color: var(--txt);
          background: transparent;
          transition: all .3s;
          cursor: pointer;
          text-decoration: none;
        }
        .nbtn:hover {
          background: var(--neon);
          color: #fff;
          border-color: var(--neon);
          box-shadow: 0 0 20px rgba(124, 77, 255, .5);
        }
        .sound-toggle {
          background: rgba(0, 212, 255, 0.03);
          border: 1px solid rgba(0, 212, 255, 0.15);
          border-radius: 50%;
          width: 34px;
          height: 34px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: var(--dim);
          transition: all 0.3s;
        }
        .sound-toggle:not(.muted) {
          color: var(--cyan);
          border-color: rgba(0, 212, 255, 0.3);
          box-shadow: 0 0 10px rgba(0, 212, 255, 0.1);
        }
        .sound-toggle:hover {
          color: var(--cyan);
          background: rgba(0, 212, 255, 0.08);
          border-color: rgba(0, 212, 255, 0.45);
          box-shadow: 0 0 15px rgba(0, 212, 255, 0.25);
        }
        .wave-container {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 20px;
          height: 12px;
          overflow: hidden;
          position: relative;
          /* Fade out the wave beautifully at the left and right edges! */
          -webkit-mask-image: linear-gradient(to right, transparent, #fff 20%, #fff 80%, transparent);
          mask-image: linear-gradient(to right, transparent, #fff 20%, #fff 80%, transparent);
        }
        .mini-wave {
          width: 24px;
          height: 12px;
          flex-shrink: 0;
          overflow: visible;
        }
        .wave-path-1 {
          animation: flowWave1 3.0s linear infinite; /* Beautiful, tranquil slow flow */
        }
        .wave-path-2 {
          animation: flowWave2 4.5s linear infinite; /* Opposite shifting */
        }
        .wave-path-3 {
          animation: flowWave1 6.0s linear infinite; /* Very slow tertiary ribbon */
        }

        @keyframes flowWave1 {
          0% { transform: translateX(0); }
          100% { transform: translateX(-24px); }
        }
        @keyframes flowWave2 {
          0% { transform: translateX(-24px); }
          100% { transform: translateX(0); }
        }
        .nham {
          justify-self: end;
          display: none;
          flex-direction: column;
          gap: 5px;
          background: none;
          border: none;
          padding: 4px;
        }
        .nham span {
          display: block;
          width: 22px;
          height: 1.5px;
          background: var(--txt);
          transition: all .3s;
        }
        .mob {
          position: fixed;
          inset: 0;
          z-index: 2000;
          background: linear-gradient(180deg, rgba(3, 4, 15, 0.99) 0%, rgba(10, 12, 25, 1) 100%);
          -webkit-backdrop-filter: blur(25px);
          backdrop-filter: blur(25px);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
          transition: opacity .5s cubic-bezier(.4, 0, .2, 1), visibility .5s;
          padding-top: var(--nh);
        }
        .mob {
          backdrop-filter: blur(25px);
        }
        .mob::before {
          content: "";
          position: absolute;
          inset: 0;
          background-image: linear-gradient(rgba(0, 212, 255, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 212, 255, 0.03) 1px, transparent 1px);
          background-size: 40px 40px;
          pointer-events: none;
        }
        .mob.open {
          opacity: 1;
          visibility: visible;
          pointer-events: auto;
        }
        .mob-links {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          z-index: 2;
        }
        .mob a {
          font-family: var(--ba);
          font-size: clamp(2.4rem, 12vw, 3.8rem);
          font-weight: 600;
          color: var(--txt);
          letter-spacing: -0.03em;
          text-transform: capitalize;
          text-decoration: none;
          opacity: 0;
          transform: translateY(40px);
          transition: color 0.3s, opacity 0.6s cubic-bezier(.2, 1, .2, 1), transform 0.6s cubic-bezier(.2, 1, .2, 1);
        }
        .mob.open a {
          opacity: 1;
          transform: translateY(0);
        }
        .mob a:hover { color: var(--cyan) }
        .mob-ft {
          position: absolute;
          bottom: 3rem;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.8rem;
          opacity: 0.4;
          font-family: var(--ex);
          font-size: 0.65rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
        }
        .m-line { width: 40px; height: 1px; background: var(--cyan); opacity: 0.5; }

        @media(max-width: 1024px) {
          .navl { display: none; }
        }
        @media(max-width:768px) {
          nav.nav {
            display: flex;
            justify-content: space-between;
            padding: 0 1.25rem;
            height: 60px;
          }
          .navl, .nbtn { display: none; }
          .nham { display: flex; z-index: 4001; }
          .nham.open span:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
          .nham.open span:nth-child(2) { opacity: 0; }
          .nham.open span:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }
          .mob { padding-top: 60px; }
          .mob a { font-size: 2rem; margin: 1.5rem 0; }
        }
      `}</style>
    </>
  );
}
