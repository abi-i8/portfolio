"use client";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [collapsed, setCollapsed] = useState(true);

  useEffect(() => {
    if (!canvasRef.current) return;
    const cv = canvasRef.current;
    const PM = window.matchMedia("(prefers-reduced-motion:reduce)").matches;
    let W = window.innerWidth, H = window.innerHeight;

    const scene = new THREE.Scene();
    const cam = new THREE.PerspectiveCamera(50, W / H, 0.1, 150);
    cam.position.set(0, 0.2, 7.8);

    const rend = new THREE.WebGLRenderer({
      canvas: cv,
      antialias: true,
      alpha: false,
      powerPreference: "high-performance",
    });
    const isMobileDevice = typeof navigator !== "undefined" && (/Mobi|Android|iPhone/i.test(navigator.userAgent) || window.innerWidth < 768);
    rend.setPixelRatio(isMobileDevice ? 1 : Math.min(window.devicePixelRatio, 1.5));
    rend.setSize(W, H);
    rend.setClearColor(0x01010a, 1);

    const manager = new THREE.LoadingManager();
    manager.onLoad = () => {
      cv.style.opacity = "1";
    };
    const txl = new THREE.TextureLoader(manager);

    const sunDir = new THREE.Vector3(-2, 0.5, 1.5).normalize();
    const sunLight = new THREE.DirectionalLight(0xffffff, 1.8);
    sunLight.position.copy(sunDir.clone().multiplyScalar(10));
    scene.add(sunLight);
    scene.add(new THREE.AmbientLight(0x111122, 0.25));

    const earthDayTex = txl.load("https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg");
    const earthNightTex = txl.load("https://unpkg.com/three-globe/example/img/earth-night.jpg");

    const eVS = `
      varying vec2 vUv;varying vec3 vN;varying vec3 vNW;varying vec3 vVD;
      void main(){
        vUv=uv;
        vN=normalize(normalMatrix*normal);
        vNW=normalize(mat3(modelMatrix)*normal);
        vec4 mv=modelViewMatrix*vec4(position,1.);
        vVD=normalize(-mv.xyz);
        gl_Position=projectionMatrix*mv;
      }`;
    const eFS = `
      uniform sampler2D uDay;
      uniform sampler2D uNight;
      uniform vec3 uSun;
      varying vec2 vUv;varying vec3 vN;varying vec3 vNW;varying vec3 vVD;
      void main(){
        vec3 dayCol=texture2D(uDay,vUv).rgb;
        vec3 nightCol=texture2D(uNight,vUv).rgb;
        float sun=dot(vNW,normalize(uSun));
        float dayMix=smoothstep(-0.12,0.28,sun);
        vec3 col=mix(nightCol*1.6,dayCol,dayMix);
        float spec=pow(max(0.,dot(reflect(-normalize(uSun),vNW),vVD)),48.)*dayMix;
        col+=vec3(.6,.7,.8)*spec*.35;
        float fr=pow(1.-clamp(dot(vVD,vN),0.,1.),2.8);
        vec3 atm=vec3(.12,.42,.95);
        col+=atm*fr*.65;
        col+=vec3(.85,.92,1.)*fr*fr*.3;
        gl_FragColor=vec4(col,1.);
      }`;

    const planetMat = new THREE.ShaderMaterial({
      vertexShader: eVS,
      fragmentShader: eFS,
      uniforms: {
        uDay: { value: earthDayTex },
        uNight: { value: earthNightTex },
        uSun: { value: sunDir },
      },
    });

    const planetGroup = new THREE.Group();
    scene.add(planetGroup);

    const planet = new THREE.Mesh(new THREE.SphereGeometry(1.8, 128, 128), planetMat);
    planetGroup.add(planet);

    function updatePlanetPos() {
      const isMob = window.innerWidth < 768;
      planetGroup.position.set(isMob ? 0 : 3.4, isMob ? -2.0 : -0.2, 0);
      cam.fov = isMob ? 60 : 50;
      cam.updateProjectionMatrix();
    }
    updatePlanetPos();

    const cloudTex = txl.load("https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_clouds_1024.png");
    const cloudsMat = new THREE.MeshPhongMaterial({
      map: cloudTex,
      transparent: true,
      opacity: 0.32,
      depthWrite: false,
      side: THREE.DoubleSide,
    });
    const clouds = new THREE.Mesh(new THREE.SphereGeometry(1.83, 64, 64), cloudsMat);
    planetGroup.add(clouds);

    const aVS = `
      varying vec3 vN;
      varying vec3 vVD;
      void main(){
        vN = normalize(normalMatrix * normal);
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        vVD = normalize(-mv.xyz);
        gl_Position = projectionMatrix * mv;
      }`;
    const aFS1 = `
      varying vec3 vN;
      varying vec3 vVD;
      void main(){
        float intensity = pow(1.0 - max(dot(vN, vVD), 0.0), 10.0);
        vec3 glowCol = mix(vec3(0.01, 0.05, 0.2), vec3(0.05, 0.3, 0.9), intensity);
        gl_FragColor = vec4(glowCol, intensity * 0.4);
      }`;
    const aFS2 = `
      varying vec3 vN;
      varying vec3 vVD;
      void main(){
        float intensity = pow(1.0 - max(dot(vN, vVD), 0.0), 30.0);
        gl_FragColor = vec4(vec3(0.05, 0.25, 0.8), intensity * 0.15);
      }`;

    function mkAtm(radius: number, fs: string) {
      const m = new THREE.ShaderMaterial({
        vertexShader: aVS,
        fragmentShader: fs,
        transparent: true,
        side: THREE.BackSide,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });
      const mesh = new THREE.Mesh(new THREE.SphereGeometry(radius, 128, 128), m);
      planetGroup.add(mesh);
      return mesh;
    }
    const atm1 = mkAtm(1.82, aFS1);
    const atm2 = mkAtm(1.98, aFS2);

    function mkRing(r: number, op: number, rx: number, ry: number, col: number) {
      const pts = [];
      for (let i = 0; i <= 192; i++) {
        const a = (i / 192) * Math.PI * 2;
        pts.push(new THREE.Vector3(Math.cos(a) * r, Math.sin(a) * r, 0));
      }
      const l = new THREE.LineLoop(
        new THREE.BufferGeometry().setFromPoints(pts),
        new THREE.LineBasicMaterial({ color: col, transparent: true, opacity: op })
      );
      l.rotation.x = rx;
      l.rotation.y = ry;
      return l;
    }
    const rings = [
      mkRing(2.5, 0.25, 0.5, 0.15, 0x00d4ff),
      mkRing(3.2, 0.12, -0.65, 0.3, 0x7c4dff),
      mkRing(3.9, 0.06, 0.85, -0.25, 0xffb84d),
    ];
    rings.forEach((r) => planetGroup.add(r));

    const moonTex = txl.load("https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/moon_1024.jpg");
    const moonMat = new THREE.MeshStandardMaterial({ map: moonTex, roughness: 0.9, metalness: 0.1 });
    const moonGroup = new THREE.Group();
    planetGroup.add(moonGroup);
    const moon = new THREE.Mesh(new THREE.SphereGeometry(0.32, 48, 48), moonMat);
    moon.position.set(3.2, 0, 0);
    moonGroup.add(moon);
    moonGroup.rotation.x = 0.089;

    const PC = 5000, ARMS = 3;
    const pp = new Float32Array(PC * 3), pc = new Float32Array(PC * 3);
    for (let i = 0; i < PC; i++) {
      const i3 = i * 3, arm = (i % ARMS) / ARMS * Math.PI * 2;
      const t = Math.pow(Math.random(), .4), radius = t * 11 + .3;
      const angle = Math.log(Math.max(radius, .1)) * 2.2 + arm + (Math.random() - .5) * (.5 + radius * .05);
      const dh = (Math.random() - .5) * Math.exp(-radius * .1) * .55;
      pp[i3] = Math.cos(angle) * radius; pp[i3 + 1] = dh; pp[i3 + 2] = Math.sin(angle) * radius;
      const tr = Math.min(radius / 11, 1);
      pc[i3] = .35 + tr * .25; pc[i3 + 1] = .65 - tr * .15; pc[i3 + 2] = 1. - tr * .1;
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(pp, 3));
    pGeo.setAttribute("color", new THREE.BufferAttribute(pc, 3));
    const galaxy = new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.022, vertexColors: true, transparent: true, opacity: 0.85 }));
    galaxy.position.set(0.5, -0.4, -2.5);
    scene.add(galaxy);

    function mkStars(count: number, spread: number, sz: number, op: number) {
      const sp = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        const theta = Math.random() * Math.PI * 2, phi = Math.acos(2 * Math.random() - 1), r = spread * .5 + Math.random() * spread * .5;
        sp[i * 3] = Math.sin(phi) * Math.cos(theta) * r; sp[i * 3 + 1] = Math.sin(phi) * Math.sin(theta) * r; sp[i * 3 + 2] = -Math.abs(Math.cos(phi) * r) - 2.0;
      }
      const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.BufferAttribute(sp, 3));
      return new THREE.Points(g, new THREE.PointsMaterial({ color: 0xD4E8FF, size: sz, transparent: true, opacity: op, sizeAttenuation: true }));
    }
    scene.add(mkStars(1400, 24, .016, .65));
    scene.add(mkStars(500, 18, .03, .42));
    scene.add(mkStars(150, 13, .048, .3));

    /* shooting star */
    let shotTimer = 0;
    const shotGeo = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0), new THREE.Vector3(2.5, .5, 0)]);
    const shotMat = new THREE.LineBasicMaterial({ color: 0xFFFFFF, transparent: true, opacity: 0 });
    const shot = new THREE.Line(shotGeo, shotMat);
    scene.add(shot);

    let mx = 0, my = 0, cx = 0, cy = 0, sy = 0, tsy = 0;
    let isDragging = false, px = 0, py = 0, dragRotX = 0, dragRotY = 2.3;

    const onMouseDown = (e: MouseEvent) => { isDragging = true; px = e.clientX; py = e.clientY; };
    const onMouseUp = () => { isDragging = false; };
    const onMouseMove = (e: MouseEvent) => {
      mx = (e.clientX / W - .5) * 2.5; my = (e.clientY / H - .5) * 1.6;
      if (isDragging) {
        dragRotY += (e.clientX - px) * 0.006;
        dragRotX += (e.clientY - py) * 0.006;
        dragRotX = Math.max(-1.2, Math.min(1.2, dragRotX));
        px = e.clientX; py = e.clientY;
      }
    };
    const onScroll = () => { sy = window.scrollY; };
    const onResize = () => {
      W = window.innerWidth; H = window.innerHeight;
      cam.aspect = W / H; cam.updateProjectionMatrix();
      rend.setSize(W, H); updatePlanetPos();
    };

    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("scroll", onScroll);
    window.addEventListener("resize", onResize);

    let isHeroVisible = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isHeroVisible = entry.isIntersecting;
      },
      { threshold: 0.02 }
    );
    observer.observe(cv);

    let t = 0;
    let rafId: number;
    const tick = () => {
      if (isHeroVisible) {
        if (!PM) t += 0.006;
        cx += (mx - cx) * 0.09; cy += (my - cy) * 0.09;
        planet.rotation.x = dragRotX;
        planet.rotation.y = dragRotY + t * 0.05;
        clouds.rotation.x = planet.rotation.x;
        clouds.rotation.y = planet.rotation.y + t * 0.08;
        [atm1, atm2].forEach((a) => a.rotation.copy(planet.rotation));
        rings[0].rotation.z = t * 0.1; rings[1].rotation.z = -t * 0.06; rings[2].rotation.z = t * 0.036;
        rings.forEach((r) => { r.rotation.x += 0.00025; });
        moonGroup.rotation.y += 0.008;
        galaxy.rotation.y = t * 0.05 + cx * 0.025; galaxy.rotation.x = t * 0.016 + cy * 0.012;
        
        /* shooting star */
        shotTimer += 0.016;
        if (shotTimer > 5.5) {
          const ox = -9 + Math.random() * 18, oy = 2.5 + Math.random() * 4;
          shot.position.set(ox, oy, -1);
          shotMat.opacity = 0.95;
          setTimeout(() => {
            shotMat.opacity = 0;
            shotTimer = 0;
          }, 480);
        }

        tsy += (sy - tsy) * 0.055;
        const heroH = H;
        const pr = Math.min(tsy / heroH, 1);
        cam.position.x = cx * 0.3;
        cam.position.y = 0.2 - pr * 2.4 + cy * 0.16;
        cam.position.z = 7.8 + pr * 1.6;
        cam.lookAt(0, 0, 0);
        rend.render(scene, cam);
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      observer.disconnect();
      cancelAnimationFrame(rafId);
      scene.clear();
      rend.dispose();
    };
  }, []);

  return (
    <section id="hero" aria-label="Introduction">
      <canvas ref={canvasRef} id="hc" aria-hidden="true" role="presentation" />
      <div className="h-cont">
        <div className="h-dash">
          <div className="h-right">
            <div className="p-card">
              <div className="p-head">
                <img src="/DP.jpg" alt="Abijith A R" className="p-img" />
                <div className="p-status" />
              </div>
              <div className="p-name">Abijith A R</div>
              <span className="p-tag">Creative Media Technologist</span>
              <div className="p-stats">
                <div className="p-stat">
                  <span className="p-stat-val">5+</span>
                  <span className="p-stat-lbl">Years</span>
                </div>
                <div className="p-stat">
                  <span className="p-stat-val">12+</span>
                  <span className="p-stat-lbl">Stacks</span>
                </div>
                <div className="p-stat">
                  <span className="p-stat-val">24+</span>
                  <span className="p-stat-lbl">Clients</span>
                </div>
              </div>
            </div>
          </div>

          <div className={`h-left ${collapsed ? "collapsed" : ""}`} id="h-desc-box">
            <p>
              Creative Media Technologist specializing in AI-assisted creative production, multimedia storytelling,
              branding, and front-end creative development.
            </p>
            <p className="h-second-p">
              Experienced in designing advertising creatives, producing cinematic photo/video content, and developing
              visually immersive digital experiences using technologies such as Three.js and WebGL. Skilled in combining
              creativity, marketing strategy, AI workflows, and visual communication to create modern, performance-driven
              digital experiences.
            </p>
            <button className="h-read-more" onClick={() => setCollapsed(!collapsed)}>
              {collapsed ? "Read More" : "Read Less"}
            </button>
            <div className="h-ctas" style={{ display: "flex", gap: "1.2rem", flexWrap: "wrap" }}>
              <a href="#contact" className="btn-ref">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round" style={{ marginTop: "-2px" }}>
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
                Connect
              </a>
              <a href="/Abijith A R - Resume.pdf" className="btn-ref outline" download target="_blank" rel="noopener noreferrer">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round" style={{ marginTop: "-2px" }}>
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                Resume
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="scr" aria-hidden="true">Scroll</div>

      <style jsx>{`
        #hero {
          position: relative;
          height: 100dvh;
          min-height: 640px;
          overflow: hidden;
          display: flex;
          align-items: center;
        }
        #hc {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
          transition: opacity 0.4s ease;
        }
        #hero::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 30%;
          z-index: 1;
          background: linear-gradient(to bottom, transparent, var(--void));
          pointer-events: none;
        }
        .h-cont {
          width: 100%;
          max-width: 950px;
          margin-left: 0;
          padding-left: 2rem;
          position: relative;
          z-index: 2;
        }
        .h-dash {
          display: grid;
          grid-template-columns: 0.85fr 1.15fr;
          align-items: center;
          gap: 3rem;
          background: rgba(10, 12, 20, 0.45) !important;
          -webkit-backdrop-filter: blur(32px) !important;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 2rem;
          padding: 3.5rem;
          position: relative;
          overflow: hidden;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
          opacity: 0;
          animation: heroFadeIn 0.85s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .h-dash {
          backdrop-filter: blur(32px) !important;
        }
        @keyframes heroFadeIn {
          to { opacity: 1; }
        }
        .h-left {
          display: flex;
          flex-direction: column;
          justify-content: center;
          border-left: 1px solid rgba(255, 255, 255, 0.05);
          padding-left: 2rem;
        }
        .h-left p { text-align: justify; color: var(--muted); font-size: 1.1rem; line-height: 1.7; max-width: 48ch; margin-bottom: 0.5rem; }
        .h-left p:last-of-type { margin-bottom: 2.5rem; }
        .h-right { display: flex; flex-direction: column; align-items: center; justify-content: center; }
        .p-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 1.5rem;
          padding: 2rem;
          width: 100%;
          max-width: 320px;
          text-align: center;
          transform: perspective(1000px) rotateY(12deg) rotateX(2deg);
          transition: transform 0.5s cubic-bezier(0.23, 1, 0.32, 1), background 0.3s ease, border-color 0.3s ease;
          box-shadow: -20px 20px 50px rgba(0, 0, 0, 0.5);
        }
        .p-card:hover {
          transform: perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1.02);
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(0, 212, 255, 0.3);
        }
        .p-name {
          font-family: var(--ba);
          font-weight: 800;
          font-size: 1.3rem;
          margin: 1.2rem 0 0.2rem;
          letter-spacing: 0.08em;
          background: linear-gradient(90deg, #fff, var(--neon), #bd00ff, var(--neon), #fff);
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: hshine 5s linear infinite;
          text-transform: uppercase;
        }
        @keyframes hshine { to { background-position: 200% center } }
        .p-head { position: relative; width: 120px; height: 120px; margin: 0 auto 1.5rem; border-radius: 50%; padding: 4px; background: linear-gradient(45deg, var(--neon), var(--gold)); }
        .p-img { width: 100%; height: 100%; border-radius: 50%; object-fit: cover; border: 3px solid var(--void); }
        .p-status { position: absolute; bottom: 8px; right: 8px; width: 14px; height: 14px; background: #00ff88; border-radius: 50%; border: 2px solid var(--void); box-shadow: 0 0 10px #00ff88; }
        .p-tag { font-size: 0.75rem; color: var(--dim); text-transform: uppercase; letter-spacing: 0.15em; margin-bottom: 1.5rem; display: block; }
        .p-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; border-top: 1px solid rgba(255, 255, 255, 0.1); padding-top: 1.5rem; margin-top: 1rem; }
        .p-stat-val { display: block; font-family: var(--ru); font-size: 1.1rem; color: var(--txt); }
        .p-stat-lbl { font-size: 0.65rem; color: var(--dim); text-transform: uppercase; letter-spacing: 0.05em; }
        .scr { position: absolute; bottom: 0.8rem; left: 50%; transform: translateX(-50%); z-index: 2; display: flex; flex-direction: column; align-items: center; gap: .6rem; font-family: var(--ex); font-size: .58rem; letter-spacing: .22em; text-transform: uppercase; color: var(--dim); }
        .scr::after { content: ''; width: 1px; height: 50px; background: linear-gradient(to bottom, transparent, var(--cyan), transparent); opacity: 0.8; animation: sb 2.5s ease-in-out infinite; }
        @keyframes sb { 0% { opacity: 0; transform: scaleY(0); transform-origin: top } 40% { opacity: 1; transform: scaleY(1); transform-origin: top } 60% { opacity: 1; transform: scaleY(1); transform-origin: bottom } 100% { opacity: 0; transform: scaleY(0); transform-origin: bottom } }
        .h-read-more { display: none; }

        @media(max-width: 968px) {
          .h-dash { grid-template-columns: 1fr; padding: 2.5rem; gap: 3rem; border-radius: 1.5rem; }
          .h-left { border-left: none; border-top: 1px solid rgba(255, 255, 255, 0.08); padding-left: 0; padding-top: 2.5rem; }
        }
        @media(max-width: 768px) {
          #hero { height: auto; padding: 100px 0 1.5rem !important; display: block; }
          .h-cont { padding: 0 1.2rem !important; }
          .h-dash { padding: 3rem 1.5rem !important; background: rgba(10, 12, 20, 0.7) !important; text-align: center; }
          .p-card {
            transform: none !important;
            margin: 0 auto !important;
            max-width: 280px !important;
            padding: 1.5rem !important;
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4) !important;
            transition: transform 0.3s cubic-bezier(0.23, 1, 0.32, 1), background 0.3s ease, border-color 0.3s ease !important;
          }
          .p-card:hover, .p-card:active {
            transform: scale(1.02) !important;
            background: rgba(255, 255, 255, 0.05) !important;
            border-color: rgba(0, 212, 255, 0.3) !important;
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4) !important;
          }
          .h-left { text-align: center !important; }
          .h-left p { 
            margin: 0 0 1.2rem !important; 
            text-align: justify !important; 
            text-justify: inter-word !important;
            hyphens: auto !important;
            -webkit-hyphens: auto !important;
            word-break: break-word !important;
            line-height: 1.6 !important;
          }
           .h-left.collapsed .h-second-p { display: none !important; }
          .h-read-more { 
            display: block !important; 
            position: relative !important;
            z-index: 15 !important;
            pointer-events: auto !important;
            background: var(--cyan) !important; 
            color: #000 !important; 
            border: none !important; 
            font-family: var(--ex); 
            font-size: 0.7rem !important; 
            font-weight: 700; 
            letter-spacing: 0.1em; 
            text-transform: uppercase; 
            margin: 0.5rem auto 1.8rem !important; 
            cursor: pointer; 
            padding: 0.5rem 1.4rem !important; 
            border-radius: 100px; 
            box-shadow: 0 5px 15px rgba(0, 212, 255, 0.2); 
          }
          .h-ctas { 
            display: flex !important;
            flex-direction: row !important;
            justify-content: center !important; 
            gap: 0.8rem !important;
            width: 100% !important;
            margin-top: 1.5rem !important;
          }
          .btn-ref {
            flex: 1 !important;
            width: auto !important;
            max-width: 160px !important;
            justify-content: center !important;
            padding: 0.8rem 1rem !important;
            margin-bottom: 0 !important;
            font-size: 0.78rem !important;
          }
          .scr {
            position: relative !important;
            bottom: auto !important;
            left: auto !important;
            transform: none !important;
            margin: 3.5rem auto 1.5rem !important;
            z-index: 2;
          }
        }
      `}</style>
    </section>
  );
}
