// Scene script for Module 3 — "Playgrounds, Not Factories" (Anti-Child Labour).
// Kept entirely symbolic for an 8-12 audience: a low-poly figure walks away
// from a grey factory toward a bright school/playground. No depiction of
// actual labour or distress — just a simple, hopeful visual story.
//
// A scene script only exports { duration, captions, init, animate } —
// ModuleAnimation.jsx handles the camera, renderer and render loop.

const DURATION = 50; // seconds, under 1 minute

const captions = [
  { start: 0, end: 5, text: "This is Maya. Today she should be going to school." },
  { start: 5, end: 13, text: "Every child has the right to learn, play and grow — not work." },
  { start: 13, end: 29, text: "Let's help Maya find her way to school!" },
  { start: 29, end: 42, text: "Yay! Maya made it. Now she can play, learn, and make friends." },
  { start: 42, end: 50, text: "Playgrounds, not factories — that's every child's right." },
];

function createFigure(THREE, color) {
  const group = new THREE.Group();
  const bodyMat = new THREE.MeshStandardMaterial({ color });
  const skinMat = new THREE.MeshStandardMaterial({ color: 0xffd9a8 });

  const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.35, 0.6, 4, 8), bodyMat);
  body.position.y = 0.75;

  const head = new THREE.Mesh(new THREE.SphereGeometry(0.3, 16, 16), skinMat);
  head.position.y = 1.5;

  group.add(body, head);
  return group;
}

function init(THREE, { scene }) {
  scene.background = new THREE.Color(0xdfeee7);
  scene.fog = new THREE.Fog(0xdfeee7, 10, 24);

  // Ground
  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(40, 20),
    new THREE.MeshStandardMaterial({ color: 0x9a9a9a })
  );
  ground.rotation.x = -Math.PI / 2;
  scene.add(ground);

  // Factory (left) — plain grey shapes only, nothing depicting people inside
  const factory = new THREE.Group();
  const factoryBody = new THREE.Mesh(
    new THREE.BoxGeometry(3, 2.2, 2.5),
    new THREE.MeshStandardMaterial({ color: 0x5b6670 })
  );
  factoryBody.position.y = 1.1;
  const chimney = new THREE.Mesh(
    new THREE.CylinderGeometry(0.25, 0.3, 2, 8),
    new THREE.MeshStandardMaterial({ color: 0x45505a })
  );
  chimney.position.set(1, 3, 0);
  factory.add(factoryBody, chimney);
  factory.position.set(-7, 0, -1);
  scene.add(factory);

  // Drifting smoke puffs
  const smokePuffs = [];
  for (let i = 0; i < 4; i += 1) {
    const puff = new THREE.Mesh(
      new THREE.SphereGeometry(0.3, 8, 8),
      new THREE.MeshStandardMaterial({ color: 0xaaaaaa, transparent: true, opacity: 0.5 })
    );
    puff.position.set(-6, 4 + i * 0.5, -1);
    scene.add(puff);
    smokePuffs.push(puff);
  }

  // School / playground (right), starts invisible and pops in once reached
  const school = new THREE.Group();
  const schoolBody = new THREE.Mesh(
    new THREE.BoxGeometry(3, 2, 2.5),
    new THREE.MeshStandardMaterial({ color: 0xffb703 })
  );
  schoolBody.position.y = 1;
  const roof = new THREE.Mesh(
    new THREE.ConeGeometry(2.3, 1.2, 4),
    new THREE.MeshStandardMaterial({ color: 0xe85d04 })
  );
  roof.rotation.y = Math.PI / 4;
  roof.position.y = 2.6;
  school.add(schoolBody, roof);
  school.position.set(7, 0, -1);
  school.scale.setScalar(0.001);
  scene.add(school);

  const slide = new THREE.Mesh(
    new THREE.BoxGeometry(0.3, 1.6, 1.2),
    new THREE.MeshStandardMaterial({ color: 0x219ebc })
  );
  slide.position.set(9.3, 0.1, 0.5);
  slide.rotation.z = Math.PI / 5;
  slide.scale.setScalar(0.001);
  scene.add(slide);

  // Sun
  const sun = new THREE.Mesh(
    new THREE.SphereGeometry(0.8, 16, 16),
    new THREE.MeshStandardMaterial({
      color: 0xffd166,
      emissive: 0xffbf00,
      emissiveIntensity: 0.6,
    })
  );
  sun.position.set(5, 8, -6);
  scene.add(sun);

  // Book icon that appears above Maya to represent the right to learn
  const book = new THREE.Mesh(
    new THREE.BoxGeometry(0.6, 0.1, 0.45),
    new THREE.MeshStandardMaterial({
      color: 0xffd60a,
      emissive: 0xffaa00,
      emissiveIntensity: 0.3,
    })
  );
  book.position.set(-7, 2.4, 0);
  book.visible = false;
  scene.add(book);

  // Maya
  const figure = createFigure(THREE, 0xef476f);
  figure.position.set(-6, 0, 1);
  scene.add(figure);

  return { ground, school, slide, book, figure, smokePuffs };
}

function animate(THREE, { elapsed, refs }) {
  const { ground, school, slide, book, figure, smokePuffs } = refs;

  // Smoke drifts and loops before the walk begins, then fades away
  smokePuffs.forEach((puff, i) => {
    if (elapsed < 13) {
      puff.position.y = 4 + i * 0.5 + (elapsed % 3) * 0.3;
      puff.material.opacity = 0.5 * (1 - (elapsed % 3) / 3);
    } else {
      puff.material.opacity = Math.max(0, puff.material.opacity - 0.01);
    }
  });

  // Book floats above Maya between 5s and 14s
  if (elapsed >= 5 && elapsed <= 14) {
    book.visible = true;
    book.position.y = 2.4 + Math.sin(elapsed * 2) * 0.1;
    book.rotation.y += 0.02;
  } else {
    book.visible = false;
  }

  // Maya walks from the factory toward the school between 13s and 29s
  if (elapsed >= 13 && elapsed <= 29) {
    const t = (elapsed - 13) / (29 - 13);
    figure.position.x = THREE.MathUtils.lerp(-6, 6, t);
    figure.position.y = Math.abs(Math.sin(elapsed * 6)) * 0.08;
    figure.rotation.y = Math.PI / 2;

    // Ground brightens from grey to green along the way
    const from = new THREE.Color(0x9a9a9a);
    const to = new THREE.Color(0x8fd694);
    ground.material.color.copy(from).lerp(to, t);
  }

  // School and slide pop in once Maya arrives
  if (elapsed >= 28) {
    const t = Math.min(1, (elapsed - 28) / 1.5);
    const scale = THREE.MathUtils.lerp(0.001, 1, t);
    school.scale.setScalar(scale);
    slide.scale.setScalar(scale);
  }

  // Gentle idle bounce once Maya has arrived and is playing
  if (elapsed > 29) {
    figure.position.y = Math.abs(Math.sin(elapsed * 4)) * 0.15;
  }
}

const ChildLabourScene = { duration: DURATION, captions, init, animate };
export default ChildLabourScene;