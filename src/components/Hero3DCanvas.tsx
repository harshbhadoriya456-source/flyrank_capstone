import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Sparkles, Layers, Cpu, Database, Cloud, Layout, CheckCircle2, Sliders } from 'lucide-react';

interface NodeInfo {
  name: string;
  category: string;
  role: string;
  status: string;
  metric: string;
  icon: React.ElementType;
  color: string;
}

const SYSTEM_NODES: Record<string, NodeInfo> = {
  ai: {
    name: 'Gemini AI Intelligence Core',
    category: 'REASONING ENGINE',
    role: 'Multimodal Generative Inference & Pedagogical Synthesis',
    status: 'ACTIVE // SUB-100MS',
    metric: '99.8% Grounding Precision',
    icon: Sparkles,
    color: '#06b6d4',
  },
  agents: {
    name: 'LangGraph Multi-Agent Mesh',
    category: 'ORCHESTRATION',
    role: 'Autonomous Branching, Grammar/Phonetics/Operations Workflows',
    status: '5 AGENTS SYNCHRONIZED',
    metric: 'Cyclic Graph State Machine',
    icon: Cpu,
    color: '#8b5cf6',
  },
  data: {
    name: 'ChromaDB & PostgreSQL Layer',
    category: 'PERSISTENCE & VECTOR MEMORY',
    role: 'Semantic Embedding Indexing & Relational Learning Trajectories',
    status: 'MEMORY PERSISTENT',
    metric: 'Zero-Cold-Start Retrieval',
    icon: Database,
    color: '#10b981',
  },
  cloud: {
    name: 'Docker & Google Cloud Run',
    category: 'INFRASTRUCTURE & DEVOPS',
    role: 'Serverless Container Ingress & WebSocket Broadcasting',
    status: 'CONTAINERIZED CLOUD',
    metric: 'Autoscaling Event Ingress',
    icon: Cloud,
    color: '#38bdf8',
  },
  app: {
    name: 'Next.js & FastAPI Interfaces',
    category: 'HUMAN-MACHINE INTERACTION',
    role: 'Real-time Telemetry, Interactive HUDs & Cybernetic Frontends',
    status: '60 FPS REACTIVE',
    metric: 'Sub-second Latency Stream',
    icon: Layout,
    color: '#f43f5e',
  },
};

export const Hero3DCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeNodeKey, setActiveNodeKey] = useState<string>('ai');
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [splineUrl, setSplineUrl] = useState<string>('');
  const [showSplineEmbed, setShowSplineEmbed] = useState<boolean>(false);
  const [isCustomUrlModalOpen, setIsCustomUrlModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (showSplineEmbed) return;
    const container = containerRef.current;
    if (!container) return;

    // Scene Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x08090d, 0.035);

    const camera = new THREE.PerspectiveCamera(
      55,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 14);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const pointLightCyan = new THREE.PointLight(0x06b6d4, 3, 30);
    pointLightCyan.position.set(5, 5, 5);
    scene.add(pointLightCyan);

    const pointLightViolet = new THREE.PointLight(0x8b5cf6, 3, 30);
    pointLightViolet.position.set(-5, -5, 5);
    scene.add(pointLightViolet);

    // Central Core Group
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // Central Core Wireframe Icosahedron (AI Core)
    const coreGeo = new THREE.IcosahedronGeometry(2.0, 2);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x06b6d4,
      wireframe: true,
      emissive: 0x0891b2,
      emissiveIntensity: 0.8,
      transparent: true,
      opacity: 0.85,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    coreMesh.userData = { key: 'ai' };
    coreGroup.add(coreMesh);

    // Inner glowing sphere
    const innerGeo = new THREE.SphereGeometry(1.1, 24, 24);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: false,
      transparent: true,
      opacity: 0.35,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    coreGroup.add(innerMesh);

    // Outer Orbiting Nodes
    const nodeDataList = [
      { key: 'agents', color: 0x8b5cf6, angle: 0, radius: 4.8, y: 1.2 },
      { key: 'data', color: 0x10b981, angle: (Math.PI * 2) / 4, radius: 5.2, y: -1.5 },
      { key: 'cloud', color: 0x38bdf8, angle: (Math.PI * 4) / 4, radius: 5.0, y: 1.6 },
      { key: 'app', color: 0xf43f5e, angle: (Math.PI * 6) / 4, radius: 4.7, y: -1.0 },
    ];

    const nodeMeshes: THREE.Mesh[] = [];
    const interactiveObjects: THREE.Object3D[] = [coreMesh];

    nodeDataList.forEach((node) => {
      const nodeGeo = new THREE.OctahedronGeometry(0.7, 1);
      const nodeMat = new THREE.MeshStandardMaterial({
        color: node.color,
        wireframe: true,
        emissive: node.color,
        emissiveIntensity: 0.7,
        transparent: true,
        opacity: 0.9,
      });
      const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
      nodeMesh.userData = { key: node.key, baseAngle: node.angle, radius: node.radius, y: node.y };
      
      const x = Math.cos(node.angle) * node.radius;
      const z = Math.sin(node.angle) * node.radius;
      nodeMesh.position.set(x, node.y, z);

      coreGroup.add(nodeMesh);
      nodeMeshes.push(nodeMesh);
      interactiveObjects.push(nodeMesh);

      // Line connecting to core
      const linePoints = [new THREE.Vector3(0, 0, 0), new THREE.Vector3(x, node.y, z)];
      const lineGeo = new THREE.BufferGeometry().setFromPoints(linePoints);
      const lineMat = new THREE.LineBasicMaterial({
        color: node.color,
        transparent: true,
        opacity: 0.35,
      });
      const line = new THREE.Line(lineGeo, lineMat);
      coreGroup.add(line);
    });

    // Particle Cloud System
    const particleCount = 450;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const c1 = new THREE.Color(0x06b6d4);
    const c2 = new THREE.Color(0x8b5cf6);

    for (let i = 0; i < particleCount; i++) {
      const r = 2.5 + Math.random() * 8.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);

      const mixed = Math.random() > 0.5 ? c1 : c2;
      colors[i * 3] = mixed.r;
      colors[i * 3 + 1] = mixed.g;
      colors[i * 3 + 2] = mixed.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.08,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    coreGroup.add(particles);

    // Mouse Parallax & Raycasting
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let targetRotationX = 0;
    let targetRotationY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      targetRotationY = mouse.x * 0.45;
      targetRotationX = -mouse.y * 0.35;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(interactiveObjects, false);
      if (intersects.length > 0) {
        const hit = intersects[0].object;
        if (hit.userData.key) {
          setActiveNodeKey(hit.userData.key);
          setIsHovered(true);
        }
      } else {
        setIsHovered(false);
      }
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (event.touches.length > 0) {
        const touch = event.touches[0];
        const rect = container.getBoundingClientRect();
        mouse.x = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((touch.clientY - rect.top) / rect.height) * 2 + 1;
        targetRotationY = mouse.x * 0.4;
        targetRotationX = -mouse.y * 0.3;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    let isVisibleOnScreen = true;
    const animate = () => {
      if (!isVisibleOnScreen) return;
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth camera/group tilt
      coreGroup.rotation.y += (targetRotationY - coreGroup.rotation.y) * 0.05 + 0.002;
      coreGroup.rotation.x += (targetRotationX - coreGroup.rotation.x) * 0.05;

      // Pulse Central Mesh
      const scale = 1 + Math.sin(elapsedTime * 2) * 0.04;
      coreMesh.scale.set(scale, scale, scale);
      coreMesh.rotation.y += 0.004;
      coreMesh.rotation.x += 0.002;

      // Orbit child nodes
      nodeMeshes.forEach((mesh, index) => {
        mesh.rotation.y += 0.015;
        mesh.rotation.x += 0.01;
        const currentAngle = mesh.userData.baseAngle + elapsedTime * 0.25;
        mesh.position.x = Math.cos(currentAngle) * mesh.userData.radius;
        mesh.position.z = Math.sin(currentAngle) * mesh.userData.radius;
        mesh.position.y = mesh.userData.y + Math.sin(elapsedTime * 2 + index) * 0.25;
      });

      // Rotate particle network
      particles.rotation.y -= 0.0015;

      renderer.render(scene, camera);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isNowVisible = entry.isIntersecting;
        if (isNowVisible && !isVisibleOnScreen) {
          isVisibleOnScreen = true;
          animate();
        } else if (!isNowVisible && isVisibleOnScreen) {
          isVisibleOnScreen = false;
          cancelAnimationFrame(animationFrameId);
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    animate();

    return () => {
      observer.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
    };
  }, [showSplineEmbed]);

  const activeNode = SYSTEM_NODES[activeNodeKey] || SYSTEM_NODES['ai'];
  const IconComponent = activeNode.icon;

  return (
    <div className="relative w-full h-[520px] lg:h-[620px] rounded-2xl overflow-hidden border border-cyan-500/20 bg-[#0a0d14]/90 shadow-2xl backdrop-blur-md">
      {/* Background Cyber Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />

      {/* Mode Control Bar */}
      <div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-700/60 text-slate-300">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>NEURAL ARCHITECTURE 3D ENGINE</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowSplineEmbed(!showSplineEmbed)}
            className={`px-3 py-1.5 rounded-lg border transition-all flex items-center gap-1.5 ${
              showSplineEmbed
                ? 'bg-violet-950/80 border-violet-500/60 text-violet-200 shadow-lg shadow-violet-500/20'
                : 'bg-slate-900/80 border-slate-700/60 text-slate-300 hover:border-cyan-500/50 hover:text-cyan-300'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{showSplineEmbed ? 'Active: Spline Embed' : 'Switch to Spline View'}</span>
          </button>

          {showSplineEmbed && (
            <button
              onClick={() => setIsCustomUrlModalOpen(true)}
              className="px-2.5 py-1.5 rounded-lg bg-slate-900/80 border border-slate-700/60 text-slate-300 hover:text-cyan-300"
              title="Set Custom Spline URL"
            >
              <Sliders className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* 3D Canvas / Spline Embed Container */}
      {!showSplineEmbed ? (
        <div
          ref={containerRef}
          className="w-full h-full cursor-grab active:cursor-grabbing relative"
          id="hero-threejs-canvas"
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center">
          {splineUrl ? (
            <iframe
              src={splineUrl}
              className="w-full h-full border-0 rounded-xl"
              title="Spline 3D Scene"
            />
          ) : (
            <div className="max-w-md p-6 rounded-2xl bg-slate-900/90 border border-violet-500/30 text-left">
              <div className="flex items-center gap-2 text-violet-400 font-mono text-xs mb-3">
                <Layers className="w-4 h-4" />
                <span>SPLINE SCENE INTEGRATION READY</span>
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Custom Spline 3D Slot</h4>
              <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                Clean container ready for your actual published Spline scene URL. No fake URLs are injected.
              </p>
              <button
                onClick={() => setIsCustomUrlModalOpen(true)}
                className="w-full py-2.5 px-4 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-medium text-sm transition-colors flex items-center justify-center gap-2 shadow-lg shadow-violet-600/30"
              >
                <span>Enter Your Spline Scene URL</span>
              </button>
              <button
                onClick={() => setShowSplineEmbed(false)}
                className="w-full mt-2 py-1.5 px-4 text-xs font-mono text-slate-400 hover:text-slate-200 text-center"
              >
                ← Return to Native 3D Neural System
              </button>
            </div>
          )}
        </div>
      )}

      {/* Live Interactive Node Inspector HUD */}
      {!showSplineEmbed && (
        <div className="absolute bottom-4 left-4 right-4 z-20 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Node Category Selector Buttons */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-xl bg-slate-950/85 border border-slate-800/80 backdrop-blur-md">
            {Object.entries(SYSTEM_NODES).map(([key, node]) => (
              <button
                key={key}
                onClick={() => setActiveNodeKey(key)}
                className={`px-2.5 py-1 text-xs font-mono rounded-lg transition-all flex items-center gap-1.5 ${
                  activeNodeKey === key
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: node.color }}
                />
                <span className="uppercase">{key}</span>
              </button>
            ))}
          </div>

          {/* Active Node Detail Card */}
          <div className="p-3.5 rounded-xl bg-slate-950/90 border border-cyan-500/30 backdrop-blur-xl shadow-xl max-w-lg">
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <div className="flex items-center gap-2">
                <div
                  className="p-1 rounded-md"
                  style={{ backgroundColor: `${activeNode.color}20`, color: activeNode.color }}
                >
                  <IconComponent className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-mono tracking-wider text-slate-400 uppercase">
                    {activeNode.category}
                  </span>
                  <h4 className="text-sm font-semibold text-white tracking-tight leading-tight">
                    {activeNode.name}
                  </h4>
                </div>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/70 border border-emerald-500/30 text-emerald-300 whitespace-nowrap">
                {activeNode.status}
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {activeNode.role}
            </p>
            <div className="mt-2 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-cyan-400/90">
              <span>METRIC: {activeNode.metric}</span>
              <span className="text-slate-400">Hover / Move cursor to rotate</span>
            </div>
          </div>
        </div>
      )}

      {/* Spline URL Config Modal */}
      {isCustomUrlModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-md p-6 rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white font-mono">SPLINE URL CONFIG</h3>
              <button
                onClick={() => setIsCustomUrlModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            <p className="text-xs text-slate-300 mb-4 leading-relaxed">
              Paste your public Spline scene export URL (e.g., <code className="text-cyan-300">https://my.spline.design/...</code>).
            </p>
            <input
              type="url"
              placeholder="https://my.spline.design/your-scene-code/index.html"
              value={splineUrl}
              onChange={(e) => setSplineUrl(e.target.value)}
              className="w-full p-3 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono text-xs focus:outline-none focus:border-cyan-500 mb-4"
            />
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setShowSplineEmbed(true);
                  setIsCustomUrlModalOpen(false);
                }}
                className="flex-1 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-medium text-sm transition-all"
              >
                Apply Spline Scene
              </button>
              <button
                onClick={() => setIsCustomUrlModalOpen(false)}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
