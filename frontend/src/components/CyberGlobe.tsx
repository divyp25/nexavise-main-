import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import worldMap from '@svg-maps/world';
import { Fingerprint, ShieldCheck, Terminal, Network, Cpu, ShieldAlert, Key, Eye } from 'lucide-react';

interface ThreatNode {
  name: string;
  x: number;
  y: number;
  fact: string;
  icon: any;
}

const threats: ThreatNode[] = [
  { name: "Identity", x: 220, y: 220, fact: "Identity: Multi-Factor Authentication enforcement monitoring 1M+ users.", icon: Fingerprint },
  { name: "Data Security", x: 300, y: 350, fact: "Data Security: AES-256 encryption. Zero Data Loss latency in continuous scanning.", icon: ShieldCheck },
  { name: "Enterprise", x: 500, y: 150, fact: "Enterprise: Ransomware protection neutralizing active lateral threats.", icon: Terminal },
  { name: "Government", x: 750, y: 250, fact: "Government: Tier-1 cloud workload posture secured across AWS/Azure.", icon: Network },
  { name: "Infrastructure", x: 450, y: 300, fact: "Infrastructure: SCADA systems monitored by AI threat intelligence.", icon: Cpu },
  { name: "E-Commerce", x: 600, y: 400, fact: "E-Commerce: Advanced DDoS mitigation deflecting 5TBps attack vectors.", icon: ShieldAlert },
  { name: "Healthcare", x: 850, y: 450, fact: "Healthcare: Encrypted patient databases secured to HIPAA standards.", icon: Key },
  { name: "Finance", x: 900, y: 200, fact: "Finance: Zero Trust architecture blocking unauthorized cross-border transactions.", icon: Eye }
];

export const CyberGlobe = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // SCENE, CAMERA, RENDERER
    const scene = new THREE.Scene();
    const w = mountRef.current.clientWidth;
    const h = mountRef.current.clientHeight;

    const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 1000);
    camera.position.set(0, 0, 320);

    // Shift the camera frustum so the globe renders on the right side of the screen
    // Negative X offset shifts the frustum left, which makes the scene appear shifted right.
    const isDesktop = window.innerWidth >= 1024;
    if (isDesktop) {
      camera.setViewOffset(w, h, w * 0.05, 0, w, h);
    }

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(w, h);
    // Explicitly override Tailwind's canvas max-width: 100% just in case
    renderer.domElement.style.maxWidth = 'none';
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Clear any existing canvases left by React StrictMode double-mounting
    while (mountRef.current.firstChild) {
      mountRef.current.removeChild(mountRef.current.firstChild);
    }
    mountRef.current.appendChild(renderer.domElement);

    // COLORS - Theme Aware
    const getColors = () => {
      const isDark = document.documentElement.classList.contains('dark');
      return {
        globeBase: isDark ? 0x0a0a0a : 0xf1f5f9, // Extremely dark base to reduce brightness
        particleColor: isDark ? 0x0ea5e9 : 0x4f46e5, // Slightly softer sky blue
        arcColor: isDark ? 0x0ea5e9 : 0x4f46e5,
      };
    };

    let colors = getColors();
    const globeRadius = 100;

    // 1. INNER OCCLUSION SPHERE (Opaque to fix depth sorting/flickering)
    const sphereGeometry = new THREE.SphereGeometry(globeRadius - 0.5, 64, 64);
    const sphereMaterial = new THREE.MeshBasicMaterial({
      color: colors.globeBase,
      transparent: false,
    });
    const baseSphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

    // ATMOSPHERIC EDGE GLOW (Highlights the full sphere shape so it doesn't look cut off)
    const createGlowTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 128;
      canvas.height = 128;
      const context = canvas.getContext('2d')!;
      const gradient = context.createRadialGradient(64, 64, 0, 64, 64, 64);
      gradient.addColorStop(0, 'rgba(255,255,255,0.8)');
      gradient.addColorStop(0.7, 'rgba(255,255,255,0.3)');
      gradient.addColorStop(1, 'rgba(255,255,255,0)');
      context.fillStyle = gradient;
      context.fillRect(0, 0, 128, 128);
      return new THREE.CanvasTexture(canvas);
    };

    const glowMaterial = new THREE.SpriteMaterial({
      map: createGlowTexture(),
      color: colors.particleColor,
      transparent: true,
      opacity: 0.15,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const glowSprite = new THREE.Sprite(glowMaterial);
    glowSprite.scale.set(globeRadius * 2.8, globeRadius * 2.8, 1);
    // Add to a separate group so it doesn't rotate with the globe
    const glowGroup = new THREE.Group();
    glowGroup.add(glowSprite);
    scene.add(glowGroup);

    // 2. GENERATE LAT/LON GRID FOR SYMMETRICAL SQUARED DOTS
    const particlesGeometry = new THREE.BufferGeometry();
    const particleTargetPositions: number[] = [];
    const particleStartPositions: number[] = [];
    const particleColors: number[] = [];

    const landColor = new THREE.Color(colors.particleColor);

    // Draw SVG to canvas for land detection
    const canvas = document.createElement('canvas');
    canvas.width = 1010;
    canvas.height = 666;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });

    if (ctx) {
      ctx.fillStyle = '#fff';
      worldMap.locations.forEach((loc: any) => {
        if (loc.path) {
          const p = new Path2D(loc.path);
          ctx.fill(p);
        }
      });
      const imgData = ctx.getImageData(0, 0, 1010, 666).data;

      const step = 6; // Spacing between dots
      // Go slightly beyond 666 to ensure the south pole is fully capped
      for (let y = 0; y <= 666; y += step) {
        for (let x = 0; x < 1010; x += step) {
          // ensure we don't read out of bounds
          const safeY = Math.min(y, 665);
          const idx = (safeY * 1010 + x) * 4;
          const isLand = imgData[idx + 3] > 128;

          if (isLand) {
            // Map 2D image coordinates to 3D sphere
            const phi = (y / 666) * Math.PI;
            const theta = (x / 1010) * Math.PI * 2 - Math.PI;

            const v = new THREE.Vector3().setFromSphericalCoords(globeRadius, phi, theta);
            particleTargetPositions.push(v.x, v.y, v.z);

            // Start positions: Scattered high above the globe, falling down like a data shower
            const startX = v.x + (Math.random() - 0.5) * 800;
            const startY = v.y + 600 + Math.random() * 1000;
            const startZ = v.z + (Math.random() - 0.5) * 800;
            particleStartPositions.push(startX, startY, startZ);

            particleColors.push(landColor.r, landColor.g, landColor.b);
          }
        }
      }
    }

    const posAttribute = new THREE.Float32BufferAttribute(particleStartPositions, 3);
    posAttribute.setUsage(THREE.DynamicDrawUsage);
    particlesGeometry.setAttribute('position', posAttribute);

    particlesGeometry.setAttribute('color', new THREE.Float32BufferAttribute(particleColors, 3));

    const createCircleTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 32;
      canvas.height = 32;
      const context = canvas.getContext('2d')!;
      const gradient = context.createRadialGradient(16, 16, 0, 16, 16, 16);
      gradient.addColorStop(0, 'rgba(255,255,255,1)');
      gradient.addColorStop(0.5, 'rgba(255,255,255,0.8)');
      gradient.addColorStop(1, 'rgba(255,255,255,0)');
      context.fillStyle = gradient;
      context.fillRect(0, 0, 32, 32);
      return new THREE.CanvasTexture(canvas);
    };

    const particleTexture = createCircleTexture();

    const particlesMaterial = new THREE.PointsMaterial({
      color: colors.particleColor,
      size: 2.5,
      map: particleTexture,
      transparent: true,
      opacity: 0.7,
      depthWrite: false,
    });

    const continentParticles = new THREE.Points(particlesGeometry, particlesMaterial);
    continentParticles.frustumCulled = false; // MUST BE FALSE! Otherwise Three.js culls it because initial bounding box is off-screen!

    // Group to hold globe
    const globeGroup = new THREE.Group();
    globeGroup.add(baseSphere);
    globeGroup.add(continentParticles);
    scene.add(globeGroup);

    // 3. THREAT NODES (Now only saving the 3D vectors for HTML projection)
    const hubVectors: THREE.Vector3[] = [];

    threats.forEach((hub) => {
      const phi = (hub.y / 666) * Math.PI;
      const theta = (hub.x / 1010) * Math.PI * 2 - Math.PI;
      const v = new THREE.Vector3().setFromSphericalCoords(globeRadius + 1.0, phi, theta);
      hubVectors.push(v);
    });

    // 4. STATIC RAYS INTERCONNECTING THREATS
    const arcsGroup = new THREE.Group();
    const connections = [
      [0, 1], [0, 2], [1, 3], [2, 3], [2, 4], [3, 5], [4, 5], [5, 6], [6, 7], [5, 7]
    ];

    const arcPointsArray: THREE.Vector3[] = [];
    const curves: THREE.QuadraticBezierCurve3[] = [];

    connections.forEach(([startIdx, endIdx]) => {
      const start = hubVectors[startIdx];
      const end = hubVectors[endIdx];
      const distance = start.distanceTo(end);
      const mid = start.clone().add(end).multiplyScalar(0.5).normalize().multiplyScalar(globeRadius + distance * 0.3);

      const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
      curves.push(curve);
      arcPointsArray.push(...curve.getPoints(20));
    });

    const arcsGeometry = new THREE.BufferGeometry().setFromPoints(arcPointsArray);
    const arcsMaterial = new THREE.LineDashedMaterial({
      color: colors.arcColor,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
      dashSize: 4,
      gapSize: 4,
    });
    const staticArcs = new THREE.Line(arcsGeometry, arcsMaterial);
    staticArcs.computeLineDistances(); // Must be called on the Line, not the geometry!
    arcsGroup.add(staticArcs);

    // MOVING DATA POINTS (Traffic packets)
    const movingPointsGeometry = new THREE.BufferGeometry();
    const movingPointsPositions = new Float32Array(curves.length * 3);
    movingPointsGeometry.setAttribute('position', new THREE.BufferAttribute(movingPointsPositions, 3));

    const movingPointsMaterial = new THREE.PointsMaterial({
      color: colors.particleColor,
      size: 4.0,
      map: particleTexture,
      transparent: true,
      opacity: 1.0,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    const movingPoints = new THREE.Points(movingPointsGeometry, movingPointsMaterial);
    arcsGroup.add(movingPoints);

    globeGroup.add(arcsGroup);

    // 5. WIREFRAME LAT/LON GRID
    const wireframeGeometry = new THREE.SphereGeometry(globeRadius + 0.1, 32, 32);
    const wireframeEdges = new THREE.EdgesGeometry(wireframeGeometry);
    const wireframeMat = new THREE.LineBasicMaterial({
      color: colors.particleColor,
      transparent: true,
      opacity: 0.25 // Increased visibility so the poles are clearly defined
    });
    const wireframe = new THREE.LineSegments(wireframeEdges, wireframeMat);
    globeGroup.add(wireframe);

    // INTERACTION & ANIMATION
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.3; // Slower rotation for better readability

    let targetRotationY = -Math.PI / 4;
    globeGroup.rotation.y = targetRotationY;
    globeGroup.rotation.x = 0.2;

    // THEME OBSERVER
    const observer = new MutationObserver(() => {
      const newColors = getColors();
      sphereMaterial.color.setHex(newColors.globeBase);
      particlesMaterial.color.setHex(newColors.particleColor);
      wireframeMat.color.setHex(newColors.particleColor);
      arcsMaterial.color.setHex(newColors.arcColor);
      movingPointsMaterial.color.setHex(newColors.particleColor);
      glowMaterial.color.setHex(newColors.particleColor);
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    // RESIZE
    const handleResize = () => {
      if (!mountRef.current) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;

      const isDesktop = window.innerWidth >= 1024;
      if (isDesktop) {
        camera.setViewOffset(w, h, w * 0.05, 0, w, h);
      } else {
        camera.clearViewOffset();
      }

      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', handleResize);

    // ANIMATION LOOP
    let animationFrameId: number;
    let introProgress = 0; // Track formation animation
    let lastTime = performance.now();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const now = performance.now();
      const delta = Math.min((now - lastTime) / 1000, 0.1); // Safe delta clamped to max 100ms
      lastTime = now;
      const elapsedTime = now / 1000;

      controls.update();

      // INTRO FORMATION ANIMATION
      if (introProgress < 1) {
        introProgress += delta * 0.7; // Assembly speed (~1.4s)
        if (introProgress > 1) introProgress = 1;

        // Cubic Ease Out
        const ease = 1 - Math.pow(1 - introProgress, 3);

        const currentPositions = particlesGeometry.attributes.position.array as Float32Array;
        for (let i = 0; i < currentPositions.length; i++) {
          const start = particleStartPositions[i];
          const target = particleTargetPositions[i];
          currentPositions[i] = start + (target - start) * ease;
        }
        particlesGeometry.attributes.position.needsUpdate = true;

        // Hide secondary elements until formed
        arcsGroup.visible = false;
        wireframe.visible = false;
        glowGroup.visible = false;
      } else {
        arcsGroup.visible = true;
        wireframe.visible = true;
        glowGroup.visible = true;
      }

      // Animate the dashed arcs
      (arcsMaterial as any).dashOffset -= 0.01;

      // Animate moving data points along curves
      const positions = movingPointsGeometry.attributes.position.array as Float32Array;
      curves.forEach((curve, i) => {
        // Offset each point so they don't all move identically
        const t = (elapsedTime * 0.3 + i * 0.15) % 1;
        const pos = curve.getPointAt(t);
        positions[i * 3] = pos.x;
        positions[i * 3 + 1] = pos.y;
        positions[i * 3 + 2] = pos.z;
      });
      movingPointsGeometry.attributes.position.needsUpdate = true;

      // HTML Nodes projection
      if (mountRef.current && popupRef.current) {
        const w = mountRef.current.clientWidth;
        const h = mountRef.current.clientHeight;
        const domNodes = popupRef.current.children;

        threats.forEach((_, i) => {
          const domNode = domNodes[i] as HTMLElement;
          if (!domNode) return;

          const worldPos = hubVectors[i].clone().applyMatrix4(globeGroup.matrixWorld);

          // Front-facing check
          const camDir = camera.position.clone().sub(globeGroup.position).normalize();
          const nodeNormal = worldPos.clone().sub(globeGroup.position).normalize();
          const isFacing = camDir.dot(nodeNormal) > 0;

          if (isFacing && introProgress >= 1) {
            const screenPos = worldPos.clone().project(camera);
            const x = (screenPos.x * 0.5 + 0.5) * w;
            const y = -(screenPos.y * 0.5 - 0.5) * h;

            domNode.style.transform = `translate(-50%, -50%) translate3d(${x}px, ${y}px, 0)`;
            if (domNode.style.opacity !== '1') {
              domNode.style.opacity = '1';
              domNode.style.pointerEvents = 'auto';
            }

            // Prevent going off-screen on the right side
            const line = domNode.children[1] as HTMLElement;
            const popup = domNode.children[2] as HTMLElement;
            const isRight = x > w * 0.7;
            const currentRightState = domNode.dataset.isRight === 'true';

            if (isRight !== currentRightState) {
              domNode.dataset.isRight = isRight.toString();
              if (isRight) {
                line.className = "absolute top-1/2 -translate-y-1/2 h-px bg-indigo-600 dark:bg-cyan-500 transition-all duration-300 w-16 pointer-events-none right-full";
                popup.className = "absolute top-1/2 -translate-y-1/2 right-[calc(100%+4rem)] transition-opacity duration-300 pointer-events-none w-56";
              } else {
                line.className = "absolute top-1/2 -translate-y-1/2 h-px bg-indigo-600 dark:bg-cyan-500 transition-all duration-300 w-16 pointer-events-none left-full";
                popup.className = "absolute top-1/2 -translate-y-1/2 left-[calc(100%+4rem)] transition-opacity duration-300 pointer-events-none w-56";
              }
            }
          } else {
            if (domNode.style.opacity !== '0') {
              domNode.style.opacity = '0';
              domNode.style.pointerEvents = 'none';
            }
          }
        });
      }

      renderer.render(scene, camera);
    };

    animate();

    // CLEANUP
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
      controls.dispose();

      if (mountRef.current && renderer.domElement) {
        if (mountRef.current.contains(renderer.domElement)) {
          mountRef.current.removeChild(renderer.domElement);
        }
      }

      sphereGeometry.dispose();
      sphereMaterial.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      particleTexture.dispose();
      wireframeGeometry.dispose();
      wireframeEdges.dispose();
      wireframeMat.dispose();
      arcsGeometry.dispose();
      arcsMaterial.dispose();
      movingPointsGeometry.dispose();
      movingPointsMaterial.dispose();
      glowMaterial.map?.dispose();
      glowMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div
        ref={mountRef}
        className="absolute inset-0 w-full h-full pointer-events-auto"
      />

      {/* HTML Nodes Container */}
      <div ref={popupRef} className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
        {threats.map((node, i) => {
          const Icon = node.icon;
          return (
            <div
              key={i}
              className="absolute left-0 top-0 group transition-opacity duration-300 pointer-events-none"
              style={{ opacity: 0, willChange: 'transform, opacity' }}
            >
              {/* Circular Icon Node */}
              <div className="relative flex items-center justify-center h-8 w-8 rounded-full bg-indigo-600 dark:bg-cyan-500 text-white dark:text-slate-900 hover:bg-indigo-500 dark:hover:bg-cyan-400 cursor-pointer pointer-events-auto border-2 border-transparent hover:border-white transition-colors z-10">
                <Icon className="h-4 w-4" />

                {/* Outer ping ring */}
                <div className="absolute inset-0 rounded-full border border-indigo-600 dark:border-cyan-500 animate-[ping_3s_ease-out_infinite] opacity-50" />
              </div>

              {/* Connecting Line (Horizontal) */}
              <div className="absolute top-1/2 -translate-y-1/2 h-px bg-indigo-600 dark:bg-cyan-500 transition-all duration-300 w-16 pointer-events-none left-full" />

              {/* Bracket Style Popup */}
              <div className="absolute top-1/2 -translate-y-1/2 left-[calc(100%+4rem)] transition-opacity duration-300 pointer-events-none w-56"
              >
                {/* Bracket Borders */}
                <div className="relative p-3 border-y border-indigo-600/40 dark:border-cyan-500/40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm">
                  {/* Left Bracket Ends */}
                  <div className="absolute left-0 top-0 w-1.5 h-1.5 border-l border-t border-indigo-600 dark:border-cyan-500" />
                  <div className="absolute left-0 bottom-0 w-1.5 h-1.5 border-l border-b border-indigo-600 dark:border-cyan-500" />
                  {/* Right Bracket Ends */}
                  <div className="absolute right-0 top-0 w-1.5 h-1.5 border-r border-t border-indigo-600 dark:border-cyan-500" />
                  <div className="absolute right-0 bottom-0 w-1.5 h-1.5 border-r border-b border-indigo-600 dark:border-cyan-500" />

                  <p className="text-xs text-indigo-700 dark:text-cyan-400 leading-relaxed font-mono">
                    {node.fact}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
