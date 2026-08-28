import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Plane, Play, RotateCcw, Volume2, VolumeX, ArrowDown, ChevronRight, Sparkles } from 'lucide-react';

interface CinematicArrivalIntroProps {
  onComplete?: () => void;
  onExploreClick?: () => void;
}

export const CinematicArrivalIntro: React.FC<CinematicArrivalIntroProps> = ({
  onComplete,
  onExploreClick,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [animationPhase, setAnimationPhase] = useState<'intro' | 'approaching' | 'passing' | 'revealed'>('intro');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);
  const [skipAvailable, setSkipAvailable] = useState<boolean>(true);
  const [progressPercent, setProgressPercent] = useState<number>(0);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Sound generator using Web Audio API (zero external assets needed)
  const playSonicBoomSound = () => {
    if (!soundEnabled) return;
    try {
      if (!audioCtxRef.current) {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioCtxRef.current = new AudioContextClass();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      const now = ctx.currentTime;
      
      // Jet engine swoosh
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(80, now);
      osc.frequency.exponentialRampToValueAtTime(320, now + 1.2);
      osc.frequency.exponentialRampToValueAtTime(40, now + 2.5);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(300, now);
      filter.frequency.exponentialRampToValueAtTime(2400, now + 1.2);
      filter.frequency.exponentialRampToValueAtTime(150, now + 2.8);

      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.25, now + 1.2);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 2.8);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 3.0);
    } catch {
      // Audio context fallback
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x06080d, 0.015);

    const camera = new THREE.PerspectiveCamera(
      55,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 2, 22);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0x0a192f, 1.8);
    scene.add(ambientLight);

    const cyanLight = new THREE.DirectionalLight(0x00f0ff, 3.5);
    cyanLight.position.set(10, 20, 15);
    scene.add(cyanLight);

    const purpleLight = new THREE.DirectionalLight(0x8b5cf6, 2.5);
    purpleLight.position.set(-15, -10, -10);
    scene.add(purpleLight);

    // -------------------------------------------------------------
    // PROCEDURAL STEALTH AEROSPACE JET (FUTURISTIC HYPERSONIC CRAFT)
    // -------------------------------------------------------------
    const jetGroup = new THREE.Group();

    // Fuselage (Sharp stealth body)
    const fuselageGeom = new THREE.ConeGeometry(0.9, 7.5, 5);
    fuselageGeom.rotateX(Math.PI / 2);
    fuselageGeom.scale(1.2, 0.45, 1);
    const darkHullMat = new THREE.MeshStandardMaterial({
      color: 0x0b111e,
      roughness: 0.25,
      metalness: 0.85,
      flatShading: true,
    });
    const fuselage = new THREE.Mesh(fuselageGeom, darkHullMat);
    jetGroup.add(fuselage);

    // Cockpit Canopy (Glowing cyber cyan glass)
    const canopyGeom = new THREE.ConeGeometry(0.35, 2.8, 4);
    canopyGeom.rotateX(Math.PI / 2);
    canopyGeom.scale(0.8, 0.35, 1);
    const canopyMat = new THREE.MeshPhysicalMaterial({
      color: 0x00f5ff,
      roughness: 0.1,
      metalness: 0.9,
      transmission: 0.7,
      transparent: true,
      opacity: 0.85,
      emissive: 0x004466,
      emissiveIntensity: 0.6,
    });
    const canopy = new THREE.Mesh(canopyGeom, canopyMat);
    canopy.position.set(0, 0.25, 0.6);
    jetGroup.add(canopy);

    // Swept Delta Wings (Forward-angled stealth wings)
    const wingShape = new THREE.Shape();
    wingShape.moveTo(0, 0);
    wingShape.lineTo(4.8, -1.8);
    wingShape.lineTo(4.2, -2.6);
    wingShape.lineTo(0.6, -1.8);
    wingShape.lineTo(-0.6, -1.8);
    wingShape.lineTo(-4.2, -2.6);
    wingShape.lineTo(-4.8, -1.8);
    wingShape.closePath();

    const extrudeSettings = { depth: 0.08, bevelEnabled: true, bevelSegments: 2, steps: 1, bevelSize: 0.03, bevelThickness: 0.03 };
    const wingGeom = new THREE.ExtrudeGeometry(wingShape, extrudeSettings);
    wingGeom.rotateX(Math.PI / 2);
    wingGeom.translate(0, 0, 0.3);
    const wingMesh = new THREE.Mesh(wingGeom, darkHullMat);
    jetGroup.add(wingMesh);

    // Wing Leading Edge Glow Stripes
    const edgeMat = new THREE.MeshBasicMaterial({ color: 0x22d3ee });
    const leftEdgeGeom = new THREE.BoxGeometry(0.04, 0.04, 5.2);
    leftEdgeGeom.rotateY(0.4);
    const leftEdge = new THREE.Mesh(leftEdgeGeom, edgeMat);
    leftEdge.position.set(2.4, 0.05, -0.7);
    jetGroup.add(leftEdge);

    const rightEdgeGeom = new THREE.BoxGeometry(0.04, 0.04, 5.2);
    rightEdgeGeom.rotateY(-0.4);
    const rightEdge = new THREE.Mesh(rightEdgeGeom, edgeMat);
    rightEdge.position.set(-2.4, 0.05, -0.7);
    jetGroup.add(rightEdge);

    // Twin Canted Vertical Stabilizers
    const finShape = new THREE.Shape();
    finShape.moveTo(0, 0);
    finShape.lineTo(0.8, 1.6);
    finShape.lineTo(1.4, 1.6);
    finShape.lineTo(1.8, 0);
    finShape.closePath();

    const finGeom = new THREE.ExtrudeGeometry(finShape, { depth: 0.05, bevelEnabled: false });
    finGeom.rotateY(Math.PI / 2);

    const leftFin = new THREE.Mesh(finGeom, darkHullMat);
    leftFin.position.set(0.9, 0.1, -1.8);
    leftFin.rotation.z = -0.32;
    jetGroup.add(leftFin);

    const rightFin = new THREE.Mesh(finGeom, darkHullMat);
    rightFin.position.set(-0.9, 0.1, -1.8);
    rightFin.rotation.z = 0.32;
    jetGroup.add(rightFin);

    // Dual Thrusters & Afterburners
    const thrusterMat = new THREE.MeshBasicMaterial({ color: 0x00ffff });
    const thrusterGeom = new THREE.CylinderGeometry(0.22, 0.28, 0.8, 16);
    thrusterGeom.rotateX(Math.PI / 2);

    const leftThruster = new THREE.Mesh(thrusterGeom, thrusterMat);
    leftThruster.position.set(0.45, 0, -3.4);
    jetGroup.add(leftThruster);

    const rightThruster = new THREE.Mesh(thrusterGeom, thrusterMat);
    rightThruster.position.set(-0.45, 0, -3.4);
    jetGroup.add(rightThruster);

    // Glowing Afterburner Plasma Cones
    const plasmaGeom = new THREE.ConeGeometry(0.26, 3.2, 16);
    plasmaGeom.rotateX(-Math.PI / 2);
    const plasmaMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.85,
    });
    const leftPlasma = new THREE.Mesh(plasmaGeom, plasmaMat);
    leftPlasma.position.set(0.45, 0, -5.0);
    jetGroup.add(leftPlasma);

    const rightPlasma = new THREE.Mesh(plasmaGeom, plasmaMat);
    rightPlasma.position.set(-0.45, 0, -5.0);
    jetGroup.add(rightPlasma);

    // Start Position far away
    jetGroup.position.set(0, 4, -120);
    jetGroup.rotation.set(0.1, 0, 0);
    scene.add(jetGroup);

    // -------------------------------------------------------------
    // ATMOSPHERIC SPEED LINES & HIGH-TECH PARTICLES
    // -------------------------------------------------------------
    const starCount = 600;
    const starGeom = new THREE.BufferGeometry();
    const starPos = new Float32Array(starCount * 3);
    const starSpeeds = new Float32Array(starCount);

    for (let i = 0; i < starCount; i++) {
      starPos[i * 3] = (Math.random() - 0.5) * 80;
      starPos[i * 3 + 1] = (Math.random() - 0.5) * 40;
      starPos[i * 3 + 2] = (Math.random() - 0.5) * 160;
      starSpeeds[i] = 0.5 + Math.random() * 2.0;
    }
    starGeom.setAttribute('position', new THREE.BufferAttribute(starPos, 3));

    const starMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.35,
      transparent: true,
      opacity: 0.7,
    });
    const starParticles = new THREE.Points(starGeom, starMat);
    scene.add(starParticles);

    // Sonic Shockwave Rings (triggered on camera pass)
    const ringGeom = new THREE.RingGeometry(0.8, 1.2, 32);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x22d3ee,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0,
    });
    const shockwaveRing = new THREE.Mesh(ringGeom, ringMat);
    shockwaveRing.position.set(0, 0, 10);
    scene.add(shockwaveRing);

    // Ground Cyber Grid
    const gridHelper = new THREE.GridHelper(200, 50, 0x00f0ff, 0x1e293b);
    gridHelper.position.y = -8;
    gridHelper.material.transparent = true;
    gridHelper.material.opacity = 0.25;
    scene.add(gridHelper);

    // -------------------------------------------------------------
    // ANIMATION & TRAJECTORY TIMELINE
    // -------------------------------------------------------------
    let startTime = performance.now();
    let animationFrameId: number;
    let hasPlayedBoom = false;

    const animate = () => {
      const now = performance.now();
      const elapsed = (now - startTime) / 1000; // in seconds

      // Flight sequence runs over 5.5 seconds
      const duration = 5.2;
      const progress = Math.min(elapsed / duration, 1.0);
      setProgressPercent(Math.round(progress * 100));

      // Particle streak animation
      const posArray = starGeom.attributes.position.array as Float32Array;
      for (let i = 0; i < starCount; i++) {
        posArray[i * 3 + 2] += starSpeeds[i] * (1 + progress * 4);
        if (posArray[i * 3 + 2] > 30) {
          posArray[i * 3 + 2] = -130;
        }
      }
      starGeom.attributes.position.needsUpdate = true;

      // Thruster flicker
      const flicker = 0.8 + Math.sin(elapsed * 45) * 0.25;
      leftPlasma.scale.set(1, 1, flicker);
      rightPlasma.scale.set(1, 1, flicker);

      let phaseToSet = 'approaching';
      if (progress < 0.65) {
        phaseToSet = 'approaching';
        // Smooth ease-in trajectory from -120 to +10
        const t = progress / 0.65;
        const easeIn = t * t * t;
        const currentZ = -120 + easeIn * 135;
        
        // Banking curve
        jetGroup.position.z = currentZ;
        jetGroup.position.x = Math.sin(t * Math.PI) * 4.5;
        jetGroup.position.y = 3 - easeIn * 2.5;
        jetGroup.rotation.z = -Math.sin(t * Math.PI) * 0.6; // bank right then recover
        jetGroup.rotation.x = -0.05 + easeIn * 0.15;

        camera.position.x = Math.sin(t * 2) * 0.8;
        camera.position.y = 2 + Math.cos(t * 3) * 0.3;
        camera.lookAt(jetGroup.position.x * 0.5, jetGroup.position.y * 0.5, jetGroup.position.z + 10);
      } else if (progress < 0.88) {
        phaseToSet = 'passing';
        if (!hasPlayedBoom) {
          hasPlayedBoom = true;
          playSonicBoomSound();
        }

        const t = (progress - 0.65) / 0.23;
        jetGroup.position.z = 15 + t * 45; // zooms past camera
        jetGroup.position.x += 0.1;
        jetGroup.rotation.z = 0.2;

        // Shockwave expansion
        shockwaveRing.material.opacity = Math.max(0, 0.9 - t * 1.1);
        shockwaveRing.scale.set(1 + t * 18, 1 + t * 18, 1);
        shockwaveRing.position.z = 8 + t * 4;

        // Camera shake
        camera.position.x = (Math.random() - 0.5) * (1 - t) * 0.6;
        camera.position.y = 1.5 + (Math.random() - 0.5) * (1 - t) * 0.6;
      } else {
        phaseToSet = 'revealed';
        jetGroup.position.z = 200; // far behind viewer
        shockwaveRing.material.opacity = 0;
        camera.position.set(0, 1, 18);
        camera.lookAt(0, 0, 0);
      }

      setAnimationPhase((prev) => (prev !== phaseToSet ? (phaseToSet as any) : prev));

      renderer.render(scene, camera);
      if (isVisibleOnScreen) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    let isVisibleOnScreen = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        const isNowVisible = entry.isIntersecting;
        if (isNowVisible && !isVisibleOnScreen) {
          isVisibleOnScreen = true;
          animationFrameId = requestAnimationFrame(animate);
        } else if (!isNowVisible && isVisibleOnScreen) {
          isVisibleOnScreen = false;
          cancelAnimationFrame(animationFrameId);
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    animationFrameId = requestAnimationFrame(animate);

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [soundEnabled]);

  const restartIntro = () => {
    setAnimationPhase('approaching');
    // Force re-render of canvas by recreating key
  };

  return (
    <div
      id="cinematic-hero-arrival"
      className="relative w-full min-h-screen bg-[#06080d] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* 3D WebGL Canvas Layer */}
      <div ref={containerRef} className="absolute inset-0 z-0 pointer-events-none" />

      {/* Atmospheric Vignette & Horizon Scanlines */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#06080d]/20 to-[#08090d] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(6,8,13,0.85)_100%)] pointer-events-none" />

      {/* Top Telemetry & Controls Bar */}
      <div className="absolute top-6 left-0 right-0 z-30 px-6 max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950/80 border border-cyan-500/40 text-cyan-400 font-mono text-[11px] backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
            <span>ORBITAL ARRIVAL TRAJECTORY</span>
          </div>
          <span className="hidden sm:inline font-mono text-xs text-slate-500">
            SPEED: MACH 4.8 // VEC[0, 2, 22]
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Sound Toggle */}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="px-3 py-1.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-cyan-300 font-mono text-xs flex items-center gap-1.5 transition-all backdrop-blur-md"
            title={soundEnabled ? 'Mute Audio FX' : 'Enable Sonic FX'}
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-cyan-400" /> : <VolumeX className="w-3.5 h-3.5 text-slate-500" />}
            <span className="hidden sm:inline">{soundEnabled ? 'FX ON' : 'FX OFF'}</span>
          </button>

          {/* Quick Skip or Replay */}
          {animationPhase === 'revealed' ? (
            <button
              onClick={restartIntro}
              className="px-3 py-1.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-cyan-300 font-mono text-xs flex items-center gap-1.5 transition-all backdrop-blur-md"
            >
              <RotateCcw className="w-3.5 h-3.5 text-cyan-400" />
              <span>REPLAY FLIGHT</span>
            </button>
          ) : (
            <button
              onClick={() => setAnimationPhase('revealed')}
              className="px-3 py-1.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white font-mono text-xs flex items-center gap-1.5 transition-all backdrop-blur-md"
            >
              <span>SKIP TO NAME</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Screen Shockwave Flash on Passing Phase */}
      <div
        className={`absolute inset-0 z-10 bg-cyan-400/20 pointer-events-none transition-opacity duration-300 ${
          animationPhase === 'passing' ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* ------------------------------------------------------------- */}
      {/* EDITORIAL REVEAL OF HARSH BHADORIYA */}
      {/* ------------------------------------------------------------- */}
      <div className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 text-center select-none space-y-6 pt-16 pb-12">
        {/* Pre-reveal Atmospheric HUD (Visible before & during approach) */}
        {animationPhase !== 'revealed' && (
          <div className="space-y-4 animate-pulse">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/70 border border-cyan-500/40 text-cyan-300 font-mono text-xs">
              <Plane className="w-3.5 h-3.5 rotate-45 text-cyan-400" />
              <span>AIRCRAFT INCOMING // RECEPTOR TARGET LOCKED</span>
            </div>
            <p className="font-mono text-xs text-slate-500 tracking-widest uppercase">
              Tracking Hypersonic Vector Path... {progressPercent}%
            </p>
          </div>
        )}

        {/* The Grand Editorial Name Reveal (Post-Pass) */}
        {animationPhase === 'revealed' && (
          <div className="space-y-6 animate-fade-in">
            {/* Top Micro Eyebrow */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/40 text-cyan-300 font-mono text-xs shadow-xl shadow-cyan-500/10">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span>B.TECH CSE (2025–2029) • GLA UNIVERSITY</span>
            </div>

            {/* Massive Editorial Name: HARSH then BHADORIYA with clean line-height & vertical separation */}
            <div className="flex flex-col items-center justify-center gap-1 sm:gap-2 py-1">
              <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black tracking-tight text-white font-display uppercase leading-[0.95] drop-shadow-2xl">
                HARSH
              </h1>
              <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-cyan-400 font-display uppercase leading-[0.95] drop-shadow-2xl">
                BHADORIYA
              </h1>
            </div>

            {/* Editorial Positioning Line */}
            <div className="space-y-3 max-w-3xl mx-auto pt-1">
              <div className="font-mono text-xs sm:text-base md:text-lg tracking-[0.25em] text-cyan-400 uppercase font-semibold">
                AI × FULL-STACK × CREATIVE TECHNOLOGY
              </div>
              <p className="text-xs sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed font-sans font-light">
                Architecting autonomous multi-agent systems, real-time command cockpits, and high-performance
                distributed applications.
              </p>
            </div>

            {/* Cinematic Direct Actions */}
            <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
              <a
                href="#scene-journey"
                onClick={onExploreClick}
                className="group px-6 sm:px-7 py-3 sm:py-3.5 rounded-2xl bg-cyan-600 hover:bg-cyan-500 text-white font-mono text-xs font-bold flex items-center gap-2.5 transition-all shadow-xl shadow-cyan-600/30 hover:scale-105"
              >
                <span>ENTER DIGITAL WORLD</span>
                <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
              </a>

              <a
                href="#projects"
                className="px-5 sm:px-6 py-3 sm:py-3.5 rounded-2xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700 hover:border-cyan-400 text-slate-200 font-mono text-xs font-medium flex items-center gap-2 transition-all backdrop-blur-md"
              >
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>Jump to Flagship Systems</span>
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Scroll Prompt Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 pointer-events-none opacity-80 animate-bounce">
        <span className="font-mono text-[10px] uppercase tracking-widest text-slate-400">
          SCROLL TO NAVIGATE THE STORY
        </span>
        <ArrowDown className="w-4 h-4 text-cyan-400" />
      </div>
    </div>
  );
};
