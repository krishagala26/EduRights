// Small helper kit shared by ComplaintPortalsScene.js and EmergencyActionScene.js
// (Modules 5 and 6). Pure Three.js helpers: no DOM, no React, no extra packages.
// Every helper receives the THREE namespace from ModuleAnimation, exactly like
// the existing scene scripts do.

export const clamp01 = (t) => Math.min(1, Math.max(0, t));
export const ease = (t) => t * t * (3 - 2 * t);
export const easeOut = (t) => 1 - Math.pow(1 - t, 3);

// 0 -> 1 fade/scale in after `start`, 1 -> 0 before `end`.
export function win(e, start, end, fadeIn = 0.8, fadeOut = 0.8) {
  const a = ease(clamp01((e - start) / fadeIn));
  const b = 1 - ease(clamp01((e - (end - fadeOut)) / fadeOut));
  return Math.min(a, b);
}

// Show/hide + scale an object. `s` is 0..1, `base` is the full-size scale.
export function setScale(obj, s, base = 1) {
  obj.visible = s > 0.004;
  obj.scale.setScalar(Math.max(0.0001, s * base));
}

export const mat = (THREE, color, extra = {}) =>
  new THREE.MeshStandardMaterial({ color, ...extra });

export const glowMat = (THREE, color, intensity = 0.6, extra = {}) =>
  new THREE.MeshStandardMaterial({
    color,
    emissive: color,
    emissiveIntensity: intensity,
    ...extra,
  });

// A friendly, simple child / adult figure. Faces +z. Arms are pivots stored in
// userData so scenes can wave them (rotation.z > 0 swings the RIGHT arm out/up).
export function createKid(
  THREE,
  { shirt, pants = 0x35407a, skin = 0xf1c27d, hair = 0x2b1b12, scale = 0.8 }
) {
  const outer = new THREE.Group();
  const model = new THREE.Group();
  const mSkin = mat(THREE, skin);
  const mShirt = mat(THREE, shirt);
  const mPants = mat(THREE, pants);
  const mHair = mat(THREE, hair);
  const mEye = mat(THREE, 0x1b1b1b);

  const legGeo = new THREE.CylinderGeometry(0.14, 0.14, 0.55, 10);
  [-0.2, 0.2].forEach((x) => {
    const leg = new THREE.Mesh(legGeo, mPants);
    leg.position.set(x, 0.28, 0);
    model.add(leg);
  });

  const body = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.5, 1.1, 16), mShirt);
  body.position.y = 1.1;
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.42, 18, 18), mSkin);
  head.position.y = 2.0;
  const hairCap = new THREE.Mesh(
    new THREE.SphereGeometry(0.45, 16, 12, 0, Math.PI * 2, 0, Math.PI / 1.8),
    mHair
  );
  hairCap.position.set(0, 2.06, -0.03);
  hairCap.rotation.x = -0.3;

  const eyeGeo = new THREE.SphereGeometry(0.055, 8, 8);
  const eyeL = new THREE.Mesh(eyeGeo, mEye);
  eyeL.position.set(-0.15, 2.03, 0.38);
  const eyeR = new THREE.Mesh(eyeGeo, mEye);
  eyeR.position.set(0.15, 2.03, 0.38);

  const makeArm = (side) => {
    const pivot = new THREE.Group();
    pivot.position.set(side * 0.52, 1.55, 0);
    const arm = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.8, 10), mShirt);
    arm.position.y = -0.4;
    const hand = new THREE.Mesh(new THREE.SphereGeometry(0.11, 10, 10), mSkin);
    hand.position.y = -0.82;
    pivot.add(arm, hand);
    pivot.rotation.z = -side * 0.12;
    return pivot;
  };
  const armL = makeArm(-1);
  const armR = makeArm(1);

  model.add(body, head, hairCap, eyeL, eyeR, armL, armR);
  model.scale.setScalar(scale);
  outer.add(model);
  outer.userData = { armL, armR };
  return outer;
}

// Ollie the Owl, built from simple shapes (matches the purple SVG mascot).
export function createOwl(THREE) {
  const outer = new THREE.Group();
  const purple = mat(THREE, 0x8b6cff);
  const dark = mat(THREE, 0x6c4cf5);
  const belly = mat(THREE, 0xe4dcff);
  const white = mat(THREE, 0xffffff);
  const ink = mat(THREE, 0x24204a);
  const yellow = mat(THREE, 0xffc93c);

  const body = new THREE.Mesh(new THREE.SphereGeometry(0.9, 24, 24), purple);
  body.scale.set(1, 1.15, 0.95);
  body.position.y = 1.1;

  const tummy = new THREE.Mesh(new THREE.SphereGeometry(0.62, 20, 20), belly);
  tummy.scale.set(1, 1.1, 0.6);
  tummy.position.set(0, 0.95, 0.55);

  const eyeGeo = new THREE.SphereGeometry(0.3, 16, 16);
  const pupilGeo = new THREE.SphereGeometry(0.14, 12, 12);
  [-1, 1].forEach((s) => {
    const eye = new THREE.Mesh(eyeGeo, white);
    eye.position.set(s * 0.34, 1.6, 0.72);
    const pupil = new THREE.Mesh(pupilGeo, ink);
    pupil.position.set(s * 0.34, 1.6, 0.94);
    outer.add(eye, pupil);
  });

  const beak = new THREE.Mesh(new THREE.ConeGeometry(0.13, 0.32, 8), yellow);
  beak.rotation.x = Math.PI / 2;
  beak.position.set(0, 1.35, 1.0);

  const earGeo = new THREE.ConeGeometry(0.22, 0.6, 6);
  const earL = new THREE.Mesh(earGeo, dark);
  earL.position.set(-0.55, 2.35, 0.05);
  earL.rotation.z = 0.35;
  const earR = new THREE.Mesh(earGeo, dark);
  earR.position.set(0.55, 2.35, 0.05);
  earR.rotation.z = -0.35;

  const makeWing = (side) => {
    const pivot = new THREE.Group();
    pivot.position.set(side * 0.9, 1.6, 0);
    const wing = new THREE.Mesh(new THREE.SphereGeometry(0.38, 12, 12), dark);
    wing.scale.set(0.4, 1.2, 0.8);
    wing.position.y = -0.45;
    pivot.add(wing);
    pivot.rotation.z = -side * 0.2;
    return pivot;
  };
  const wingL = makeWing(-1);
  const wingR = makeWing(1);

  const footGeo = new THREE.SphereGeometry(0.18, 10, 10);
  [-0.3, 0.3].forEach((x) => {
    const foot = new THREE.Mesh(footGeo, yellow);
    foot.scale.set(1.4, 0.5, 1.2);
    foot.position.set(x, 0.1, 0.45);
    outer.add(foot);
  });

  outer.add(body, tummy, beak, earL, earR, wingL, wingR);
  outer.userData = { wingL, wingR };
  return outer;
}

export function createStarGeometry(THREE, outer = 0.35, inner = 0.15, depth = 0.12) {
  const shape = new THREE.Shape();
  for (let i = 0; i < 10; i += 1) {
    const r = i % 2 === 0 ? outer : inner;
    const a = (i * Math.PI) / 5 - Math.PI / 2;
    const x = Math.cos(a) * r;
    const y = Math.sin(a) * r;
    if (i === 0) shape.moveTo(x, y);
    else shape.lineTo(x, y);
  }
  shape.closePath();
  const geo = new THREE.ExtrudeGeometry(shape, { depth, bevelEnabled: false });
  geo.translate(0, 0, -depth / 2);
  return geo;
}

export function createHeartGeometry(THREE, depth = 0.25) {
  const x = 0;
  const y = 0;
  const s = new THREE.Shape();
  s.moveTo(x + 0.25, y + 0.25);
  s.bezierCurveTo(x + 0.25, y + 0.25, x + 0.2, y, x, y);
  s.bezierCurveTo(x - 0.3, y, x - 0.3, y + 0.35, x - 0.3, y + 0.35);
  s.bezierCurveTo(x - 0.3, y + 0.55, x - 0.1, y + 0.77, x + 0.25, y + 0.95);
  s.bezierCurveTo(x + 0.6, y + 0.77, x + 0.8, y + 0.55, x + 0.8, y + 0.35);
  s.bezierCurveTo(x + 0.8, y + 0.35, x + 0.8, y, x + 0.5, y);
  s.bezierCurveTo(x + 0.35, y, x + 0.25, y + 0.25, x + 0.25, y + 0.25);
  const geo = new THREE.ExtrudeGeometry(s, { depth, bevelEnabled: false });
  geo.translate(-0.25, -0.475, -depth / 2);
  return geo;
}

// Soft sparkles drifting in the background to keep scenes lively.
export function createFloaters(THREE, scene, count = 12) {
  const colors = [0xffd166, 0xff9ecd, 0x9be7ff, 0xc7b3ff];
  const geo = new THREE.OctahedronGeometry(0.14, 0);
  return Array.from({ length: count }, (_, i) => {
    const c = colors[i % colors.length];
    const mesh = new THREE.Mesh(geo, glowMat(THREE, c, 0.5));
    const y = 1.2 + ((i * 13) % 6) * 0.8;
    mesh.position.set(((i * 37) % 17 - 8) * 0.8, y, -3 - (i % 3));
    scene.add(mesh);
    return { mesh, y };
  });
}

export function animateFloaters(floaters, e) {
  floaters.forEach((f, i) => {
    f.mesh.position.y = f.y + Math.sin(e * 0.8 + i) * 0.3;
    f.mesh.rotation.y += 0.01;
    f.mesh.rotation.x += 0.006;
  });
}
