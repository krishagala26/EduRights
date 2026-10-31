// Scene script for Module 4 — "The Digital Shield" (Online Safety, Privacy
// & Cyber-Awareness). A friendly avatar is protected by a glowing shield
// that blocks incoming "warning" icons, then a lock seals a glowing data
// orb to represent keeping personal information private.

const DURATION = 46; // seconds, under 1 minute

const captions = [
  { start: 0, end: 6, text: "Meet Zee! Zee loves playing games and chatting online." },
  { start: 6, end: 16, text: "But sometimes strangers send mean or tricky messages." },
  { start: 16, end: 28, text: "Zee's digital shield blocks them. Don't reply — just block and tell a trusted adult!" },
  { start: 28, end: 38, text: "Keep your personal information locked safe, like your address or password." },
  { start: 38, end: 46, text: "Stay safe, stay smart, and enjoy the internet the right way!" },
];

function createAvatar(THREE) {
  const group = new THREE.Group();
  const bodyMat = new THREE.MeshStandardMaterial({ color: 0x4cc9f0 });
  const faceMat = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const eyeMat = new THREE.MeshStandardMaterial({ color: 0x1b1b1b });

  const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.5, 0.7, 4, 12), bodyMat);
  body.position.y = 0.9;

  const face = new THREE.Mesh(new THREE.SphereGeometry(0.42, 16, 16), faceMat);
  face.position.set(0, 1.65, 0.1);

  const eyeL = new THREE.Mesh(new THREE.SphereGeometry(0.05, 8, 8), eyeMat);
  eyeL.position.set(-0.14, 1.68, 0.45);
  const eyeR = eyeL.clone();
  eyeR.position.x = 0.14;

  group.add(body, face, eyeL, eyeR);
  return group;
}

function createWarningIcon(THREE) {
  const mat = new THREE.MeshStandardMaterial({
    color: 0xe5484d,
    emissive: 0x7a1317,
    emissiveIntensity: 0.4,
    transparent: true,
    opacity: 1,
  });
  return new THREE.Mesh(new THREE.OctahedronGeometry(0.28, 0), mat);
}

// Each icon spawns far out, travels inward to the shield ("hit"), then gets
// deflected back outward and fades away ("away"). Angles are spread around
// the avatar so icons arrive from different directions.
const ICONS_CONFIG = [
  { angleDeg: 20, spawn: 6, hit: 10.5, away: 13.5 },
  { angleDeg: 80, spawn: 7.5, hit: 12, away: 15 },
  { angleDeg: 140, spawn: 9, hit: 13.5, away: 16.5 },
  { angleDeg: 200, spawn: 11, hit: 15.5, away: 18.5 },
  { angleDeg: 260, spawn: 13, hit: 17.5, away: 20.5 },
  { angleDeg: 320, spawn: 15, hit: 19.5, away: 22.5 },
];

function init(THREE, { scene }) {
  scene.background = new THREE.Color(0x0b1d3a);
  scene.fog = new THREE.Fog(0x0b1d3a, 10, 22);

  const ground = new THREE.Mesh(
    new THREE.CircleGeometry(9, 32),
    new THREE.MeshStandardMaterial({ color: 0x13284d })
  );
  ground.rotation.x = -Math.PI / 2;
  scene.add(ground);

  const avatar = createAvatar(THREE);
  scene.add(avatar);

  // Glowing shield shell around the avatar
  const shield = new THREE.Mesh(
    new THREE.IcosahedronGeometry(1.5, 1),
    new THREE.MeshStandardMaterial({
      color: 0x4cc9f0,
      emissive: 0x2563eb,
      emissiveIntensity: 0.3,
      transparent: true,
      opacity: 0.2,
    })
  );
  shield.position.y = 1.1;
  scene.add(shield);

  const icons = ICONS_CONFIG.map((cfg) => {
    const mesh = createWarningIcon(THREE);
    mesh.visible = false;
    scene.add(mesh);
    return { ...cfg, mesh };
  });

  // Lock + data orb, appear later in the sequence
  const dataOrb = new THREE.Mesh(
    new THREE.SphereGeometry(0.4, 16, 16),
    new THREE.MeshStandardMaterial({
      color: 0x9d4edd,
      emissive: 0x7b2cbf,
      emissiveIntensity: 0.6,
      transparent: true,
      opacity: 0.9,
    })
  );
  dataOrb.position.set(3.2, 1.0, 0);
  dataOrb.visible = false;

  const lockBody = new THREE.Mesh(
    new THREE.BoxGeometry(0.7, 0.55, 0.3),
    new THREE.MeshStandardMaterial({ color: 0xffd60a })
  );
  lockBody.position.set(3.2, 1.0, 0);
  lockBody.visible = false;

  const lockShackle = new THREE.Mesh(
    new THREE.TorusGeometry(0.32, 0.08, 8, 24, Math.PI),
    new THREE.MeshStandardMaterial({ color: 0xe0a106 })
  );
  lockShackle.rotation.z = Math.PI;
  lockShackle.position.set(3.2, 2.0, 0);
  lockShackle.visible = false;

  scene.add(dataOrb, lockBody, lockShackle);

  return { avatar, shield, icons, dataOrb, lockBody, lockShackle };
}

function animate(THREE, { elapsed, refs }) {
  const { avatar, shield, icons, dataOrb, lockBody, lockShackle } = refs;

  // Avatar gentle idle motion
  avatar.position.y = Math.sin(elapsed * 1.5) * 0.08;
  avatar.rotation.y = Math.sin(elapsed * 0.4) * 0.3;

  // Shield rotates slowly, pulses brighter while actively deflecting
  shield.rotation.y += 0.004;
  shield.rotation.x += 0.002;
  const deflecting = elapsed >= 16 && elapsed <= 28;
  shield.material.opacity = deflecting ? 0.35 + Math.sin(elapsed * 6) * 0.1 : 0.2;

  // Warning icons fly in toward the shield, then get deflected back out
  icons.forEach(({ angleDeg, spawn, hit, away, mesh }) => {
    if (elapsed < spawn) {
      mesh.visible = false;
      return;
    }
    mesh.visible = true;
    const angle = (angleDeg * Math.PI) / 180;

    if (elapsed <= hit) {
      const t = (elapsed - spawn) / (hit - spawn);
      const radius = THREE.MathUtils.lerp(6, 1.6, t);
      mesh.position.set(Math.cos(angle) * radius, 1.1, Math.sin(angle) * radius);
      mesh.material.opacity = 1;
      mesh.rotation.x += 0.05;
      mesh.rotation.y += 0.05;
    } else if (elapsed <= away) {
      const t = (elapsed - hit) / (away - hit);
      const radius = THREE.MathUtils.lerp(1.6, 7, t);
      const deflectAngle = angle + Math.PI / 3;
      mesh.position.set(
        Math.cos(deflectAngle) * radius,
        1.1 + t * 1.5,
        Math.sin(deflectAngle) * radius
      );
      mesh.material.opacity = Math.max(0, 1 - t);
    } else {
      mesh.visible = false;
    }
  });

  // Lock sequence: a padlock closes over a glowing "data" orb
  if (elapsed >= 28) {
    dataOrb.visible = true;
    lockBody.visible = true;
    lockShackle.visible = true;

    dataOrb.rotation.y += 0.02;
    dataOrb.material.emissiveIntensity = 0.5 + Math.sin(elapsed * 3) * 0.2;

    const t = Math.min(1, (elapsed - 28) / 4);
    lockShackle.position.y = THREE.MathUtils.lerp(2.0, 1.35, t);
  } else {
    dataOrb.visible = false;
    lockBody.visible = false;
    lockShackle.visible = false;
  }
}

const InternetSafetyScene = { duration: DURATION, captions, init, animate };
export default InternetSafetyScene;