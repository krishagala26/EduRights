// Scene script for Module 5 — "Digital Complaint Boxes" (NCPCR Portals).
// Story: "A Message That Finds Help". Asha notices a worried friend, tells a
// trusted adult, and Ollie shows two DIFFERENT official channels
// (POCSO e-Box and e-Baal Nidan) using symbolic Three.js objects only.
// Labels are given by the captions; the left symbol is POCSO e-Box (shield +
// mailbox) and the right symbol is e-Baal Nidan (computer screen).

import {
  clamp01,
  ease,
  easeOut,
  win,
  setScale,
  mat,
  glowMat,
  createKid,
  createOwl,
  createStarGeometry,
  createHeartGeometry,
  createFloaters,
  animateFloaters,
} from './sceneKit.js';

const DURATION = 50; // seconds

const captions = [
  { start: 0, end: 7, text: 'Meet Asha! She notices a friend who looks worried and may not be safe.' },
  { start: 7, end: 15, text: 'Asha does not try to solve it alone. She tells a trusted adult, her teacher.' },
  { start: 15, end: 23, text: 'Ollie shows a friendly digital complaint box. It helps a message reach people whose job is to help children.' },
  { start: 23, end: 30, text: 'On the LEFT is the POCSO e-Box. It is for telling officials about sexual abuse of children.' },
  { start: 30, end: 37, text: 'On the RIGHT is e-Baal Nidan. It is NCPCR\u2019s online system for child-rights complaints. It is a different service!' },
  { start: 37, end: 44, text: 'A trusted adult helps Asha understand which official channel fits her concern.' },
  { start: 44, end: 50, text: 'Speaking up is brave. Asking for help is always okay. You never have to handle big problems alone.' },
];

function createMailbox(THREE) {
  const g = new THREE.Group();
  const post = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.14, 1.9, 10), mat(THREE, 0x7a5c3b));
  post.position.y = 0.95;
  const body = new THREE.Mesh(new THREE.BoxGeometry(1.8, 1.2, 1.0), mat(THREE, 0xf1f3ff));
  body.position.y = 2.5;
  const lid = new THREE.Mesh(new THREE.BoxGeometry(1.9, 0.14, 1.1), mat(THREE, 0x4361ee));
  lid.position.y = 3.17;
  const slot = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.09, 0.06), mat(THREE, 0x24204a));
  slot.position.set(0, 2.78, 0.51);
  const flagPole = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.8, 0.08), mat(THREE, 0x24204a));
  flagPole.position.set(1.0, 2.7, 0);
  const flag = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.26, 0.06), glowMat(THREE, 0xff4d6d, 0.4));
  flag.position.set(1.2, 3.0, 0);
  g.add(post, body, lid, slot, flagPole, flag);
  return g;
}

function createEnvelope(THREE) {
  const g = new THREE.Group();
  const paper = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.8, 0.1), mat(THREE, 0xfff8e7));
  const tri = new THREE.Shape();
  tri.moveTo(-0.6, 0.4);
  tri.lineTo(0.6, 0.4);
  tri.lineTo(0, -0.05);
  tri.closePath();
  const flapGeo = new THREE.ExtrudeGeometry(tri, { depth: 0.04, bevelEnabled: false });
  const flap = new THREE.Mesh(flapGeo, glowMat(THREE, 0xff9ecd, 0.35));
  flap.position.z = 0.05;
  g.add(paper, flap);
  return g;
}

function createComputer(THREE) {
  const g = new THREE.Group();
  const stand = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 1.8, 10), mat(THREE, 0x3b4a6b));
  stand.position.y = 0.9;
  const base = new THREE.Mesh(new THREE.CylinderGeometry(0.75, 0.8, 0.12, 20), mat(THREE, 0x3b4a6b));
  base.position.y = 0.06;
  const frame = new THREE.Mesh(new THREE.BoxGeometry(2.9, 1.9, 0.18), mat(THREE, 0x1f2a44));
  frame.position.y = 2.75;
  const screenMat = glowMat(THREE, 0x3da5ff, 0.5);
  const screen = new THREE.Mesh(new THREE.PlaneGeometry(2.6, 1.6), screenMat);
  screen.position.set(0, 2.75, 0.1);
  g.add(stand, base, frame, screen);

  // Little "checklist" rows on the screen
  [0.4, 0.05, -0.3].forEach((y) => {
    const dot = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.2, 0.04), mat(THREE, 0xffffff));
    dot.position.set(-0.85, 2.75 + y, 0.13);
    const line = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.14, 0.04), mat(THREE, 0xffffff));
    line.position.set(0.1, 2.75 + y, 0.13);
    g.add(dot, line);
  });
  return { group: g, screenMat };
}

function createMagnifier(THREE) {
  const g = new THREE.Group();
  const ring = new THREE.Mesh(new THREE.TorusGeometry(0.5, 0.08, 10, 28), glowMat(THREE, 0xffd166, 0.5));
  const lens = new THREE.Mesh(
    new THREE.CircleGeometry(0.46, 24),
    new THREE.MeshStandardMaterial({ color: 0xbfe9ff, transparent: true, opacity: 0.35 })
  );
  const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.7, 8), mat(THREE, 0xffd166));
  handle.position.set(0.5, -0.55, 0);
  handle.rotation.z = 0.8;
  g.add(ring, lens, handle);
  return g;
}

function init(THREE, { scene }) {
  scene.background = new THREE.Color(0x24184f);
  scene.fog = new THREE.Fog(0x24184f, 18, 36);

  const ground = new THREE.Mesh(
    new THREE.CircleGeometry(14, 40),
    mat(THREE, 0x3b2a7a)
  );
  ground.rotation.x = -Math.PI / 2;
  scene.add(ground);

  const glow = new THREE.PointLight(0xffd6ff, 0.7, 40);
  glow.position.set(0, 7, 6);
  scene.add(glow);

  const floaters = createFloaters(THREE, scene, 14);

  // People
  const asha = createKid(THREE, { shirt: 0xff6b9d, scale: 0.8 });
  asha.position.set(-3.5, 0, 1.5);
  const friend = createKid(THREE, { shirt: 0x4cc9f0, hair: 0x5a3a1a, scale: 0.72 });
  friend.position.set(4.5, 0, 1);
  const teacher = createKid(THREE, {
    shirt: 0x2ec4b6,
    pants: 0x2b2d42,
    hair: 0x777777,
    skin: 0xc68642,
    scale: 1.0,
  });
  teacher.position.set(7, 0, 1.5);
  const ollie = createOwl(THREE);
  scene.add(asha, friend, teacher, ollie);

  // Worry cloud over the friend
  const cloud = new THREE.Group();
  const cloudMat = mat(THREE, 0x9aa0b5, { emissive: 0x3a3f55, emissiveIntensity: 0.3 });
  [
    [-0.4, 0, 0.35],
    [0.05, 0.15, 0.48],
    [0.5, -0.02, 0.32],
  ].forEach(([x, y, r]) => {
    const puff = new THREE.Mesh(new THREE.SphereGeometry(r, 14, 14), cloudMat);
    puff.position.set(x, y, 0);
    cloud.add(puff);
  });
  scene.add(cloud);

  // "!" noticing symbol
  const exclaim = new THREE.Group();
  const exMat = glowMat(THREE, 0xffd166, 0.7);
  const exBar = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.08, 0.5, 10), exMat);
  exBar.position.y = 0.3;
  const exDot = new THREE.Mesh(new THREE.SphereGeometry(0.11, 10, 10), exMat);
  exDot.position.y = -0.08;
  exclaim.add(exBar, exDot);
  scene.add(exclaim);

  // Speech bubble with a small heart (asking for help with care)
  const bubble = new THREE.Group();
  const bubbleBody = new THREE.Mesh(new THREE.SphereGeometry(0.7, 20, 20), mat(THREE, 0xffffff));
  bubbleBody.scale.set(1.3, 0.9, 0.5);
  const bubbleTail = new THREE.Mesh(new THREE.SphereGeometry(0.12, 10, 10), mat(THREE, 0xffffff));
  bubbleTail.position.set(-0.3, -0.75, 0);
  const smallHeart = new THREE.Mesh(createHeartGeometry(THREE, 0.1), glowMat(THREE, 0xff4d6d, 0.5));
  smallHeart.scale.setScalar(0.6);
  smallHeart.position.z = 0.2;
  bubble.add(bubbleBody, bubbleTail, smallHeart);
  scene.add(bubble);

  // Symbol 1: POCSO e-Box = shield + mailbox (left)
  const boxSym = new THREE.Group();
  const mailbox = createMailbox(THREE);
  const shieldShape = new THREE.Shape();
  shieldShape.moveTo(0, 1.2);
  shieldShape.lineTo(1, 0.9);
  shieldShape.lineTo(1, 0);
  shieldShape.quadraticCurveTo(1, -0.9, 0, -1.3);
  shieldShape.quadraticCurveTo(-1, -0.9, -1, 0);
  shieldShape.lineTo(-1, 0.9);
  shieldShape.closePath();
  const shieldGeo = new THREE.ExtrudeGeometry(shieldShape, { depth: 0.25, bevelEnabled: false });
  shieldGeo.translate(0, 0, -0.125);
  const shieldMat = glowMat(THREE, 0xff6b9d, 0.3);
  const shield = new THREE.Mesh(shieldGeo, shieldMat);
  shield.position.set(0, 2.5, -0.8);
  const ring = new THREE.Mesh(new THREE.TorusGeometry(1.7, 0.05, 8, 40), glowMat(THREE, 0xffd1e3, 0.6));
  ring.position.set(0, 2.5, 0);
  boxSym.add(mailbox, shield, ring);
  scene.add(boxSym);

  const envelope = createEnvelope(THREE);
  scene.add(envelope);

  // Symbol 2: e-Baal Nidan = computer screen (right)
  const { group: computer, screenMat } = createComputer(THREE);
  computer.position.x = 4.2;
  scene.add(computer);

  const magnifier = createMagnifier(THREE);
  scene.add(magnifier);

  // Final: glowing help heart + orbiting stars
  const helpHeart = new THREE.Group();
  const heartMat = glowMat(THREE, 0xff4d6d, 0.8);
  const heart = new THREE.Mesh(createHeartGeometry(THREE, 0.35), heartMat);
  heart.scale.setScalar(2.0);
  const halo = new THREE.Mesh(new THREE.TorusGeometry(1.7, 0.05, 8, 40), glowMat(THREE, 0xffd166, 0.7));
  helpHeart.add(heart, halo);
  scene.add(helpHeart);

  const starGeo = createStarGeometry(THREE, 0.35, 0.15, 0.12);
  const stars = Array.from({ length: 10 }, (_, i) => {
    const mesh = new THREE.Mesh(starGeo, glowMat(THREE, i % 2 ? 0xffd166 : 0xffa8d6, 0.7));
    scene.add(mesh);
    return mesh;
  });

  return {
    floaters, asha, friend, teacher, ollie, cloud, exclaim, bubble,
    boxSym, shield, shieldMat, ring, envelope, computer, screenMat,
    magnifier, helpHeart, halo, stars,
  };
}

function animate(THREE, { elapsed: e, refs }) {
  const r = refs;
  const L = THREE.MathUtils.lerp;

  animateFloaters(r.floaters, e);

  const u1 = ease(clamp01((e - 7) / 2.5)); // Asha meets teacher
  const u2 = ease(clamp01((e - 43.5) / 1.5)); // final huddle

  // ---- People -------------------------------------------------------------
  // Friend: worried, then walks away to the right
  setScale(r.friend, win(e, 0, 10.5, 0.6, 0.6));
  r.friend.position.x = 4.5 + ease(clamp01((e - 7) / 3)) * 7;
  r.friend.rotation.y = -0.6;
  r.friend.rotation.z = Math.sin(e * 1.5) * 0.03;

  setScale(r.cloud, win(e, 0.5, 7, 0.8, 0.8) * (1 + Math.sin(e * 2) * 0.06));
  r.cloud.position.set(4.5, 3.4 + Math.sin(e * 1.4) * 0.1, 1);

  // Asha
  setScale(r.asha, win(e, 0, 999, 0.6, 0.6));
  r.asha.position.x = -3.5 + 2.1 * u1 - 1.2 * u2;
  r.asha.position.y = Math.abs(Math.sin(e * 2)) * 0.04;
  r.asha.rotation.y = 1.0 - 0.55 * u1;
  r.asha.userData.armR.rotation.z = e > 44.5 ? 2.5 + Math.sin(e * 6) * 0.3 : -0.12;

  // Teacher
  setScale(r.teacher, win(e, 7, 999, 0.8, 0.8));
  r.teacher.position.x = 7 - 5.6 * u1 + 1.2 * u2;
  r.teacher.rotation.y = -0.5;
  const pointing = e >= 36.5 && e < 44;
  r.teacher.userData.armL.rotation.z = pointing ? -(1.3 + Math.sin(e * 3) * 0.2) : 0.12;
  r.teacher.userData.armR.rotation.z = e > 44.5 ? 2.5 + Math.sin(e * 6 + 1) * 0.3 : -0.12;

  // "!" above Asha while she notices
  setScale(r.exclaim, win(e, 1, 7, 0.6, 0.6) * (1 + Math.sin(e * 5) * 0.08));
  r.exclaim.position.set(r.asha.position.x, 3.1 + Math.sin(e * 3) * 0.08, 1.5);

  // Speech bubble when she talks to the teacher
  setScale(r.bubble, win(e, 9.5, 15, 0.7, 0.7));
  r.bubble.position.set(r.asha.position.x + 0.6, 3.5 + Math.sin(e * 2) * 0.08, 1.5);

  // ---- Ollie -------------------------------------------------------------
  const oS = win(e, 15, 999, 0.9, 0.9);
  const move = ease(clamp01((e - 23) / 2));
  const huddle = u2;
  const ox = L(L(3.8, 0, move), 0, huddle);
  const oy = L(L(3.6, 4.2, move), 0.1, huddle);
  const oz = L(L(1, 0.5, move), 3.5, huddle);
  const oBase = L(L(0.8, 0.65, move), 0.85, huddle);
  setScale(r.ollie, oS, oBase);
  r.ollie.position.set(ox, oy + Math.sin(e * 2) * 0.12 * (1 - huddle), oz);
  r.ollie.userData.wingL.rotation.z = 0.25 + Math.sin(e * 5) * 0.2;
  r.ollie.userData.wingR.rotation.z = -0.25 - Math.sin(e * 5) * 0.2;

  // ---- Digital complaint box (scene 3) -----------------------------------
  const hlL = e >= 23.5 && e < 30 ? 0.5 + 0.5 * Math.sin((e - 23.5) * 5) : 0;
  const hlR = e >= 30 && e < 37 ? 0.5 + 0.5 * Math.sin((e - 30) * 5) : 0;

  r.boxSym.position.x = -4.2 * ease(clamp01((e - 22.5) / 2));
  setScale(r.boxSym, win(e, 15.5, 45, 0.9, 1.0) * (1 + 0.08 * hlL));
  setScale(r.shield, win(e, 23.2, 45, 0.9, 1.0), 1.3);
  r.shieldMat.emissiveIntensity = 0.3 + hlL * 0.8;
  r.ring.rotation.z += 0.01;
  r.ring.scale.setScalar(1 + Math.sin(e * 2) * 0.04);

  // Envelope floats from Ollie into the mailbox slot
  if (e >= 16.5 && e < 22.2) {
    const u = clamp01((e - 16.5) / 4.5);
    const eu = ease(u);
    r.envelope.visible = true;
    r.envelope.position.set(
      L(3.8, 0, eu),
      L(3.6, 2.9, eu) + Math.sin(Math.PI * u) * 1.0,
      L(1, 0.8, u)
    );
    r.envelope.rotation.z = Math.sin(e * 3) * 0.15;
    r.envelope.scale.setScalar(1 - 0.7 * ease(clamp01((u - 0.7) / 0.3)));
  } else {
    r.envelope.visible = false;
  }

  // ---- Symbol 2: e-Baal Nidan computer -----------------------------------
  setScale(r.computer, win(e, 29.3, 45, 0.9, 1.0) * (1 + 0.08 * hlR));
  r.screenMat.emissiveIntensity = 0.5 + hlR * 0.7;

  // ---- Magnifier: adult helps identify the channel ------------------------
  setScale(r.magnifier, win(e, 36.5, 45, 0.7, 0.8));
  const settle = ease(clamp01((e - 40.5) / 1.5));
  r.magnifier.position.set(
    4.2 * Math.sin((e - 36.5) * 1.3) * (1 - settle),
    4.6 + Math.sin(e * 3) * 0.15,
    1
  );
  r.magnifier.rotation.z = Math.sin(e * 2) * 0.15;

  // ---- Final message -----------------------------------------------------
  const finalS = win(e, 44, 999, 1.0, 1.0);
  setScale(r.helpHeart, finalS * (1 + Math.sin(e * 3) * 0.06));
  r.helpHeart.position.set(0, 4.0, 0.5);
  r.helpHeart.rotation.y = Math.sin(e * 0.8) * 0.4;
  r.halo.rotation.z += 0.01;

  r.stars.forEach((star, i) => {
    const a = e * 0.8 + (i * Math.PI * 2) / r.stars.length;
    setScale(star, win(e, 44.5 + i * 0.1, 999, 0.6, 0.6));
    star.position.set(Math.cos(a) * 5.5, 3.8 + Math.sin(a) * 1.9, -1);
    star.rotation.y += 0.03;
  });
}

const ComplaintPortalsScene = { duration: DURATION, captions, init, animate };
export default ComplaintPortalsScene;
