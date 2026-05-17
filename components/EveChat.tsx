"use client";
import { useState, useEffect, useRef } from "react";

type Message = { role: "usr" | "bot"; content: string; id: number };

const RESUME_INFO = {
  name: "Abi",
  age: 25,
  profile: "Abi is a Creative Media Technologist from Kerala, specializing in the intersection of branding, AI workflows, and immersive web technologies.",
  education: [
    "MBA in Travel & Tourism Management, Central University of Kerala (2023-2025) - CGPA 6.67",
    "BA English Literature, Kannur University (2020-2023) - CGPA 6.83",
    "Certifications: Web Based Technologies & Multimedia Applications, Online Learning & Multimedia Applications"
  ],
  skills: {
    ai: ["Prompt Engineering", "AI Image & Video Generation", "Workflow Automation", "Claude", "ChatGPT"],
    web: ["Three.js", "WebGL", "GLSL Shaders", "React", "Next.js", "JavaScript"],
    creative: ["Adobe Photoshop", "Adobe Premiere Pro", "Adobe After Effects", "Figma", "Blender"]
  },
  achievements: [
    "Photography & Visual Narrative Distinction (awarded twice) for conceptual and artistic composition.",
    "Recognized for high-impact Cinematic Production and strategic digital brand communication."
  ],
  experience: "Currently contributing as a Creative professional at WebCastle Media. Abi has been operating independently as a freelance media specialist since 2020.",
  contact: {
    phone: "+91 81118 00628",
    insta: "@abi.jith_i8",
    linkedin: "abijithar"
  }
};

const KB = [
  { k: ['hello', 'hi', 'hey', 'sup', 'greetings'], r: ["Greetings! I am EVE, Abi's AI assistant. How may I assist you with his professional profile today?", "Welcome. I am EVE. I can provide detailed insights into Abi's expertise in Creative Media and AI. What would you like to know?"] },
  { k: ['who', 'abi', 'about', 'tell me about him', 'what do you do'], r: [`${RESUME_INFO.profile} He is ${RESUME_INFO.age} years old and brings a unique blend of literary foundation and technical innovation to every project.`] },
  { k: ['age', 'old', 'born', 'birthday', 'year'], r: [`Abi is ${RESUME_INFO.age} years old (born in 2001).`] },
  { k: ['education', 'study', 'degree', 'university', 'mba', 'ba'], r: [`Abi holds the following qualifications: \n- ${RESUME_INFO.education.join('\n- ')}`] },
  { k: ['skill', 'can', 'know', 'expert', 'tech', 'stack'], r: [`Abi's technical stack includes:\n- AI: ${RESUME_INFO.skills.ai.join(', ')}\n- Web & 3D: ${RESUME_INFO.skills.web.join(', ')}\n- Creative: ${RESUME_INFO.skills.creative.join(', ')}`] },
  { k: ['experience', 'work', 'job', 'career', 'webcastle', 'freelance'], r: [RESUME_INFO.experience] },
  { k: ['award', 'achievement', 'win', 'competition', 'distinction'], r: [`Abi has received several honors:\n- ${RESUME_INFO.achievements.join('\n- ')}`] },
  { k: ['contact', 'hire', 'reach', 'call', 'number'], r: [`You can reach Abi via:\n- Phone: ${RESUME_INFO.contact.phone}\n- LinkedIn: ${RESUME_INFO.contact.linkedin}\n- Instagram: ${RESUME_INFO.contact.insta}`] },
  { k: ['three', 'webgl', '3d', 'canvas', 'shader'], r: ["Yes, Abi is an expert in Three.js and WebGL. This entire portfolio, including my own 3D architecture, is built using these technologies."] },
  { k: ['ai', 'artificial', 'intelligence', 'gpt', 'claude', 'prompt'], r: [`Abi leverages advanced AI workflows, including: ${RESUME_INFO.skills.ai.join(', ')}. He integrates AI to enhance cinematic production and creative efficiency.`] },
  { k: ['video', 'photo', 'camera', 'edit', 'cinema', 'motion'], r: ["Photography and Cinematic production are core to Abi's identity. He holds distinctions in Visual Narrative and is proficient in Premiere Pro and After Effects."] },
  { k: ['language', 'speak'], r: ["Abi is fluent in English, Malayalam, Hindi, and Tamil."] }
];

// Client-side Web Audio SFX Class for EVE (giggle chirps and scroll whooshes)
class EveSoundFX {
  public ctx: AudioContext | null = null;
  private lastWhooshTime = 0;

  init() {
    if (this.ctx) return;
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    this.ctx = new AudioContextClass();
  }

  // Synthesizes a vocal formant cute robotic talking chirp (cascading dual vocal formant sweeps: "E-vah!")
  playChirp() {
    this.init();
    if (!this.ctx) return;
    if (this.ctx.state === 'suspended') this.ctx.resume();

    const now = this.ctx.currentTime;
    
    // Vocal speech formant double-beep sequence
    const speechCascade = [
      { time: 0.0, freq: 987.77, dur: 0.08 },  // E (high fundamental)
      { time: 0.09, freq: 1318.51, dur: 0.14 } // Vah (sweeping upwards)
    ];

    speechCascade.forEach((f, idx) => {
      if (!this.ctx) return;
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc1.type = 'sine';
      osc2.type = 'triangle'; // triangle waves add soft, human-like voice warmth
      
      // Infinite pitch inflection sweeps
      osc1.frequency.setValueAtTime(f.freq, now + f.time);
      osc1.frequency.exponentialRampToValueAtTime(f.freq * 1.15, now + f.time + f.dur);
      
      osc2.frequency.setValueAtTime(f.freq * 1.5, now + f.time);
      osc2.frequency.exponentialRampToValueAtTime(f.freq * 1.5 * 1.15, now + f.time + f.dur);

      gain.gain.setValueAtTime(0, now + f.time);
      gain.gain.linearRampToValueAtTime(0.12, now + f.time + 0.02); // Sweet, perfectly audible soft robotic whisper
      gain.gain.exponentialRampToValueAtTime(0.0001, now + f.time + f.dur + 0.15); // Much smoother, longer vocal release tail

      // Cute robotic voice bandpass formant filter centered around 2200Hz (human vocal resonance)
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(2200, now + f.time);
      filter.Q.setValueAtTime(1.5, now + f.time);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(filter);
      filter.connect(this.ctx.destination);

      osc1.start(now + f.time);
      osc1.stop(now + f.time + f.dur + 0.2);
      osc2.start(now + f.time);
      osc2.stop(now + f.time + f.dur + 0.2);
    });
  }

  // Sci-fi wind whoosh on scroll down/up
  playWhoosh(direction: "falling" | "flying") {
    this.init();
    if (!this.ctx) return;
    
    const now = Date.now();
    if (now - this.lastWhooshTime < 950) return; // Rate-limit whooshes for clean audio design
    this.lastWhooshTime = now;

    if (this.ctx.state === 'suspended') this.ctx.resume();

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    
    if (direction === "flying") {
      // Gentle breeze sweeps up slowly
      osc.frequency.setValueAtTime(260, t);
      osc.frequency.exponentialRampToValueAtTime(540, t + 1.1);
    } else {
      // Gentle breeze sweeps down slowly
      osc.frequency.setValueAtTime(420, t);
      osc.frequency.exponentialRampToValueAtTime(200, t + 1.1);
    }

    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(0.16, t + 0.25); // Sweet, perfectly audible ambient cosmic wind sweep
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 1.1); // Long, buttery-smooth decay to prevent sudden closing!

    // Apply lowpass filter for an airy, futuristic wind glow (softened to 680Hz)
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(680, t);

    osc.connect(gain);
    gain.connect(filter);
    filter.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 1.2);
  }
}

export default function EveChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [robotState, setRobotState] = useState<"closed" | "idle" | "falling" | "flying" | "giggling">("closed");
  const [msgs, setMsgs] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [userName, setUserName] = useState("");
  
  // Custom cute EVE eye expressions: normal glowing blue, happy arches, or closed blinking!
  const [eyeExpr, setEyeExpr] = useState<"normal" | "happy" | "closed">("normal");

  const msgsRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);
  const scrollTimer = useRef<NodeJS.Timeout | null>(null);
  const autoOpenTimerRef = useRef<NodeJS.Timeout | null>(null);
  const wakeUpTimerRef = useRef<NodeJS.Timeout | null>(null);
  const hasInteractedRef = useRef(false);
  const sfxRef = useRef<any>(null);
  const isInputFocused = useRef(false);

  // Cute natural blinking and happy eyes cycle loop for EVE!
  useEffect(() => {
    const interval = setInterval(() => {
      const rand = Math.random();
      if (rand < 0.35) {
        // Quick cute blink expression
        setEyeExpr("closed");
        setTimeout(() => setEyeExpr("normal"), 150);
      } else if (rand < 0.6) {
        // Shimmering smiling happy arches expression!
        setEyeExpr("happy");
        setTimeout(() => setEyeExpr("normal"), 2200);
      }
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    sfxRef.current = new EveSoundFX();

    const unlock = () => {
      if (sfxRef.current) {
        sfxRef.current.init();
        if (sfxRef.current.ctx && sfxRef.current.ctx.state === 'suspended') {
          sfxRef.current.ctx.resume();
        }
      }
      document.removeEventListener('click', unlock);
      document.removeEventListener('keydown', unlock);
      document.removeEventListener('touchstart', unlock);
    };
    document.addEventListener('click', unlock);
    document.addEventListener('keydown', unlock);
    document.addEventListener('touchstart', unlock);

    return () => {
      document.removeEventListener('click', unlock);
      document.removeEventListener('keydown', unlock);
      document.removeEventListener('touchstart', unlock);
    };
  }, []);

  // Helper to change robot state safely and handle scroll-dismissal of the chat window.
  const updateRobotState = (s: "closed" | "idle" | "falling" | "flying" | "giggling") => {
    setRobotState(s);
    if (s !== "idle" && s !== "closed" && s !== "giggling") {
      // If EVE goes into scrolling states (falling or flying), cancel auto-opening and close chat panel immediately.
      if (autoOpenTimerRef.current) {
        clearTimeout(autoOpenTimerRef.current);
        autoOpenTimerRef.current = null;
      }
      if (wakeUpTimerRef.current) {
        clearTimeout(wakeUpTimerRef.current);
        wakeUpTimerRef.current = null;
      }
      if (!isInputFocused.current) {
        setIsOpen(false);
        hasInteractedRef.current = true; // Mark as interacted to block future auto-opens
      }
    }
  };

  // Robot Wake Up Sequence
  useEffect(() => {
    wakeUpTimerRef.current = setTimeout(() => {
      if (hasInteractedRef.current) return;
      
      setRobotState(prev => {
        if (prev === "closed") {
          autoOpenTimerRef.current = setTimeout(() => {
            if (hasInteractedRef.current) return;
            setIsOpen(true);
          }, 1500);
          return "idle";
        }
        return prev;
      });
    }, 2200);

    return () => {
      if (wakeUpTimerRef.current) clearTimeout(wakeUpTimerRef.current);
      if (autoOpenTimerRef.current) clearTimeout(autoOpenTimerRef.current);
    };
  }, []);

  // Scroll Physics
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (Math.abs(y - lastScrollY.current) < 12) return;

      // If the chat input is focused, ignore the scroll to avoid bot movement/collapsing!
      if (isInputFocused.current) {
        lastScrollY.current = y;
        return;
      }

      const dir = y > lastScrollY.current ? "falling" : "flying";
      lastScrollY.current = y;

      updateRobotState(dir);
      sfxRef.current?.playWhoosh(dir); // Play custom direction swept sci-fi whoosh!
      if (scrollTimer.current) clearTimeout(scrollTimer.current);
      scrollTimer.current = setTimeout(() => {
        updateRobotState("idle");
      }, 900);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (scrollTimer.current) clearTimeout(scrollTimer.current);
    };
  }, []);

  // Auto-scroll chat
  useEffect(() => {
    if (msgsRef.current) {
      msgsRef.current.scrollTop = msgsRef.current.scrollHeight;
    }
  }, [msgs, isTyping]);

  // Initial Message
  useEffect(() => {
    if (isOpen && msgs.length === 0) {
      setTimeout(() => {
        addBotMsg("Greetings. I am EVE, Abi's professional AI ChatBot. I am ready to provide detailed insights into his work, education, and creative expertise. How may I assist you today?");
      }, 350);
    }
  }, [isOpen]);

  const addBotMsg = (txt: string) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMsgs(prev => [...prev, { role: "bot", content: txt, id: Date.now() }]);
    }, 900);
  };

  const getBotReply = (msg: string) => {
    const m = msg.toLowerCase();
    
    if (m.includes("my name is ") || m.includes("i am ")) {
      const name = m.split("is ").pop() || m.split("am ").pop();
      if (name && name.length < 20) {
        const formatted = name.charAt(0).toUpperCase() + name.slice(1);
        setUserName(formatted);
        return `It is a pleasure to meet you, ${formatted}. I have updated my records. How can I assist you with Abijith's portfolio?`;
      }
    }

    if (m.includes("thank")) return "You are most welcome. Is there anything else about Abijith's expertise you'd like to explore?";
    if (m.includes("how are you")) return "My systems are operating at peak efficiency, thank you for asking. How can I help you today?";
    if (m.includes("bye")) return "Farewell. I will be here if you require further assistance with Abijith's professional logs.";

    const matched = KB.find(entry => entry.k.some(k => m.includes(k)));
    if (matched) return matched.r[Math.floor(Math.random() * matched.r.length)];

    if (m.includes("resume") || m.includes("cv") || m.includes("detail")) {
      return `I can provide detailed information on Abijith's ${RESUME_INFO.skills.ai[0]} expertise, his ${RESUME_INFO.education[0]}, or his current role at WebCastle Media. Which would you like to explore?`;
    }

    const fallbacks = [
      "I apologize, but I don't have that specific data in my logs. I can, however, detail Abijith's achievements in Cinematic Production or his proficiency in Three.js.",
      "That query is outside my current knowledge base. Would you like to know about his MBA from Central University of Kerala or his freelance creative work?",
      "I am programmed for professional inquiries. Perhaps you'd like to know about Abijith's skills in Figma, Blender, or AI-assisted content generation?"
    ];
    return fallbacks[Math.floor(Math.random() * fallbacks.length)];
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const usrMsg = input.trim();
    setMsgs(prev => [...prev, { role: "usr", content: usrMsg, id: Date.now() }]);
    setInput("");
    addBotMsg(getBotReply(usrMsg));
  };

  const toggleChat = () => {
    hasInteractedRef.current = true; // Mark as interacted to block future auto-opens
    sfxRef.current?.playChirp(); // Play robotic happy chirp sound on EVE tap!
    setEyeExpr("happy"); // Instantly show smiling arches expression!
    setTimeout(() => setEyeExpr("normal"), 1600);

    if (autoOpenTimerRef.current) clearTimeout(autoOpenTimerRef.current);
    if (wakeUpTimerRef.current) clearTimeout(wakeUpTimerRef.current);

    if (isOpen) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
      if (robotState === "idle") {
        updateRobotState("giggling");
        setTimeout(() => updateRobotState("idle"), 1500);
      }
    }
  };

  return (
    <div id="eve-wrap" role="complementary" aria-label="EVE - AI Portfolio ChatBot">
      {/* Chat panel */}
      <div className={`eve-chat ${isOpen ? "open" : ""}`} id="cchat" aria-live="polite" aria-atomic="false">
        <div className="chat-head">
          <span className="chat-name">EVE 🤖</span>
          <button 
            className="chat-close" 
            id="cclose" 
            aria-label="Close EVE" 
            onClick={(e) => { 
              e.stopPropagation(); 
              setIsOpen(false); 
              hasInteractedRef.current = true;
              if (autoOpenTimerRef.current) clearTimeout(autoOpenTimerRef.current);
              if (wakeUpTimerRef.current) clearTimeout(wakeUpTimerRef.current);
            }}
          >✕</button>
        </div>
        <div className="chat-msgs" id="cmsgs" role="log" aria-label="Chat messages" ref={msgsRef}>
          {msgs.map(m => (
            <div key={m.id} className={`cmsg ${m.role}`}>{m.content}</div>
          ))}
          {isTyping && (
            <div className="cmsg bot">
              <span className="typing-dots"><span></span><span></span><span></span></span>
            </div>
          )}
        </div>
        <div className="chat-input-row">
          <input 
            className="chat-in" 
            id="cin" 
            type="text" 
            placeholder="Ask me anything..." 
            aria-label="Chat input"
            maxLength={120}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            onFocus={() => { isInputFocused.current = true; }}
            onBlur={() => { isInputFocused.current = false; }}
          />
          <button className="chat-send" id="csend" aria-label="Send message" onClick={handleSend}>›</button>
        </div>
      </div>

      {/* Robot */}
      <div 
        className={`eve-robot-wrap ${robotState}`} 
        id="eve" 
        role="button" 
        tabIndex={0} 
        aria-label="EVE - click to chat"
        aria-expanded={isOpen}
        onClick={toggleChat}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleChat(); } }}
      >
        {/* Cartoon Speed Lines for falling animation */}
        <div className="eve-speed-lines" aria-hidden="true">
          <div className="s-line line-1"></div>
          <div className="s-line line-2"></div>
          <div className="s-line line-3"></div>
          <div className="s-line line-4"></div>
          <div className="s-line line-5"></div>
        </div>

        <div className="eve-body" id="eve-body">
          <div className="eve-head">
            <div className="eve-visor">
              <div className="eve-eye-l" aria-hidden="true">
                <svg viewBox="0 0 16 10" width="16" height="10" className="eve-eye-svg">
                  <defs>
                    <radialGradient id="eye-grad-l" cx="50%" cy="40%" r="50%">
                      <stop offset="0%" stopColor="#a8f0ff" />
                      <stop offset="50%" stopColor="#00b8ff" />
                      <stop offset="100%" stopColor="#0080cc" />
                    </radialGradient>
                  </defs>
                  <circle 
                    cx="8" 
                    cy="5" 
                    r="5" 
                    fill="url(#eye-grad-l)" 
                    className={`eye-shape circle-eye ${eyeExpr === "normal" ? "active" : ""}`}
                  />
                  <path 
                    d="M 2 8 C 2 2.5, 14 2.5, 14 8" 
                    stroke="#00d4ff" 
                    strokeWidth="2.8" 
                    strokeLinecap="round" 
                    fill="none"
                    className={`eye-shape happy-eye ${eyeExpr === "happy" ? "active" : ""}`}
                  />
                  <line 
                    x1="2" 
                    y1="5" 
                    x2="14" 
                    y2="5" 
                    stroke="#00d4ff" 
                    strokeWidth="2.5" 
                    strokeLinecap="round"
                    className={`eye-shape closed-eye ${eyeExpr === "closed" ? "active" : ""}`}
                  />
                </svg>
              </div>
              <div className="eve-eye-r" aria-hidden="true">
                <svg viewBox="0 0 16 10" width="16" height="10" className="eve-eye-svg">
                  <defs>
                    <radialGradient id="eye-grad-r" cx="50%" cy="40%" r="50%">
                      <stop offset="0%" stopColor="#a8f0ff" />
                      <stop offset="50%" stopColor="#00b8ff" />
                      <stop offset="100%" stopColor="#0080cc" />
                    </radialGradient>
                  </defs>
                  <circle 
                    cx="8" 
                    cy="5" 
                    r="5" 
                    fill="url(#eye-grad-r)" 
                    className={`eye-shape circle-eye ${eyeExpr === "normal" ? "active" : ""}`}
                  />
                  <path 
                    d="M 2 8 C 2 2.5, 14 2.5, 14 8" 
                    stroke="#00d4ff" 
                    strokeWidth="2.8" 
                    strokeLinecap="round" 
                    fill="none"
                    className={`eye-shape happy-eye ${eyeExpr === "happy" ? "active" : ""}`}
                  />
                  <line 
                    x1="2" 
                    y1="5" 
                    x2="14" 
                    y2="5" 
                    stroke="#00d4ff" 
                    strokeWidth="2.5" 
                    strokeLinecap="round"
                    className={`eye-shape closed-eye ${eyeExpr === "closed" ? "active" : ""}`}
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className="eve-torso">
            <div className="eve-status">
              <div className="eve-dot"></div>
              <div className="eve-dot"></div>
              <div className="eve-dot"></div>
              <div className="eve-dot red"></div>
            </div>
            <div className="eve-arm l" aria-hidden="true"></div>
            <div className="eve-arm r" aria-hidden="true"></div>
            <div className="eve-thrust">
              <div className="thrust-ring"></div>
              <div className="thrust-ring"></div>
              <div className="thrust-ring"></div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        #eve-wrap {
          position: fixed;
          bottom: 2.5rem;
          right: 2rem;
          z-index: 1000;
          pointer-events: none;
          transition: all 0.5s var(--sp);
        }
        :global(body.mob-open) #eve-wrap {
          display: none !important;
        }

        .eve-robot-wrap {
          position: relative;
          width: 100px;
          height: 160px;
          cursor: pointer;
          pointer-events: auto;
          filter: drop-shadow(0 15px 40px rgba(0, 0, 0, 0.3));
          transition: transform 0.2s;
        }

        /* ── CARTOON/ANIME SPEED LINES ── */
        .eve-speed-lines {
          position: absolute;
          inset: -60px -20px 0;
          pointer-events: none;
          z-index: 1;
          display: none;
        }

        .eve-robot-wrap.falling .eve-speed-lines {
          display: block;
        }

        .s-line {
          position: absolute;
          background: linear-gradient(to top, transparent, rgba(0, 212, 255, 0.65) 40%, rgba(255, 255, 255, 0.95) 90%, transparent);
          width: 2px;
          border-radius: 50%;
          opacity: 0;
        }

        /* Animate speed lines shooting upwards very fast! */
        .line-1 { left: 15%; height: 50px; animation: speedLine 0.4s linear infinite; }
        .line-2 { left: 35%; height: 70px; animation: speedLine 0.35s linear infinite 0.08s; }
        .line-3 { left: 55%; height: 45px; animation: speedLine 0.38s linear infinite 0.15s; }
        .line-4 { left: 75%; height: 65px; animation: speedLine 0.32s linear infinite 0.04s; }
        .line-5 { left: 90%; height: 55px; animation: speedLine 0.42s linear infinite 0.12s; }

        @keyframes speedLine {
          0% {
            transform: translateY(180px) scaleY(0.1);
            opacity: 0;
          }
          50% {
            opacity: 1;
            transform: translateY(70px) scaleY(1);
          }
          100% {
            transform: translateY(-80px) scaleY(0.1);
            opacity: 0;
          }
        }

        .eve-robot-wrap:hover {
          filter: brightness(1.04) drop-shadow(0 20px 50px rgba(0, 212, 255, 0.25));
        }

        .eve-robot-wrap:active {
          transform: scale(0.96);
        }

        .eve-body {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 68px;
          height: 165px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-end;
          transition: transform 0.6s cubic-bezier(0.25, 1, 0.5, 1);
        }

        /* ── EVE IDLE FLOAT ── */
        .eve-robot-wrap.idle .eve-body {
          animation: eveFloat 6s ease-in-out infinite;
        }

        @keyframes eveFloat {
          0%, 100% {
            transform: translateX(-50%) translateY(0);
          }
          50% {
            transform: translateX(-50%) translateY(-12px);
          }
        }

        /* ═══════ HEAD: Perfect Upper Ellipse ═══════ */
        .eve-head {
          width: 70px;
          height: 50px;
          background: radial-gradient(ellipse at 35% 20%, #ffffff 0%, #e6ebf5 50%, #b8c4d8 100%);
          border-radius: 50% 50% 48% 48% / 60% 60% 40% 40%;
          position: relative;
          z-index: 12;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: -2px;
          box-shadow:
            inset -2px -4px 10px rgba(0, 0, 0, 0.08),
            0 6px 15px rgba(0, 0, 0, 0.15);
          transition: all 0.7s var(--sp);
        }

        .eve-robot-wrap.idle .eve-head {
          animation: headSearch 7s ease-in-out infinite;
        }

        @keyframes headSearch {
          0%, 100% {
            transform: rotate(0deg) translateX(0);
          }
          40% {
            transform: rotate(2deg) translateX(0.5px);
          }
          80% {
            transform: rotate(-1.5deg) translateX(-0.5px);
          }
        }

        /* ═══════ VISOR: Sweeping Black Glass Faceplate ═══════ */
        .eve-visor {
          position: absolute;
          top: 7px;
          bottom: 9px;
          left: 4px;
          right: 4px;
          background: radial-gradient(circle at 50% 30%, #1a1a2e 0%, #000 80%);
          border-radius: 50% / 65% 65% 35% 35%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          overflow: hidden;
          box-shadow: inset 0 3px 15px rgba(0, 0, 0, 0.95);
          transition: opacity 0.5s ease, transform 0.6s var(--sp);
        }

         /* ═══════ EYES: Futuristic High-Fidelity SVG Containers ═══════ */
        .eve-eye-l,
        .eve-eye-r {
          width: 16px;
          height: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          /* Gorgeous high-tech neon blue ambient visage glow! */
          filter: drop-shadow(0 0 3.5px #00d4ff) drop-shadow(0 0 8px rgba(0, 212, 255, 0.65));
          transition: transform 0.25s cubic-bezier(0.25, 1, 0.5, 1);
        }

        .eve-eye-svg {
          width: 100%;
          height: 100%;
          overflow: visible;
        }

        /* Highly polished dynamic eye-shape morph/cross-fade physics! */
        .eye-shape {
          opacity: 0;
          transform: scale(0.65) translateY(1px);
          transform-origin: center;
          transition: 
            opacity 0.2s cubic-bezier(0.25, 1, 0.5, 1),
            transform 0.24s cubic-bezier(0.25, 1, 0.5, 1);
        }

        .eye-shape.active {
          opacity: 1;
          transform: scale(1) translateY(0);
        }

        /* Specific keyframe bounce to accentuate EVE's happy smiles */
        .happy-eye.active {
          animation: happyBounce 0.45s cubic-bezier(0.25, 1, 0.5, 1);
        }

        @keyframes happyBounce {
          0%, 100% { transform: scale(1) translateY(0); }
          50% { transform: scale(1.15) translateY(-0.8px); }
        }

        /* ═══════ TORSO: Short Rounded Egg ═══════ */
        .eve-torso {
          width: 70px;
          height: 88px;
          background: radial-gradient(ellipse at 35% 25%, #ffffff 0%, #f5f7fb 45%, #ccd4e0 100%);
          border-radius: 40% 40% 50% 50% / 30% 30% 72% 72%;
          position: relative;
          box-shadow:
            inset -3px -6px 15px rgba(0, 0, 0, 0.06),
            0 12px 30px rgba(0, 0, 0, 0.15);
          z-index: 10;
          transition: all 0.7s var(--sp);
        }

        /* ═══════ STATUS LEDs ═══════ */
        .eve-status {
          position: absolute;
          left: 14px;
          top: 24px;
          display: flex;
          align-items: center;
          gap: 2.5px;
          z-index: 11;
          transition: opacity 0.4s ease;
          transform: scale(0.75);
        }

        .eve-dot {
          width: 2.5px;
          height: 2.5px;
          border-radius: 50%;
          background: var(--cyan);
          box-shadow: 0 0 4px var(--cyan);
        }

        .eve-dot.red {
          width: 3.5px;
          height: 3.5px;
          background: #ff4455;
          box-shadow: 0 0 6px #ff4455;
          margin-left: 1px;
        }

        /* ═══════ ARMS: Smooth Aerodynamic Pods ═══════ */
        .eve-arm {
          position: absolute;
          width: 14px;
          height: 52px;
          background: radial-gradient(ellipse at 35% 30%, #ffffff 0%, #edf1f7 50%, #d1d9e6 100%);
          border-radius: 50% 50% 50% 50% / 20% 20% 80% 80%;
          top: 15px;
          box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.08);
          transition: all 0.6s cubic-bezier(0.25, 1, 0.5, 1);
          transform-origin: 50% 10px;
          z-index: 5;
        }

        .eve-arm.l {
          left: -8px;
          transform: rotate(8deg);
        }

        .eve-arm.r {
          right: -8px;
          transform: rotate(-8deg);
        }

        /* ── CLOSED STATE ── */
        .eve-robot-wrap.closed .eve-head {
          margin-bottom: -4px;
          transform: translateY(6px);
        }

        .eve-robot-wrap.closed .eve-visor {
          opacity: 1;
          transform: scale(0.96);
        }

        .eve-robot-wrap.closed .eve-status {
          opacity: 1;
        }

        .eve-robot-wrap.closed .eve-torso {
          height: 75px;
        }

        .eve-robot-wrap.closed .eve-arm.l {
          transform: translate(4px, 2px) rotate(0deg);
          opacity: 1;
        }

        .eve-robot-wrap.closed .eve-arm.r {
          transform: translate(-4px, 2px) rotate(0deg);
          opacity: 1;
        }

        /* ── STATE: SCROLL DOWN (Stable Descent) ── */
        .eve-robot-wrap.falling .eve-body {
          animation: eveFallDrift 3s ease-in-out infinite;
        }

        @keyframes eveFallDrift {
          0%, 100% {
            transform: translateX(-50%) translateY(10px) rotate(0deg);
          }
          25% {
            transform: translateX(-52%) translateY(14px) rotate(-1.5deg);
          }
          75% {
            transform: translateX(-48%) translateY(6px) rotate(1.5deg);
          }
        }

        .eve-robot-wrap.falling .eve-head {
          transform: translateY(3px);
          margin-bottom: -2px;
        }

        .eve-robot-wrap.falling .eve-arm.l {
          transform: rotate(160deg) translateY(-5px);
        }

        .eve-robot-wrap.falling .eve-arm.r {
          transform: rotate(-160deg) translateY(-5px);
        }

        /* Elongated droplet eyes on Stable Descent (Scroll Down) */
        .eve-robot-wrap.falling .circle-eye {
          transform: scaleY(1.38) scaleX(0.82) !important;
        }

        /* ── STATE: SCROLL UP (Cinematic Flight) ── */
        .eve-robot-wrap.flying .eve-body {
          animation: eveDrift 3s ease-in-out infinite;
        }

        @keyframes eveDrift {
          0%, 100% {
            transform: translateX(-50%) translateY(-30px) rotate(0deg);
          }
          25% {
            transform: translateX(-48%) translateY(-34px) rotate(1deg);
          }
          75% {
            transform: translateX(-52%) translateY(-32px) rotate(-1deg);
          }
        }

        .eve-robot-wrap.flying .eve-head {
          transform: translateY(2px);
          margin-bottom: 0px;
        }

        .eve-robot-wrap.flying .eve-arm.l {
          transform: translate(6px, 2px) rotate(0deg);
        }

        .eve-robot-wrap.flying .eve-arm.r {
          transform: translate(-6px, 2px) rotate(0deg);
        }

        /* Flattened squinty oval eyes on Cinematic Flight (Scroll Up) */
        .eve-robot-wrap.flying .circle-eye {
          transform: scaleY(0.55) scaleX(1.15) !important;
        }

        /* ── CINEMATIC PROPULSION ── */
        .eve-thrust {
          position: absolute;
          top: 100%;
          margin-top: -6px;
          left: 50%;
          transform: translateX(-50%);
          width: 70px;
          height: 50px;
          display: none;
          pointer-events: none;
          z-index: -1;
        }

        .eve-robot-wrap.flying .eve-thrust {
          display: block;
        }

        .eve-thrust::before {
          content: '';
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 30px;
          height: 12px;
          background: var(--cyan);
          border-radius: 50%;
          filter: blur(10px);
          opacity: 0.8;
          animation: thrustPulse 0.4s infinite alternate;
        }

        @keyframes thrustPulse {
          from {
            opacity: 0.6;
            transform: translateX(-50%) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateX(-50%) scale(1.2);
          }
        }

        .thrust-ring {
          position: absolute;
          left: 50%;
          top: 0;
          transform: translateX(-50%);
          border: 2px solid var(--cyan);
          border-radius: 50%;
          width: 25px;
          height: 8px;
          opacity: 0;
          animation: thrustWave 1.2s ease-out infinite;
          box-shadow: 0 0 20px var(--cyan);
          filter: blur(1.5px);
        }

        .thrust-ring:nth-child(2) {
          animation-delay: 0.4s;
        }

        .thrust-ring:nth-child(3) {
          animation-delay: 0.8s;
        }

        @keyframes thrustWave {
          0% {
            width: 45px;
            height: 12px;
            opacity: 1;
            transform: translate(-50%, -50%) translateY(0);
          }
          100% {
            width: 10px;
            height: 3px;
            opacity: 0;
            transform: translate(-50%, -50%) translateY(45px);
          }
        }

        /* ── STATE: GIGGLE ── */
        .eve-robot-wrap.giggling .eve-body {
          animation: eveGiggle 0.45s ease-in-out infinite alternate;
        }

        @keyframes eveGiggle {
          from {
            transform: translateX(-50%) translateY(0) rotate(0deg);
          }
          to {
            transform: translateX(-50%) translateY(-3px) rotate(1.5deg);
          }
        }

        .eve-robot-wrap.giggling .eve-eye-l,
        .eve-robot-wrap.giggling .eve-eye-r {
          width: 14px;
          height: 6px;
          border-radius: 50% 50% 20% 20%;
        }

        /* Chat panel */
        .eve-chat {
          background: rgba(4, 4, 26, .96);
          border: 1px solid var(--brd);
          border-radius: 20px 20px 20px 4px;
          padding: 1.15rem 1.3rem;
          width: 260px;
          position: absolute;
          right: 110%;
          bottom: 0;
          -webkit-backdrop-filter: blur(24px);
          backdrop-filter: blur(24px);
          transform: translateX(10px) scale(.95);
          opacity: 0;
          pointer-events: none;
          transition: all .38s var(--sp);
          transform-origin: bottom right;
        }
        .eve-chat {
          backdrop-filter: blur(24px);
        }

        .eve-chat.open {
          opacity: 1;
          transform: none;
          pointer-events: auto;
        }

        .eve-chat::after {
          content: '';
          position: absolute;
          bottom: 12px;
          right: -8px;
          width: 14px;
          height: 14px;
          background: rgba(4, 4, 26, .96);
          border-right: 1px solid var(--brd);
          border-bottom: 1px solid var(--brd);
          transform: rotate(-45deg);
        }

        .chat-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: .85rem;
        }

        .chat-name {
          font-family: var(--ru);
          font-size: .88rem;
          letter-spacing: .08em;
          color: var(--cyan);
        }

        .chat-close {
          background: none;
          border: none;
          color: var(--muted);
          font-size: .9rem;
          cursor: pointer;
          transition: color .2s;
          padding: 2px 4px;
        }

        .chat-close:hover {
          color: #fff;
        }

        .chat-msgs {
          height: 160px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: .6rem;
          margin-bottom: .85rem;
          padding-right: .2rem;
          scroll-behavior: smooth;
        }

        .chat-msgs::-webkit-scrollbar {
          width: 3px;
        }

        .chat-msgs::-webkit-scrollbar-thumb {
          background: var(--brd);
          border-radius: 3px;
        }

        .cmsg {
          max-width: 90%;
          padding: .5rem .8rem;
          border-radius: 12px;
          font-size: .76rem;
          line-height: 1.55;
        }

        .cmsg.bot {
          background: var(--sf2);
          color: var(--txt);
          align-self: flex-start;
          border-radius: 12px 12px 12px 4px;
          border: 1px solid rgba(255, 255, 255, 0.04);
        }

        .cmsg.usr {
          background: var(--neon);
          color: #fff;
          align-self: flex-end;
          border-radius: 12px 12px 4px 12px;
          box-shadow: 0 4px 12px rgba(124, 77, 255, 0.2);
        }

        .typing-dots span {
          display: inline-block;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: var(--muted);
          margin: 0 2px;
          animation: td .8s ease-in-out infinite;
        }

        .typing-dots span:nth-child(2) {
          animation-delay: .2s;
        }

        .typing-dots span:nth-child(3) {
          animation-delay: .4s;
        }

        @keyframes td {
          0%, 100% {
            transform: translateY(0);
            opacity: .4;
          }
          50% {
            transform: translateY(-4px);
            opacity: 1;
          }
        }

        .chat-input-row {
          display: flex;
          gap: .5rem;
        }

        .chat-in {
          flex: 1;
          background: var(--sf);
          border: 1px solid var(--brd);
          border-radius: 100px;
          padding: .42rem .9rem;
          font-family: var(--ba);
          font-size: .76rem;
          color: var(--txt);
          outline: none;
          transition: border-color .2s;
        }

        .chat-in::placeholder {
          color: var(--dim);
        }

        .chat-in:focus {
          border-color: var(--cyan);
        }

        .chat-send {
          background: var(--neon);
          border: none;
          border-radius: 50%;
          width: 28px;
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: .75rem;
          color: #fff;
          transition: background .2s;
          flex-shrink: 0;
        }

        .chat-send:hover {
          background: var(--neonb);
        }

        @media(max-width:768px) {
          #eve-wrap {
            position: fixed !important;
            bottom: 1.2rem !important;
            right: 1.5rem !important;
            top: auto !important;
            transform: none !important;
            z-index: 99999 !important;
          }

          .eve-robot-wrap {
            transform: scale(0.6) !important;
            transform-origin: bottom right !important;
            opacity: 0.9;
          }

          .eve-chat {
            width: calc(100% - 2.4rem) !important;
            position: fixed !important;
            left: 1.2rem !important;
            right: 1.2rem !important;
            bottom: 120px !important;
            height: auto !important;
            max-height: 320px !important;
            background: rgba(4, 4, 26, 0.96) !important;
            -webkit-backdrop-filter: blur(20px) !important;
            backdrop-filter: blur(20px) !important;
            border: 1px solid var(--brd) !important;
            border-radius: 20px !important;
            box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6) !important;
            transform: none !important;
            pointer-events: none !important;
            padding: 0.85rem 1rem !important;
          }
          .eve-chat.open {
            pointer-events: auto !important;
          }
          .eve-chat {
            backdrop-filter: blur(20px) !important;
          }
          .eve-chat:focus-within {
            bottom: 75px !important;
            max-height: 220px !important;
          }
          .eve-chat:focus-within::after {
            display: none !important;
          }

          .eve-chat::after {
            content: "" !important;
            display: block !important;
            position: absolute !important;
            bottom: -9px !important;
            right: 48px !important;
            width: 18px !important;
            height: 18px !important;
            background: rgba(4, 4, 26, 0.98) !important;
            border-right: 1px solid var(--brd) !important;
            border-bottom: 1px solid var(--brd) !important;
            transform: rotate(45deg) !important;
            z-index: -1 !important;
            border-radius: 0 0 4px 0 !important;
            pointer-events: none !important;
          }

          .chat-head {
            padding: 0 0 0.5rem 0 !important;
          }

          .chat-msgs {
            padding: 0 !important;
            height: 115px !important;
            transition: height 0.3s ease;
          }
          .eve-chat:focus-within .chat-msgs {
            height: 75px !important;
          }

          .chat-input-row {
            padding: 0.85rem 0 0 0 !important;
          }
        }
      `}</style>
    </div>
  );
}
