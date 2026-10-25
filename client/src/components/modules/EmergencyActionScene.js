// Scene script for Module 6 — "The Magic Number" (Emergency Action).
// Story: "Ollie and the Magic Number 112". Riya sees a small cartoon fire,
// moves to safety, tells a trusted adult, and Ollie shows a glowing 112 phone.
// Everything is a simulated, symbolic animation: no real call, no location
// permission, no network.

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
  createFloaters,
  animateFloaters,
} from './sceneKit.js';

const DURATION = 50; // seconds

const captions = [
  { start: 0, end: 8, text: 'Meet Riya! She sees a small fire. This is an emergency!' },
  { start: 8, end: 16, text: 'Riya moves far away to a safe place and tells a trusted adult. She never tries to fight the fire herself.' },
  { start: 16, end: 24, text: 'Ollie shows the Magic Number: 112! It is India\u2019s emergency number, ready day and night.' },
  { start: 24, end: 32, text: 'The adult calls 112 and says where they are and what happened. Speak slowly and clearly.' },
  { start: 32, end: 40, text: 'Helpers such as fire fighters, an ambulance or the police can come, depending on the emergency.' },
  { start: 40, end: 45, text: '112 is only for real emergencies. Never call it for jokes or practice!' },
  { start: 45, end: 50, text: 'In an emergency, get to safety and call 112 or ask a trusted adult to call.' },
];

// ---- Builders ------------------------------------------------------------

function createDigit(THREE, digit, material) {
  const g = new THREE.Group();
  const H = new THREE.BoxGeometry(0.7, 0.14, 0.1);
  const V = new THREE.BoxGeometry(0.14, 0.7, 0.1);
  const seg = {
    top: [H, 0, 0.75],
    mid: [H, 0, 0],
    bot: [H, 0, -0.75],
    ul: [V, -0.4, 0.375],
    ur: [V, 0.4, 0.375],
    ll: [V, -0.4, -0.375],
    lr: [V, 0.4, -0.375],
  };
  const on = digit === 1 ? ['ur', 'lr'] : ['top', 'ur', 'mid', 'll', 'bot'];
  on.forEach((k) => {
    const [geo, x, y] = seg[k];
    const m = new THREE.Mesh(geo, material);
    m.position.set(x, y, 0);
    g.add(m);
  });
  return g;
}

function createPhone(THREE) {
  const g = new THREE.Group();
  const body = new THREE.Mesh(new THREE.BoxGeometry(2.4, 4.2, 0.25), mat(THREE, 0x14182b));
  const screen = new THREE.Mesh(
    new THREE.PlaneGeometry(2.1, 3.7),
    glowMat(THREE, 0x0b3d5c, 0.5)
  );
  screen.position.z = 0.14;
  const digitMat = glowMat(THREE, 0xffc93c, 0.9);
  const digits = new THREE.Group();
  [-0.66, 0, 0.66].forEach((x, i) => {
    const d = createDigit(THREE, i < 2 ? 1 : 2, digitMat);
    d.position.x = x;
    digits.add(d);
  });
  digits.scale.setScalar(0.62);
  digits.position.set(0, 0.45, 0.2);
  const callBtn = new THREE.Mesh(new THREE.CircleGeometry(0.32, 24), glowMat(THREE, 0x39d98a, 0.7));
  callBtn.position.set(0, -1.35, 0.16);
  g.add(body, screen, digits, callBtn);
  return { group: g, digitMat, callBtn };
}

function createLight(THREE, color) {
  return new THREE.Mesh(new THREE.SphereGeometry(0.14, 10, 10), glowMat(THREE, color, 0.2));
}

function addWheels(THREE, g, xs, z) {
  const geo = new THREE.CylinderGeometry(0.36, 0.36, 0.28, 16);
  const m = mat(THREE, 0x1b1b1b);
  xs.forEach((x) =>
    [-1, 1].forEach((s) => {
      const w = new THREE.Mesh(geo, m);
      w.rotation.x = Math.PI / 2;
      w.position.set(x, 0.36, s * z);
      g.add(w);
    })
  );
}

// All vehicles face +x; the scene rotates them to face -x while driving in.
function createFireTruck(THREE) {
  const g = new THREE.Group();
  const body = new THREE.Mesh(new THREE.BoxGeometry(2.4, 1.1, 1.3), mat(THREE, 0xe5383b));
  body.position.set(-0.3, 0.95, 0);
  const cab = new THREE.Mesh(new THREE.BoxGeometry(1.0, 1.3, 1.3), mat(THREE, 0xc1121f));
  cab.position.set(1.6, 1.05, 0);
  const win1 = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.5, 1.0), mat(THREE, 0xbfe9ff));
  win1.position.set(2.12, 1.25, 0);
  g.add(body, cab, win1);
  [-0.25, 0.25].forEach((z) => {
    const rail = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.08, 0.08), mat(THREE, 0xffd166));
    rail.position.set(-0.3, 1.62, z);
    g.add(rail);
  });
  [-1.1, -0.6, -0.1, 0.4, 0.9].forEach((x) => {
    const rung = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.06, 0.58), mat(THREE, 0xffd166));
    rung.position.set(x, 1.62, 0);
    g.add(rung);
  });
  addWheels(THREE, g, [-0.9, 1.5], 0.62);
  const l1 = createLight(THREE, 0xff2d2d);
  l1.position.set(1.6, 1.8, -0.35);
  const l2 = createLight(THREE, 0x2d6bff);
  l2.position.set(1.6, 1.8, 0.35);
  g.add(l1, l2);
  g.userData.lights = [l1, l2];
  return g;
}

function createAmbulance(THREE) {
  const g = new THREE.Group();
  const body = new THREE.Mesh(new THREE.BoxGeometry(2.0, 1.5, 1.3), mat(THREE, 0xffffff));
  body.position.set(-0.35, 1.15, 0);
  const cab = new THREE.Mesh(new THREE.BoxGeometry(0.9, 1.1, 1.3), mat(THREE, 0xf1f3ff));
  cab.position.set(1.1, 0.95, 0);
  const win1 = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.45, 1.0), mat(THREE, 0xbfe9ff));
  win1.position.set(1.56, 1.1, 0);
  g.add(body, cab, win1);
  [-1, 1].forEach((s) => {
    const crossH = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.16, 0.04), mat(THREE, 0xe5383b));
    const crossV = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.6, 0.04), mat(THREE, 0xe5383b));
    crossH.position.set(-0.35, 1.3, s * 0.66);
    crossV.position.set(-0.35, 1.3, s * 0.66);
    g.add(crossH, crossV);
  });
  addWheels(THREE, g, [-0.9, 1.0], 0.62);
  const l1 = createLight(THREE, 0xff2d2d);
  l1.position.set(1.1, 1.6, -0.35);
  const l2 = createLight(THREE, 0x2d6bff);
  l2.position.set(1.1, 1.6, 0.35);
  g.add(l1, l2);
  g.userData.lights = [l1, l2];
  return g;
}

function createPoliceCar(THREE) {
  const g = new THREE.Group();
  const body = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.6, 1.1), mat(THREE, 0x2c6bed));
  body.position.set(0, 0.7, 0);
  const cabin = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.5, 1.0), mat(THREE, 0xf1f3ff));
  cabin.position.set(-0.1, 1.2, 0);
  g.add(body, cabin);
  addWheels(THREE, g, [-0.75, 0.75], 0.52);
  const l1 = createLight(THREE, 0xff2d2d);
  l1.position.set(-0.1, 1.55, -0.28);
  const l2 = createLight(THREE, 0x2d6bff);
  l2.position.set(-0.1, 1.55, 0.28);
  g.add(l1, l2);
  g.userData.lights = [l1, l2];
  return g;
}

function createExclaim(THREE) {
  const g = new THREE.Group();
  const m = glowMat(THREE, 0xff7b00, 0.8);
  const bar = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.08, 0.5, 10), m);
  bar.position.y = 0.3;
  const dot = new THREE.Mesh(new THREE.SphereGeometry(0.11, 10, 10), m);
  dot.position.y = -0.08;
  g.add(bar, dot);
  return g;
}

function createPin(THREE) {
  const g = new THREE.Group();
  const m = glowMat(THREE, 0xff4d5e, 0.6);
  const tip = new THREE.Mesh(new THREE.ConeGeometry(0.28, 0.7, 14), m);
  tip.rotation.x = Math.PI;
  tip.position.y = -0.2;
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.3, 14, 14), m);
  head.position.y = 0.2;
  const hole = new THREE.Mesh(new THREE.SphereGeometry(0.12, 10, 10), mat(THREE, 0xffffff));
  hole.position.set(0, 0.2, 0.22);
  g.add(tip, head, hole);
  return g;
}

function createWhatHappened(THREE) {
  const g = new THREE.Group();
  const bubble = new THREE.Mesh(new THREE.SphereGeometry(0.5, 16, 16), mat(THREE, 0xffffff));
  bubble.scale.set(1.2, 1, 0.5);
  const flame = new THREE.Mesh(new THREE.ConeGeometry(0.2, 0.5, 10), glowMat(THREE, 0xff7b00, 0.8));
  flame.position.z = 0.2;
  g.add(bubble, flame);
  return g;
}

// ---- Scene ---------------------------------------------------------------

function init(THREE, { scene }) {
  scene.background = new THREE.Color(0x1c2541);
  scene.fog = new THREE.Fog(0x1c2541, 18, 38);

  const ground = new THREE.Mesh(new THREE.CircleGeometry(15, 40), mat(THREE, 0x2f3a5f));
  ground.rotation.x = -Math.PI / 2;
  scene.add(ground);

  const lamp = new THREE.PointLight(0xffe0b3, 0.7, 40);
  lamp.position.set(0, 7, 6);
  scene.add(lamp);

  const floaters = createFloaters(THREE, scene, 12);

  // House + small cartoon fire in a bin (non-graphic)
  const house = new THREE.Group();
  const houseBody = new THREE.Mesh(new THREE.BoxGeometry(4, 2.6, 2.5), mat(THREE, 0xf4d6a0));
  houseBody.position.y = 1.3;
  const roof = new THREE.Mesh(new THREE.ConeGeometry(3.3, 1.5, 4), mat(THREE, 0xc4553a));
  roof.rotation.y = Math.PI / 4;
  roof.position.y = 3.35;
  const door = new THREE.Mesh(new THREE.BoxGeometry(0.8, 1.4, 0.06), mat(THREE, 0x7a5c3b));
  door.position.set(0, 0.7, 1.26);
  const windowGlow = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.8, 0.06), glowMat(THREE, 0xffd166, 0.5));
  windowGlow.position.set(1.2, 1.7, 1.26);
  house.add(houseBody, roof, door, windowGlow);
  house.position.set(5, 0, -1.5);
  scene.add(house);

  const fire = new THREE.Group();
  const bin = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.45, 0.8, 16), mat(THREE, 0x6b7280));
  bin.position.y = 0.4;
  fire.add(bin);
  const flames = [
    { r: 0.38, h: 1.1, c: 0xff7b00, x: 0 },
    { r: 0.28, h: 0.8, c: 0xffc300, x: 0.15 },
    { r: 0.22, h: 0.7, c: 0xff3d00, x: -0.2 },
  ].map((f) => {
    const m = new THREE.Mesh(new THREE.ConeGeometry(f.r, f.h, 12), glowMat(THREE, f.c, 0.8));
    m.position.set(f.x, 0.8 + f.h / 2, 0);
    fire.add(m);
    return m;
  });
  const smoke = Array.from({ length: 4 }, () => {
    const m = new THREE.Mesh(
      new THREE.SphereGeometry(0.25, 12, 12),
      new THREE.MeshStandardMaterial({ color: 0x9aa0b5, transparent: true, opacity: 0.5 })
    );
    fire.add(m);
    return m;
  });
  fire.position.set(1.8, 0, 0.5);
  scene.add(fire);

  // Safe zone marker
  const safe = new THREE.Group();
  const safeDisc = new THREE.Mesh(
    new THREE.CircleGeometry(1.5, 32),
    new THREE.MeshStandardMaterial({ color: 0x39d98a, transparent: true, opacity: 0.45 })
  );
  safeDisc.rotation.x = -Math.PI / 2;
  const safeRing = new THREE.Mesh(new THREE.TorusGeometry(1.5, 0.06, 8, 40), glowMat(THREE, 0x39d98a, 0.7));
  safeRing.rotation.x = -Math.PI / 2;
  safe.add(safeDisc, safeRing);
  safe.position.set(-5.5, 0.03, 1.5);
  scene.add(safe);

  // People
  const riya = createKid(THREE, { shirt: 0xff9f1c, hair: 0x1b1b1b, scale: 0.8 });
  riya.position.set(-0.5, 0, 1.5);
  const adult = createKid(THREE, {
    shirt: 0x3a86ff,
    pants: 0x2b2d42,
    hair: 0x444444,
    skin: 0xc68642,
    scale: 1.0,
  });
  adult.position.set(-9, 0, 1.5);
  const ollie = createOwl(THREE);
  scene.add(riya, adult, ollie);

  const exclaim = createExclaim(THREE);
  scene.add(exclaim);

  // Magic phone
  const { group: phone, digitMat, callBtn } = createPhone(THREE);
  scene.add(phone);

  const rings = Array.from({ length: 3 }, () => {
    const m = new THREE.Mesh(
      new THREE.TorusGeometry(1, 0.035, 8, 48),
      new THREE.MeshStandardMaterial({
        color: 0xffc93c,
        emissive: 0xffc93c,
        emissiveIntensity: 0.6,
        transparent: true,
        opacity: 0.6,
      })
    );
    scene.add(m);
    return m;
  });
  const halo = new THREE.Mesh(new THREE.TorusGeometry(2.9, 0.06, 8, 48), glowMat(THREE, 0xff7b00, 0.7));
  scene.add(halo);

  const pin = createPin(THREE);
  const what = createWhatHappened(THREE);
  scene.add(pin, what);

  // Helpers
  const police = createPoliceCar(THREE);
  const ambulance = createAmbulance(THREE);
  const truck = createFireTruck(THREE);
  [police, ambulance, truck].forEach((v) => {
    v.rotation.y = Math.PI;
    v.visible = false;
    scene.add(v);
  });
  const vehicles = [
    { g: police, target: 4.8, z: 2.2, start: 33.4, end: 36.4, phase: 0 },
    { g: ambulance, target: 0, z: -0.2, start: 34.4, end: 37.4, phase: 1.5 },
    { g: truck, target: -5, z: -2.8, start: 35, end: 39.5, phase: 3 },
  ];

  const starGeo = createStarGeometry(THREE, 0.32, 0.14, 0.12);
  const stars = Array.from({ length: 8 }, (_, i) => {
    const mesh = new THREE.Mesh(starGeo, glowMat(THREE, i % 2 ? 0xffd166 : 0x9be7ff, 0.7));
    scene.add(mesh);
    return mesh;
  });

  return {
    floaters, house, fire, flames, smoke, safe, riya, adult, ollie, exclaim,
    phone, digitMat, callBtn, rings, halo, pin, what, vehicles, stars,
  };
}

function animate(THREE, { elapsed: e, refs }) {
  const r = refs;
  const L = THREE.MathUtils.lerp;

  animateFloaters(r.floaters, e);

  // ---- Scene 1-2: fire, house, safe zone ---------------------------------
  const sceneA = win(e, 0, 17.5, 0.6, 1.0);
  setScale(r.house, sceneA);
  setScale(r.fire, sceneA);
  r.flames.forEach((f, i) => {
    f.scale.y = 1 + 0.2 * Math.sin(e * 9 + i * 2);
    f.scale.x = 1 + 0.1 * Math.sin(e * 7 + i);
  });
  r.smoke.forEach((s, i) => {
    const t = (e * 0.35 + i / r.smoke.length) % 1;
    s.position.set(0.3 + t * 0.6, 1.6 + t * 2.4, 0);
    s.scale.setScalar(0.6 + t * 1.2);
    s.material.opacity = 0.5 * (1 - t);
  });
  setScale(r.safe, win(e, 9, 17.5, 0.8, 0.8) * (1 + Math.sin(e * 3) * 0.04));

  // ---- People ------------------------------------------------------------
  const run = easeOut(clamp01((e - 8.5) / 2.5));
  const front = ease(clamp01((e - 33) / 2));

  // Riya
  setScale(r.riya, win(e, 0, 999, 0.6, 0.6));
  r.riya.position.x = L(-0.5 - 5 * run, -1.8, front);
  r.riya.position.z = L(1.5, 4.5, front);
  const running = e >= 8.5 && run < 0.98;
  r.riya.position.y = running ? Math.abs(Math.sin(e * 10)) * 0.12 : 0;
  r.riya.rotation.y =
    e < 8.5 ? 1.0 : L(-1.2, 0.6, ease(clamp01((e - 10.8) / 0.6)));
  r.riya.userData.armR.rotation.z = e > 45.5 ? 2.5 + Math.sin(e * 6) * 0.3 : -0.12;

  // Adult
  const adultIn = ease(clamp01((e - 10) / 3));
  setScale(r.adult, win(e, 10, 999, 0.8, 0.8));
  r.adult.position.x = L(-9 + 5.6 * adultIn, 1.8, front);
  r.adult.position.z = L(1.5, 4.5, front);
  r.adult.rotation.y = -0.6;
  const calling = e >= 24.5 && e < 33;
  r.adult.userData.armR.rotation.z = calling
    ? 2.5
    : e > 45.5
    ? 2.5 + Math.sin(e * 6 + 1) * 0.3
    : -0.12;

  // "!" above Riya (noticing, then alerting)
  const exS = Math.max(win(e, 1, 8.5, 0.6, 0.6), win(e, 12, 16.5, 0.6, 0.6));
  setScale(r.exclaim, exS * (1 + Math.sin(e * 5) * 0.08));
  r.exclaim.position.set(r.riya.position.x, 3.1 + Math.sin(e * 3) * 0.08, 1.5);

  // ---- Ollie -------------------------------------------------------------
  setScale(r.ollie, win(e, 17, 999, 0.9, 0.9), 0.75);
  r.ollie.position.set(4.6, 3.3 + Math.sin(e * 2) * 0.12, 0.5);
  r.ollie.userData.wingL.rotation.z = 0.25 + Math.sin(e * 5) * 0.2;
  r.ollie.userData.wingR.rotation.z = -0.25 - Math.sin(e * 5) * 0.2;

  // ---- Magic phone -------------------------------------------------------
  const sA = win(e, 17, 33.5, 1.0, 0.8);
  const sB = win(e, 41.5, 999, 1.0, 1.0) * 0.6;
  const phoneS = Math.max(sA, sB);
  const bump = 1 + 0.05 * Math.sin(e * 4);
  setScale(r.phone, phoneS * bump);
  const phoneY = e < 37 ? 3.3 : 4.6;
  r.phone.position.set(0, phoneY + Math.sin(e * 1.5) * 0.1, 0);
  r.phone.rotation.y = Math.sin(e * 0.7) * 0.2;
  r.digitMat.emissiveIntensity = 0.7 + Math.sin(e * 4) * 0.3;
  r.callBtn.scale.setScalar(1 + 0.15 * Math.sin(e * 6));

  setScale(r.halo, phoneS);
  r.halo.position.set(0, phoneY, -0.4);
  r.halo.rotation.z += 0.01;

  // Sound-wave rings while the call is "made" (simulated)
  const waveS = win(e, 25, 33, 0.6, 0.6);
  r.rings.forEach((ring, i) => {
    const t = (e * 0.6 + i / r.rings.length) % 1;
    ring.visible = waveS > 0.01;
    ring.position.set(0, 3.3, 0.3);
    ring.scale.setScalar(1.6 + t * 3.2);
    ring.material.opacity = 0.6 * (1 - t) * waveS;
  });

  // Location pin, then "what happened" bubble fly from the adult to the phone
  const adultHead = { x: -3.4, y: 3.4, z: 1.5 };
  const pinU = clamp01((e - 25) / 2.5);
  setScale(r.pin, win(e, 25, 33.5, 0.4, 0.8));
  r.pin.position.set(
    L(adultHead.x, -2.3, easeOut(pinU)),
    L(adultHead.y, 4.7, easeOut(pinU)) + Math.sin(Math.PI * pinU) * 0.9,
    L(adultHead.z, 0.4, pinU)
  );
  r.pin.position.y += pinU >= 1 ? Math.sin(e * 3) * 0.08 : 0;
  r.pin.rotation.y += 0.04;

  const whatU = clamp01((e - 29) / 2.5);
  setScale(r.what, win(e, 29, 33.5, 0.4, 0.8));
  r.what.position.set(
    L(adultHead.x, 2.3, easeOut(whatU)),
    L(adultHead.y, 4.7, easeOut(whatU)) + Math.sin(Math.PI * whatU) * 1.2,
    L(adultHead.z, 0.4, whatU)
  );
  r.what.rotation.y = Math.sin(e * 2) * 0.3;

  // ---- Scene 5: helpers arrive ------------------------------------------
  r.vehicles.forEach(({ g, target, z, start, end, phase }) => {
    g.visible = e >= start - 0.2;
    const u = clamp01((e - start) / (end - start));
    g.position.x = target + (16 - target) * Math.pow(1 - u, 3);
    g.position.z = z;
    g.position.y = Math.sin(e * 14) * 0.02 * (u < 1 ? 1 : 0.3);
    g.userData.lights.forEach((light, i) => {
      const on = Math.sin(e * 12 + phase + i * Math.PI) > 0;
      light.material.emissiveIntensity = on ? 1 : 0.15;
    });
  });

  // ---- Final: stars around the small 112 phone ---------------------------
  r.stars.forEach((star, i) => {
    const a = e * 0.9 + (i * Math.PI * 2) / r.stars.length;
    setScale(star, win(e, 43 + i * 0.15, 999, 0.6, 0.6));
    star.position.set(Math.cos(a) * 3.0, 4.6 + Math.sin(a) * 1.5, -0.5);
    star.rotation.y += 0.03;
  });
}

const EmergencyActionScene = { duration: DURATION, captions, init, animate };
export default EmergencyActionScene;
