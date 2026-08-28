import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Eye, EyeOff, Sparkles, Activity, Layers } from 'lucide-react';

export const StoryBackgroundAnimation: React.FC = () => {
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const [currentSceneName, setCurrentSceneName] = useState<string>('ORBITAL ARRIVAL');
  const [currentSceneIndex, setCurrentSceneIndex] = useState<number>(1);
  const [backgroundVisible, setBackgroundVisible] = useState<boolean>(true);
  const [particleDensity, setParticleDensity] = useState<'optimal' | 'dense' | 'minimal'>('optimal');

  useEffect(() => {
    const container = canvasContainerRef.current;
    if (!container) return;

    // Three.js Scene Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x06080d, 0.008);

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 45);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    // ==============================================================
    // 1. HIGH-SPEED WARP & STORY PARTICLE FIELD (Deep Space / Cyber)
    // ==============================================================
    const particleCount = particleDensity === 'dense' ? 1400 : particleDensity === 'minimal' ? 400 : 800;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    const originalPositions = new Float32Array(particleCount * 3);

    const cyanColor = new THREE.Color(0x06b6d4);
    const violetColor = new THREE.Color(0x8b5cf6);
    const emeraldColor = new THREE.Color(0x10b981);
    const whiteColor = new THREE.Color(0xe2e8f0);

    for (let i = 0; i < particleCount; i++) {
      const x = (Math.random() - 0.5) * 120;
      const y = (Math.random() - 0.5) * 100;
      const z = (Math.random() - 0.5) * 120;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      originalPositions[i * 3] = x;
      originalPositions[i * 3 + 1] = y;
      originalPositions[i * 3 + 2] = z;

      velocities[i * 3] = (Math.random() - 0.5) * 0.04;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.04;
      velocities[i * 3 + 2] = Math.random() * 0.15 + 0.05; // forward motion

      // Dynamic color palette per region
      const rand = Math.random();
      let chosenColor = cyanColor;
      if (rand > 0.7) chosenColor = violetColor;
      else if (rand > 0.45) chosenColor = emeraldColor;
      else if (rand > 0.3) chosenColor = whiteColor;

      colors[i * 3] = chosenColor.r;
      colors[i * 3 + 1] = chosenColor.g;
      colors[i * 3 + 2] = chosenColor.b;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Particle Material with Soft Glow
    const particleTexture = createGlowTexture();
    const particleMaterial = new THREE.PointsMaterial({
      size: 1.6,
      vertexColors: true,
      map: particleTexture,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particlesMesh = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particlesMesh);

    // ==============================================================
    // 2. STORY NARRATIVE CONSTELLATION NODES (Multi-Agent Neural Mesh)
    // ==============================================================
    const nodeCount = 38;
    const nodeGroup = new THREE.Group();
    const nodeSpheres: THREE.Mesh[] = [];
    const nodeCoords: THREE.Vector3[] = [];

    const nodeMat = new THREE.MeshBasicMaterial({
      color: 0x22d3ee,
      wireframe: true,
    });
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
    });

    for (let i = 0; i < nodeCount; i++) {
      const radius = 22 + Math.random() * 25;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI;

      const pos = new THREE.Vector3(
        radius * Math.cos(phi) * Math.cos(theta),
        radius * Math.sin(phi),
        radius * Math.cos(phi) * Math.sin(theta)
      );
      nodeCoords.push(pos);

      const nodeGeom = new THREE.IcosahedronGeometry(0.7 + Math.random() * 0.5, 1);
      const nodeMesh = new THREE.Mesh(nodeGeom, nodeMat);
      nodeMesh.position.copy(pos);
      nodeGroup.add(nodeMesh);
      nodeSpheres.push(nodeMesh);

      // Inner glowing core
      const coreGeom = new THREE.SphereGeometry(0.3, 8, 8);
      const coreMesh = new THREE.Mesh(coreGeom, coreMat);
      nodeMesh.add(coreMesh);
    }

    // Dynamic Connections between nearby constellation nodes
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x06b6d4,
      transparent: true,
      opacity: 0.18,
      blending: THREE.AdditiveBlending,
    });

    const lineGeometry = new THREE.BufferGeometry();
    const linePositions: number[] = [];

    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        const dist = nodeCoords[i].distanceTo(nodeCoords[j]);
        if (dist < 18) {
          linePositions.push(
            nodeCoords[i].x,
            nodeCoords[i].y,
            nodeCoords[i].z,
            nodeCoords[j].x,
            nodeCoords[j].y,
            nodeCoords[j].z
          );
        }
      }
    }

    lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    const linesMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
    nodeGroup.add(linesMesh);
    scene.add(nodeGroup);

    // ==============================================================
    // 3. PERSISTENT CYBER MATRIX GROUND GRID (Perspective Floor)
    // ==============================================================
    const gridHelper = new THREE.GridHelper(180, 45, 0x06b6d4, 0x1e293b);
    gridHelper.position.y = -35;
    (gridHelper.material as THREE.Material).transparent = true;
    (gridHelper.material as THREE.Material).opacity = 0.22;
    scene.add(gridHelper);

    // Story Data Packet Mesh traveling along nodes
    const packetCount = 8;
    const packets: { mesh: THREE.Mesh; startNode: number; targetNode: number; progress: number }[] = [];
    const packetGeom = new THREE.SphereGeometry(0.35, 12, 12);
    const packetMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });

    for (let p = 0; p < packetCount; p++) {
      const pMesh = new THREE.Mesh(packetGeom, packetMat);
      scene.add(pMesh);
      packets.push({
        mesh: pMesh,
        startNode: Math.floor(Math.random() * nodeCount),
        targetNode: Math.floor(Math.random() * nodeCount),
        progress: Math.random(),
      });
    }

    // Mouse & Parallax Tracking
    let mouseX = 0;
    let mouseY = 0;
    let targetCameraX = 0;
    let targetCameraY = 0;
    let scrollYNormalized = 0;
    let targetScrollY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 14;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 14;
    };

    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll > 0) {
        targetScrollY = window.scrollY / maxScroll;
      }

      // Update story narrative state guarded to avoid redundant re-renders
      let nextScene = 'SCENE 01: ATMOSPHERIC ARRIVAL';
      let nextIndex = 1;
      if (targetScrollY < 0.15) {
        nextScene = 'SCENE 01: ATMOSPHERIC ARRIVAL';
        nextIndex = 1;
      } else if (targetScrollY < 0.32) {
        nextScene = 'SCENE 02: IDENTITY & 3D SYSTEM';
        nextIndex = 2;
      } else if (targetScrollY < 0.52) {
        nextScene = 'SCENE 03: MULTI-AGENT STORY ENGINE';
        nextIndex = 3;
      } else if (targetScrollY < 0.72) {
        nextScene = 'SCENE 04: COMPUTATIONAL GRAPH TRAVERSAL';
        nextIndex = 4;
      } else if (targetScrollY < 0.88) {
        nextScene = 'SCENE 05: LIFECYCLE & SERVERLESS MESH';
        nextIndex = 5;
      } else {
        nextScene = 'SCENE 06: PRODUCTION DISPATCH & RESOLUTION';
        nextIndex = 6;
      }

      setCurrentSceneName((prev) => (prev !== nextScene ? nextScene : prev));
      setCurrentSceneIndex((prev) => (prev !== nextIndex ? nextIndex : prev));
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // ==============================================================
    // ANIMATION LOOP
    // ==============================================================
    let animationFrameId: number;
    let clock = new THREE.Clock();
    let isTabActive = true;

    const handleVisibilityChange = () => {
      isTabActive = document.visibilityState === 'visible';
      if (isTabActive && backgroundVisible) {
        clock.start();
        animate();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const animate = () => {
      if (!isTabActive || !backgroundVisible) return;
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();
      scrollYNormalized += (targetScrollY - scrollYNormalized) * 0.08;

      // Camera Smooth Follow & Dynamic Pitch based on Scroll Depth
      targetCameraX = mouseX * 0.4;
      targetCameraY = -mouseY * 0.4 + (scrollYNormalized - 0.5) * -18;
      camera.position.x += (targetCameraX - camera.position.x) * 0.04;
      camera.position.y += (targetCameraY - camera.position.y) * 0.04;
      camera.lookAt(0, (scrollYNormalized - 0.5) * -12, 0);

      // Rotate Constellation Graph
      nodeGroup.rotation.y = elapsedTime * 0.04 + scrollYNormalized * Math.PI;
      nodeGroup.rotation.x = Math.sin(elapsedTime * 0.03) * 0.15;

      // Animate Nodes (Breathing Pulsation)
      nodeSpheres.forEach((sphere, idx) => {
        const scale = 1 + Math.sin(elapsedTime * 2 + idx) * 0.25;
        sphere.scale.set(scale, scale, scale);
      });

      // Update Particle Stream
      const posArray = particleGeometry.attributes.position.array as Float32Array;
      const speedMultiplier = 1 + scrollYNormalized * 2.5;

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        posArray[i3 + 2] += velocities[i3 + 2] * speedMultiplier;

        // Reset particle if it travels too far past camera
        if (posArray[i3 + 2] > 55) {
          posArray[i3 + 2] = -65;
          posArray[i3] = (Math.random() - 0.5) * 120;
          posArray[i3 + 1] = (Math.random() - 0.5) * 100;
        }
      }
      particleGeometry.attributes.position.needsUpdate = true;

      // Animate Cyber Data Packets along Constellation paths
      packets.forEach((packet) => {
        packet.progress += 0.008;
        if (packet.progress >= 1) {
          packet.progress = 0;
          packet.startNode = packet.targetNode;
          packet.targetNode = Math.floor(Math.random() * nodeCount);
        }

        const start = nodeCoords[packet.startNode];
        const end = nodeCoords[packet.targetNode];
        if (start && end) {
          const currentLocal = new THREE.Vector3().lerpVectors(start, end, packet.progress);
          const worldPos = currentLocal.clone().applyEuler(nodeGroup.rotation);
          packet.mesh.position.copy(worldPos);
        }
      });

      // Animate Floor Grid
      gridHelper.position.z = (elapsedTime * 5 * speedMultiplier) % 4;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [particleDensity, backgroundVisible]);

  return (
    <>
      {/* Fixed Fullscreen Background WebGL Canvas */}
      <div
        ref={canvasContainerRef}
        className={`fixed inset-0 z-[-1] pointer-events-none transition-opacity duration-700 select-none ${
          backgroundVisible ? 'opacity-80' : 'opacity-0'
        }`}
        aria-hidden="true"
      />

      {/* Atmospheric Horizon Gradient Layers (Ensures 100% text contrast across entire site) */}
      <div className="fixed inset-0 z-[-1] bg-gradient-to-b from-[#06080d]/80 via-[#06080d]/70 to-[#06080d]/90 pointer-events-none" />
      <div className="fixed inset-0 z-[-1] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-950/15 via-transparent to-transparent pointer-events-none" />

      {/* Floating Story Telemetry Overlay (Bottom-Left) */}
      <div className="fixed bottom-6 left-6 z-30 hidden sm:flex items-center gap-3 select-none pointer-events-auto">
        <div className="p-2.5 rounded-2xl bg-slate-950/90 border border-slate-800/90 backdrop-blur-md shadow-2xl flex items-center gap-3 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <Activity className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-white font-semibold tracking-wider text-[11px]">
              {currentSceneName}
            </span>
          </div>

          <span className="h-3 w-px bg-slate-800" />

          {/* Toggle Background FX */}
          <button
            onClick={() => setBackgroundVisible(!backgroundVisible)}
            className="p-1 rounded-lg hover:bg-slate-900 text-slate-400 hover:text-cyan-300 transition-colors"
            title={backgroundVisible ? 'Mute Background Story Canvas' : 'Show Background Story Canvas'}
          >
            {backgroundVisible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>
    </>
  );
};

// Helper: Circular Glow Texture for WebGL Points
function createGlowTexture(): THREE.Texture {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.2, 'rgba(6, 182, 212, 0.8)');
    gradient.addColorStop(0.6, 'rgba(6, 182, 212, 0.2)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 64, 64);
  }
  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}
