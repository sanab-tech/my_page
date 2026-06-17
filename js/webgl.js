(function () {
  'use strict';

  const canvas = document.getElementById('heroCanvas');
  if (!canvas || typeof THREE === 'undefined') return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 100);
  camera.position.z = 3.2;

  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const geometry = new THREE.IcosahedronGeometry(1.1, 64);

  const material = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uColorA: { value: new THREE.Color('#22d3ee') },
      uColorB: { value: new THREE.Color('#8b5cf6') },
      uColorC: { value: new THREE.Color('#ec4899') },
    },
    vertexShader: `
      uniform float uTime;
      uniform vec2 uMouse;
      varying vec3 vNormal;
      varying vec3 vPosition;
      varying float vDistort;

      void main() {
        vNormal = normal;
        vec3 pos = position;

        float wave = sin(pos.x * 3.0 + uTime * 1.2) * 0.08
                   + sin(pos.y * 4.0 + uTime * 0.9) * 0.08
                   + sin(pos.z * 2.5 + uTime * 1.5) * 0.06;

        float mouseInfluence = uMouse.x * 0.15 + uMouse.y * 0.1;
        wave += mouseInfluence;

        pos += normal * wave;
        vDistort = wave;
        vPosition = pos;

        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 uColorA;
      uniform vec3 uColorB;
      uniform vec3 uColorC;
      varying vec3 vNormal;
      varying vec3 vPosition;
      varying float vDistort;

      void main() {
        vec3 light = normalize(vec3(0.5, 0.8, 1.0));
        float diff = max(dot(vNormal, light), 0.0);

        float mixVal = (vPosition.y + 1.0) * 0.5;
        vec3 color = mix(uColorA, uColorB, mixVal);
        color = mix(color, uColorC, vDistort * 3.0 + 0.3);

        float glow = pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), 2.0);
        color += glow * 0.3 * uColorA;

        gl_FragColor = vec4(color * (0.6 + diff * 0.5), 0.85);
      }
    `,
    transparent: true,
    wireframe: false,
  });

  const sphere = new THREE.Mesh(geometry, material);
  scene.add(sphere);

  const glowGeometry = new THREE.IcosahedronGeometry(1.35, 32);
  const glowMaterial = new THREE.MeshBasicMaterial({
    color: 0x22d3ee,
    transparent: true,
    opacity: 0.06,
    wireframe: true,
  });
  const glowSphere = new THREE.Mesh(glowGeometry, glowMaterial);
  scene.add(glowSphere);

  const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

  function onMouseMove(e) {
    mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
  }

  function onResize() {
    const parent = canvas.parentElement;
    const w = parent.clientWidth;
    const h = parent.clientHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h, false);
  }

  window.addEventListener('mousemove', onMouseMove);
  window.addEventListener('resize', onResize);
  onResize();

  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);

    const elapsed = clock.getElapsedTime();
    material.uniforms.uTime.value = elapsed;

    mouse.x += (mouse.targetX - mouse.x) * 0.05;
    mouse.y += (mouse.targetY - mouse.y) * 0.05;
    material.uniforms.uMouse.value.set(mouse.x, mouse.y);

    sphere.rotation.y = elapsed * 0.15 + mouse.x * 0.3;
    sphere.rotation.x = elapsed * 0.08 + mouse.y * 0.2;

    glowSphere.rotation.y = -elapsed * 0.1;
    glowSphere.rotation.x = elapsed * 0.05;

    renderer.render(scene, camera);
  }

  animate();
})();
