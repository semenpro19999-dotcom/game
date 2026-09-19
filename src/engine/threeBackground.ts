import * as THREE from 'three';

export class Background3D {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  animationId: number = 0;
  objects: THREE.Object3D[] = [];
  mouse = { x: 0, y: 0 };

  constructor(canvas: HTMLCanvasElement) {
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x0F0F12, 0.035);

    this.camera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 0.1, 100);
    this.camera.position.set(0, 2, 8);

    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.2;

    this.createScene();
    this.bindEvents();
    this.animate();
  }

  createScene() {
    // Ambient + directional
    const ambient = new THREE.AmbientLight(0x404040, 0.6);
    this.scene.add(ambient);

    const dir = new THREE.DirectionalLight(0x00D9FF, 2);
    dir.position.set(5,10,5);
    this.scene.add(dir);

    const dir2 = new THREE.DirectionalLight(0xFF4D00, 1.2);
    dir2.position.set(-5,5,-5);
    this.scene.add(dir2);

    // Ground plane with grid
    const groundGeo = new THREE.PlaneGeometry(40,40,20,20);
    const groundMat = new THREE.MeshStandardMaterial({ 
      color: 0x18181B, 
      roughness: 0.8, 
      metalness: 0.2,
      wireframe: false,
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI/2;
    ground.position.y = -1.5;
    this.scene.add(ground);

    // Grid helper
    const grid = new THREE.GridHelper(40, 40, 0x232326, 0x1A1A1A);
    grid.position.y = -1.49;
    this.scene.add(grid);

    // Floating crates (destructible covers)
    for (let i=0;i<12;i++) {
      const geo = new THREE.BoxGeometry(0.8 + Math.random()*0.6, 0.8 + Math.random()*0.6, 0.8 + Math.random()*0.6);
      const mat = new THREE.MeshStandardMaterial({ 
        color: i%2===0 ? 0x2A2A2E : 0x3A3A3E, 
        roughness: 0.7, 
        metalness: 0.1,
        emissive: i%3===0 ? new THREE.Color(0x00D9FF) : new THREE.Color(0x000000),
        emissiveIntensity: i%3===0 ? 0.15 : 0
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(
        (Math.random()-0.5)*20,
        Math.random()*3,
        (Math.random()-0.5)*20 - 2
      );
      mesh.rotation.set(Math.random()*Math.PI, Math.random()*Math.PI, Math.random()*Math.PI);
      mesh.userData = { rotSpeed: (Math.random()-0.5)*0.005, floatSpeed: 0.3+Math.random()*0.7, floatOffset: Math.random()*Math.PI*2 };
      this.objects.push(mesh);
      this.scene.add(mesh);
    }

    // Weapon silhouettes (floating)
    const weaponGeo = new THREE.BoxGeometry(2.2, 0.2, 0.3);
    const weaponMat = new THREE.MeshStandardMaterial({ color: 0x00D9FF, roughness: 0.3, metalness: 0.8, emissive: 0x00D9FF, emissiveIntensity: 0.3 });
    for (let i=0;i<3;i++) {
      const w = new THREE.Mesh(weaponGeo, weaponMat);
      w.position.set((i-1)*4, 1.5 + Math.random(), -5 - Math.random()*3);
      w.rotation.y = -0.3;
      w.userData = { rotSpeed: 0.002, floatSpeed: 0.5, floatOffset: i };
      this.objects.push(w);
      this.scene.add(w);
    }

    // Particles
    const particlesGeo = new THREE.BufferGeometry();
    const count = 300;
    const pos = new Float32Array(count*3);
    for (let i=0;i<count*3;i++) pos[i] = (Math.random()-0.5)*30;
    particlesGeo.setAttribute('position', new THREE.BufferAttribute(pos,3));
    const particlesMat = new THREE.PointsMaterial({ color: 0x00D9FF, size: 0.03, transparent: true, opacity: 0.6 });
    const particles = new THREE.Points(particlesGeo, particlesMat);
    this.scene.add(particles);
    this.objects.push(particles);
  }

  bindEvents() {
    window.addEventListener('resize', () => {
      this.camera.aspect = window.innerWidth/window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    });
    window.addEventListener('mousemove', (e) => {
      this.mouse.x = (e.clientX / window.innerWidth)*2 -1;
      this.mouse.y = -(e.clientY / window.innerHeight)*2 +1;
    });
  }

  animate = () => {
    this.animationId = requestAnimationFrame(this.animate);
    const t = Date.now()*0.001;

    // Camera subtle movement
    this.camera.position.x = Math.sin(t*0.1)*0.5 + this.mouse.x*0.5;
    this.camera.position.y = 2 + Math.sin(t*0.15)*0.2 + this.mouse.y*0.3;
    this.camera.lookAt(0,0,-2);

    this.objects.forEach((obj, i) => {
      if (obj instanceof THREE.Mesh) {
        const ud = obj.userData;
        if (ud.rotSpeed) {
          obj.rotation.y += ud.rotSpeed;
          obj.rotation.x += ud.rotSpeed*0.5;
        }
        if (ud.floatSpeed) {
          obj.position.y += Math.sin(t*ud.floatSpeed + ud.floatOffset)*0.002;
        }
      } else if (obj instanceof THREE.Points) {
        obj.rotation.y = t*0.05;
      }
    });

    this.renderer.render(this.scene, this.camera);
  };

  dispose() {
    cancelAnimationFrame(this.animationId);
    this.renderer.dispose();
  }
}
