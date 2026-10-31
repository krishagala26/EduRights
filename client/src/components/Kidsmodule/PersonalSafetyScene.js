/**
 * PersonalSafetyScene.js
 * Module 2: The Body Guard Rules (Personal Safety, POCSO Act 2012)
 *
 * Scene script contract (same as Modules 3 & 4):
 *   export default { duration, captions, init(THREE, { scene }), animate(THREE, { elapsed, refs }) }
 *
 * Design rules for this module: 100% symbolic, gentle and empowering.
 * - The "unwanted boundary-crossing" is only an abstract grey shape: no face, no spikes, no literal depiction.
 * - Asha is never touched. Her Safety Bubble protects her and she says NO.
 * - The scene ends with a Safe Circle of trusted adults and the Childline 1098 sign.
 *
 * Notes
 * - The player owns the camera and lights, so everything lives inside one `world` group.
 *   The sideways pan toward the Safe Circle and the final pull-up are done by moving that group.
 * - "1098" and "NO!" are drawn with a canvas texture (no font files, no extra packages).
 */

const DURATION = 48;

const captions = [
  { start: 0, end: 6, text: 'Your body belongs to YOU. Imagine a Safety Bubble all around you.' },
  { start: 6, end: 14, text: 'Safe people respect your bubble. The POCSO Act, 2012 protects every child under 18.' },
  {
    start: 14,
    end: 24,
    text: 'If anyone, even someone you know, makes you feel uncomfortable or confused, that is NOT okay.',
  },
  { start: 24, end: 32, text: 'Say NO loudly. Move away. You are strong!' },
  {
    start: 32,
    end: 42,
    text: 'Go to a trusted adult and tell them. It is never your fault. Keep telling until someone listens.',
  },
  { start: 42, end: 48, text: 'Need help? Call Childline 1098. It is free, any time, day or night.' },
];

/* ------------------------------------------------------------------ */
/* Small helpers                                                       */
/* ------------------------------------------------------------------ */

const clamp01 = (v) => Math.min(1, Math.max(0, v));
const lerp = (a, b, t) => a + (b - a) * t;
const smooth = (t) => t * t * (3 - 2 * t);
const seg = (e, a, b) => clamp01((e - a) / (b - a));
const sseg = (e, a, b) => smooth(seg(e, a, b));
const easeOutBack = (t) => {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
};
const easeOutQuad = (t) => 1 - (1 - t) * (1 - t);
const pop = (e, start, dur = 0.8) => Math.max(0.001, easeOutBack(seg(e, start, start + dur)));

function std(THREE, color, extra = {}) {
  return new THREE.MeshStandardMaterial({
    color,
    flatShading: true,
    roughness: 0.75,
    metalness: 0.05,
    ...extra,
  });
}

function mesh(THREE, geometry, material, x = 0, y = 0, z = 0) {
  const m = new THREE.Mesh(geometry, material);
  m.position.set(x, y, z);
  return m;
}

function starGeometry(THREE, outer, inner, depth) {
  const shape = new THREE.Shape();
  for (let i = 0; i < 10; i++) {
    const r = i % 2 === 0 ? outer : inner;
    const a = (i / 10) * Math.PI * 2 + Math.PI / 2;
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

/** Friendly low-poly character. Faces +z. armL at +x, armR at -x. */
function makeKid(THREE, { shirt, skin = 0xe8b48a, hair = 0x2b1b12, pants = 0x4b3fa0 }) {
  const group = new THREE.Group();

  const body = mesh(THREE, new THREE.CylinderGeometry(0.34, 0.4, 0.95, 8), std(THREE, shirt), 0, 1.0, 0);
  group.add(body);

  const head = new THREE.Group();
  head.position.set(0, 1.78, 0);
  head.add(mesh(THREE, new THREE.IcosahedronGeometry(0.4, 1), std(THREE, skin)));
  head.add(
    mesh(
      THREE,
      new THREE.SphereGeometry(0.42, 8, 6, 0, Math.PI * 2, 0, Math.PI * 0.5),
      std(THREE, hair),
      0,
      0.04,
      -0.06
    )
  );
  const eyeMat = std(THREE, 0x1a1a1a);
  head.add(mesh(THREE, new THREE.SphereGeometry(0.05, 6, 6), eyeMat, -0.14, 0.03, 0.385));
  head.add(mesh(THREE, new THREE.SphereGeometry(0.05, 6, 6), eyeMat, 0.14, 0.03, 0.385));
  const smile = mesh(
    THREE,
    new THREE.TorusGeometry(0.08, 0.02, 5, 8, Math.PI),
    std(THREE, 0x8a3b3b),
    0,
    -0.1,
    0.385
  );
  smile.rotation.z = Math.PI;
  head.add(smile);
  group.add(head);

  const pantsMat = std(THREE, pants);
  const makeLeg = (x) => {
    const pivot = new THREE.Group();
    pivot.position.set(x, 0.55, 0);
    pivot.add(mesh(THREE, new THREE.CylinderGeometry(0.12, 0.12, 0.55, 6), pantsMat, 0, -0.27, 0));
    pivot.add(mesh(THREE, new THREE.BoxGeometry(0.2, 0.1, 0.32), std(THREE, 0x3b2a20), 0, -0.55, 0.05));
    group.add(pivot);
    return pivot;
  };
  const legL = makeLeg(0.15);
  const legR = makeLeg(-0.15);

  const shirtMat = std(THREE, shirt);
  const skinMat = std(THREE, skin);
  const makeArm = (x) => {
    const pivot = new THREE.Group();
    pivot.position.set(x, 1.38, 0);
    pivot.add(mesh(THREE, new THREE.CylinderGeometry(0.09, 0.09, 0.6, 6), shirtMat, 0, -0.3, 0));
    pivot.add(mesh(THREE, new THREE.SphereGeometry(0.1, 6, 6), skinMat, 0, -0.64, 0));
    group.add(pivot);
    return pivot;
  };
  const armL = makeArm(0.5);
  const armR = makeArm(-0.5);

  return { group, body, head, legL, legR, armL, armR };
}

function poseKid(kid, { walk = 0, phase = 0, armL = 0.12, armR = 0.12, headX = 0, headY = 0, t = 0 }) {
  const sw = Math.sin(phase) * walk;
  kid.legL.rotation.x = sw * 0.7;
  kid.legR.rotation.x = -sw * 0.7;
  kid.armL.rotation.x = -sw * 0.6;
  kid.armR.rotation.x = sw * 0.6;
  kid.armL.rotation.z = armL;
  kid.armR.rotation.z = -armR;
  kid.head.rotation.x = headX;
  kid.head.rotation.y = headY;
  kid.body.scale.y = 1 + 0.015 * Math.sin(t * 2.2);
}

/* ---- canvas-texture labels ("NO!" and the 1098 sign) ---- */

function roundRectPath(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function makeLabelTexture(THREE, w, h, draw) {
  if (typeof document === 'undefined') return null; // SSR / test environments: fall back to a plain panel
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;
  draw(ctx, w, h);
  const tex = new THREE.CanvasTexture(canvas);
  if (THREE.SRGBColorSpace) tex.colorSpace = THREE.SRGBColorSpace;
  tex.needsUpdate = true;
  return tex;
}

function makeLabelMaterial(THREE, tex, fallbackColor) {
  if (!tex) {
    return std(THREE, fallbackColor, {
      emissive: fallbackColor,
      emissiveIntensity: 0.8,
      transparent: true,
      fog: false,
    });
  }
  return new THREE.MeshStandardMaterial({
    map: tex,
    emissiveMap: tex,
    emissive: new THREE.Color(0xffffff),
    emissiveIntensity: 0.9,
    roughness: 1,
    metalness: 0,
    transparent: true,
    fog: false,
  });
}

/* ------------------------------------------------------------------ */
/* init                                                                */
/* ------------------------------------------------------------------ */

// Key positions on the ground (x, z)
const CIRCLE = { x: -5.2, z: -1.8 }; // centre of the Safe Circle
const END = { x: -4.9, z: -0.9 }; // where Asha stops

function init(THREE, { scene }) {
  const world = new THREE.Group();
  scene.add(world);

  const DEEP = new THREE.Color(0x24356b);
  const WARM = new THREE.Color(0x4a4585);
  const bg = DEEP.clone();
  scene.background = bg;
  scene.fog = new THREE.Fog(DEEP.clone(), 14, 40);

  const add = (o) => {
    world.add(o);
    return o;
  };

  /* ---- ground, home glow, twinkling backdrop ---- */
  const ground = new THREE.Mesh(new THREE.CircleGeometry(30, 40), std(THREE, 0x2d5f73));
  ground.rotation.x = -Math.PI / 2;
  add(ground);

  const homeMat = std(THREE, 0x58d6c9, { emissive: 0x2aa89f, emissiveIntensity: 0.5 });
  add(mesh(THREE, new THREE.CylinderGeometry(2.3, 2.3, 0.08, 32), homeMat, 0, 0.04, 0));

  const bgStarMat = std(THREE, 0xfff3c4, { emissive: 0xfff3c4, emissiveIntensity: 1, fog: false });
  const bgStars = [];
  for (let i = 0; i < 36; i++) {
    const x = Math.sin(i * 12.9898) * 16;
    const y = 3 + (Math.sin(i * 78.233) * 0.5 + 0.5) * 10;
    const z = -14 - (Math.sin(i * 37.719) * 0.5 + 0.5) * 6;
    const s = mesh(THREE, new THREE.OctahedronGeometry(0.12, 0), bgStarMat, x, y, z);
    add(s);
    bgStars.push(s);
  }

  /* ---- Asha ---- */
  const asha = makeKid(THREE, { shirt: 0xff5fa2, skin: 0xc68642, hair: 0x1b1220, pants: 0x4b3fa0 });
  add(asha.group);

  /* ---- Safety Bubble group (follows Asha) ---- */
  const bubbleGroup = new THREE.Group();
  add(bubbleGroup);

  const bubbleMat = std(THREE, 0x7fe8e0, {
    emissive: 0x24b8b0,
    emissiveIntensity: 0.5,
    transparent: true,
    opacity: 0.2,
    roughness: 0.2,
    depthWrite: false,
    side: THREE.DoubleSide,
  });
  const bubble = mesh(THREE, new THREE.SphereGeometry(2.2, 24, 16), bubbleMat, 0, 1.3, 0);
  bubble.visible = false;
  bubbleGroup.add(bubble);

  const ringMat = std(THREE, 0xbff6ff, {
    emissive: 0x7dfff2,
    emissiveIntensity: 1,
    transparent: true,
    opacity: 0.55,
    depthWrite: false,
  });
  const ringA = mesh(THREE, new THREE.TorusGeometry(2.2, 0.025, 6, 48), ringMat, 0, 1.3, 0);
  const ringB = mesh(THREE, new THREE.TorusGeometry(2.2, 0.02, 6, 48), ringMat, 0, 1.3, 0);
  ringA.visible = false;
  ringB.visible = false;
  bubbleGroup.add(ringA);
  bubbleGroup.add(ringB);

  // the ground boundary line ("this is my space")
  const boundaryMat = std(THREE, 0x7fe8e0, {
    emissive: 0x24b8b0,
    emissiveIntensity: 0.8,
    transparent: true,
    opacity: 0.85,
  });
  const boundary = mesh(THREE, new THREE.RingGeometry(2.1, 2.25, 56), boundaryMat, 0, 0.07, 0);
  boundary.rotation.x = -Math.PI / 2;
  boundary.visible = false;
  bubbleGroup.add(boundary);

  // friendly orbiters that respect the edge
  const orbiters = [];
  for (let i = 0; i < 6; i++) {
    const m = std(THREE, 0xffd966, { emissive: 0xffc233, emissiveIntensity: 0.9 });
    const geo = i % 2 === 0 ? new THREE.IcosahedronGeometry(0.22, 0) : starGeometry(THREE, 0.3, 0.13, 0.1);
    const o = mesh(THREE, geo, m);
    o.visible = false;
    bubbleGroup.add(o);
    orbiters.push({ mesh: o, mat: m });
  }

  /* ---- the grey boundary-crossing shape (abstract, calm) ---- */
  const shapeMat = std(THREE, 0x8d8f9e, { emissive: 0x8a3342, emissiveIntensity: 0.35 });
  const shape = add(mesh(THREE, new THREE.DodecahedronGeometry(0.75, 0), shapeMat));
  shape.visible = false;

  /* ---- "NO!" shockwave: shell + two ground rings ---- */
  const shockMat = std(THREE, 0xd8fffb, {
    emissive: 0x7dfff2,
    emissiveIntensity: 1.2,
    transparent: true,
    opacity: 0,
    depthWrite: false,
  });
  const shockSphere = add(mesh(THREE, new THREE.SphereGeometry(1, 20, 14), shockMat, 0, 1.3, 0));
  shockSphere.visible = false;
  const shockRings = [0, 1].map(() => {
    const m = std(THREE, 0xe6fffc, {
      emissive: 0x7dfff2,
      emissiveIntensity: 1.2,
      transparent: true,
      opacity: 0,
      depthWrite: false,
    });
    const r = mesh(THREE, new THREE.RingGeometry(0.92, 1, 56), m, 0, 0.1, 0);
    r.rotation.x = -Math.PI / 2;
    r.visible = false;
    add(r);
    return { mesh: r, mat: m };
  });

  // big friendly "NO!" badge
  const noTex = makeLabelTexture(THREE, 512, 256, (ctx, w, h) => {
    roundRectPath(ctx, 12, 12, w - 24, h - 24, 48);
    ctx.fillStyle = '#ff7a2f';
    ctx.fill();
    ctx.lineWidth = 10;
    ctx.strokeStyle = '#ffffff';
    ctx.stroke();
    ctx.font = 'bold 170px "Arial Black", Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.lineWidth = 12;
    ctx.strokeStyle = '#8a2f00';
    ctx.strokeText('NO!', w / 2, h / 2 + 8);
    ctx.fillStyle = '#ffffff';
    ctx.fillText('NO!', w / 2, h / 2 + 8);
  });
  const noMat = makeLabelMaterial(THREE, noTex, 0xff7a2f);
  const noSign = add(mesh(THREE, new THREE.PlaneGeometry(3.2, 1.6), noMat, 0, 4.7, 1.2));
  noSign.visible = false;

  /* ---- Safe Circle (warm star, ring, beam, guardians, light trail) ---- */
  const circleRingMat = std(THREE, 0xffd36a, {
    emissive: 0xffb347,
    emissiveIntensity: 0.9,
    transparent: true,
    opacity: 0.9,
  });
  const circleRing = mesh(THREE, new THREE.RingGeometry(2.1, 2.4, 56), circleRingMat, CIRCLE.x, 0.06, CIRCLE.z);
  circleRing.rotation.x = -Math.PI / 2;
  circleRing.visible = false;
  add(circleRing);

  const circleDiscMat = std(THREE, 0xffe3a0, {
    emissive: 0xffc15a,
    emissiveIntensity: 0.5,
    transparent: true,
    opacity: 0.28,
    depthWrite: false,
  });
  const circleDisc = mesh(THREE, new THREE.CircleGeometry(2.1, 40), circleDiscMat, CIRCLE.x, 0.05, CIRCLE.z);
  circleDisc.rotation.x = -Math.PI / 2;
  circleDisc.visible = false;
  add(circleDisc);

  const starMat = std(THREE, 0xffd84d, { emissive: 0xffc107, emissiveIntensity: 1.2 });
  const safeStar = mesh(THREE, starGeometry(THREE, 0.9, 0.4, 0.3), starMat, CIRCLE.x, 3.7, CIRCLE.z);
  safeStar.visible = false;
  add(safeStar);

  const starHaloMat = std(THREE, 0xffe08a, {
    emissive: 0xffd36a,
    emissiveIntensity: 1,
    transparent: true,
    opacity: 0.16,
    depthWrite: false,
  });
  const starHalo = mesh(THREE, new THREE.SphereGeometry(1.5, 14, 10), starHaloMat, CIRCLE.x, 3.7, CIRCLE.z);
  starHalo.visible = false;
  add(starHalo);

  const warmBeamMat = std(THREE, 0xffe3a0, {
    emissive: 0xffc15a,
    emissiveIntensity: 0.9,
    transparent: true,
    opacity: 0,
    depthWrite: false,
    side: THREE.DoubleSide,
  });
  const warmBeam = mesh(THREE, new THREE.CylinderGeometry(0.4, 2.0, 3.6, 20, 1, true), warmBeamMat, CIRCLE.x, 1.8, CIRCLE.z);
  warmBeam.visible = false;
  add(warmBeam);

  const guardianDefs = [
    { shirt: 0xff7043, skin: 0xd9a066, hair: 0x1f1410, pos: [-6.9, -2.5], rotY: 0.35 }, // parent
    { shirt: 0x66bb6a, skin: 0x8d5524, hair: 0x120d0a, pos: [-3.6, -2.6], rotY: -0.35 }, // teacher
    { shirt: 0x42a5f5, skin: 0xf1c27d, hair: 0x3b2314, pos: [-5.3, -3.4], rotY: 0 }, // helper
  ];
  const guardians = guardianDefs.map((d) => {
    const k = makeKid(THREE, { shirt: d.shirt, skin: d.skin, hair: d.hair, pants: 0x3d4a8a });
    k.group.position.set(d.pos[0], 0, d.pos[1]);
    k.group.rotation.y = d.rotY;
    k.group.visible = false;
    k.group.scale.setScalar(0.001);
    add(k.group);
    return k;
  });

  const dotMat = std(THREE, 0xfff0b0, { emissive: 0xffd36a, emissiveIntensity: 0.6 });
  const dots = [];
  for (let i = 0; i < 9; i++) {
    const u = lerp(0.3, 0.75, i / 8);
    const d = mesh(THREE, new THREE.SphereGeometry(0.12, 8, 6), dotMat, END.x * u, 0.3, END.z * u);
    d.visible = false;
    add(d);
    dots.push(d);
  }

  /* ---- Childline 1098 sign + rings of light ---- */
  const signTex = makeLabelTexture(THREE, 640, 320, (ctx, w, h) => {
    roundRectPath(ctx, 14, 14, w - 28, h - 28, 40);
    const grad = ctx.createLinearGradient(0, 0, 0, h);
    grad.addColorStop(0, '#1a6a78');
    grad.addColorStop(1, '#0d3b52');
    ctx.fillStyle = grad;
    ctx.fill();
    ctx.lineWidth = 10;
    ctx.strokeStyle = '#ffd166';
    ctx.stroke();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 44px Arial, sans-serif';
    ctx.fillText('CHILDLINE', w / 2, 66);
    ctx.font = 'bold 190px "Arial Black", Arial, sans-serif';
    ctx.lineWidth = 10;
    ctx.strokeStyle = '#0a2a3c';
    ctx.strokeText('1098', w / 2, h / 2 + 14);
    ctx.fillStyle = '#fff3b0';
    ctx.fillText('1098', w / 2, h / 2 + 14);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 38px Arial, sans-serif';
    ctx.fillText('FREE  -  DAY & NIGHT', w / 2, h - 52);
  });
  const signMat = makeLabelMaterial(THREE, signTex, 0x0d3b52);
  const sign = add(mesh(THREE, new THREE.PlaneGeometry(4.2, 2.1), signMat, -3.4, 4.2, -0.5));
  sign.visible = false;

  const signRings = [0, 1, 2].map(() => {
    const m = std(THREE, 0xffd36a, {
      emissive: 0xffd36a,
      emissiveIntensity: 1,
      transparent: true,
      opacity: 0,
      depthWrite: false,
    });
    const r = mesh(THREE, new THREE.TorusGeometry(2.3, 0.04, 6, 48), m, -3.4, 5.8, -0.8);
    r.visible = false;
    add(r);
    return { mesh: r, mat: m };
  });

  return {
    scene,
    world,
    bg,
    DEEP,
    WARM,
    homeMat,
    bgStars,
    asha,
    bubbleGroup,
    bubble,
    bubbleMat,
    ringA,
    ringB,
    boundary,
    boundaryMat,
    orbiters,
    shape,
    shapeMat,
    shockSphere,
    shockMat,
    shockRings,
    noSign,
    safe: { circleRing, circleDisc, safeStar, starHalo, starMat, starHaloMat, warmBeam, warmBeamMat },
    guardians,
    dots,
    sign,
    signRings,
    // reusable colours (no per-frame allocation)
    cTeal: new THREE.Color(0x7fe8e0),
    cAmber: new THREE.Color(0xffd27a),
    cFlash: new THREE.Color(0xe6fffc),
    cWarm: new THREE.Color(0xffe3a0),
    eTeal: new THREE.Color(0x24b8b0),
    eAmber: new THREE.Color(0xff9f1c),
    eFlash: new THREE.Color(0x7dfff2),
    eWarm: new THREE.Color(0xffb347),
    tmp: new THREE.Color(),
    pushDir: new THREE.Vector3(1, 0.5, -0.2).normalize(),
  };
}

/* ------------------------------------------------------------------ */
/* animate                                                             */
/* ------------------------------------------------------------------ */

function animate(THREE, { elapsed, refs }) {
  const e = elapsed;
  const R = refs;

  /* ---- mood + gentle camera moves ---- */
  R.bg.lerpColors(R.DEEP, R.WARM, sseg(e, 32, 40));
  R.scene.fog.color.copy(R.bg);
  R.world.position.set(2.6 * sseg(e, 32, 39), -1.2 * sseg(e, 42, 48), 0.8 * sseg(e, 0, 6) - 1.0 * sseg(e, 42, 48));
  R.world.rotation.x = 0.05 * sseg(e, 42, 48);

  R.bgStars.forEach((s, i) => {
    s.scale.setScalar(Math.max(0.05, 0.6 + 0.4 * Math.sin(e * 1.5 + i * 1.7)));
    s.rotation.y = e * 0.3 + i;
  });
  R.homeMat.emissiveIntensity = 0.5 + 0.15 * Math.sin(e * 2);

  /* ---- bubble state amounts ---- */
  const amber = sseg(e, 17.5, 21) * (1 - sseg(e, 24.3, 24.7)); // uneasy
  const flash = sseg(e, 24.3, 24.8) * (1 - sseg(e, 25.2, 28)); // the NO!
  const warm = sseg(e, 37.5, 41); // merged with the Safe Circle
  const merge = sseg(e, 38, 41);
  const wobble = sseg(e, 16, 20) * (1 - sseg(e, 24.3, 25));

  /* ---- Asha ---- */
  const t1 = sseg(e, 33, 38.5);
  const ax = END.x * t1;
  const az = END.z * t1;
  const dt = sseg(e + 0.05, 33, 38.5) - sseg(e - 0.05, 33, 38.5);
  const speed = (Math.hypot(END.x, END.z) * dt) / 0.1;
  const walk = clamp01(speed / 0.6);
  const phase = t1 * Math.hypot(END.x, END.z) * 3.6;
  const heading = Math.atan2(END.x, END.z);

  const showBubble = sseg(e, 2.5, 4) * (1 - sseg(e, 6, 7));
  const tense = sseg(e, 15, 18) * (1 - sseg(e, 24, 24.6));
  const noAmt = sseg(e, 24, 24.5) * (1 - sseg(e, 28, 29));
  const strong = sseg(e, 28.5, 29.5) * (1 - sseg(e, 31.2, 32.2));
  const greet = sseg(e, 39.5, 40) * (1 - sseg(e, 42, 43));

  let aL = 0.12 + 0.35 * showBubble;
  let aR = 0.12 + 0.35 * showBubble;
  aL = lerp(aL, 0.04, tense);
  aR = lerp(aR, 0.04, tense);
  aL = lerp(aL, 1.55 + 0.1 * Math.sin(e * 14), noAmt); // arm out toward the shape, palm "stop"
  aR = lerp(aR, 0.5, noAmt);
  aL = lerp(aL, 2.35 + 0.15 * Math.sin(e * 6), strong);
  aR = lerp(aR, 2.35 + 0.15 * Math.sin(e * 6 + 1), strong);
  aL = lerp(aL, 2.5 + 0.3 * Math.sin(e * 8), greet);

  const headY = 0.55 * sseg(e, 15, 18) * (1 - sseg(e, 24, 26));
  poseKid(R.asha, { walk, phase, armL: aL, armR: aR, headX: -0.12 * noAmt, headY, t: e });

  R.asha.group.position.set(ax, Math.abs(Math.sin(phase)) * 0.06 * walk, az);
  R.asha.group.rotation.y = heading * (sseg(e, 32.6, 33.4) - sseg(e, 38.3, 39.3));
  R.asha.group.rotation.z = 0.07 * tense;
  R.asha.group.scale.setScalar(1 + 0.05 * flash);

  /* ---- Safety Bubble ---- */
  const grow = Math.max(0.001, easeOutBack(seg(e, 0.4, 3.2)));
  const bs =
    grow *
    (1 + 0.015 * Math.sin(e * 2) + 0.12 * flash + 0.9 * merge) *
    (1 + 0.04 * wobble * Math.sin(e * 9));

  const m = sseg(e, 38.5, 41);
  R.bubbleGroup.position.set(lerp(ax, CIRCLE.x, m), 0, lerp(az, CIRCLE.z, m));

  R.bubble.visible = e > 0.4;
  R.bubble.scale.set(bs, bs * (1 - 0.04 * wobble * Math.sin(e * 9 + 0.5)), bs);

  R.ringA.visible = e > 1.0;
  R.ringB.visible = e > 1.0;
  R.ringA.scale.setScalar(bs);
  R.ringB.scale.setScalar(bs);
  R.ringA.rotation.set(1.2, 0, e * 0.6);
  R.ringB.rotation.set(-0.9, 0, 1.0 - e * 0.45);

  R.boundary.visible = e > 1.0;
  R.boundary.scale.setScalar(bs);

  // colour: teal -> amber (uneasy) -> flash (NO!) -> teal -> warm gold (safe)
  R.tmp.copy(R.cTeal).lerp(R.cAmber, amber).lerp(R.cFlash, flash).lerp(R.cWarm, warm);
  R.bubbleMat.color.copy(R.tmp);
  R.boundaryMat.color.copy(R.tmp);
  R.tmp.copy(R.eTeal).lerp(R.eAmber, amber).lerp(R.eFlash, flash).lerp(R.eWarm, warm);
  R.bubbleMat.emissive.copy(R.tmp);
  R.boundaryMat.emissive.copy(R.tmp);
  R.bubbleMat.emissiveIntensity = 0.5 + 0.08 * Math.sin(e * 3) + 1.9 * flash + 0.3 * warm;
  R.boundaryMat.emissiveIntensity = 0.8 + 0.1 * Math.sin(e * 3) + 1.4 * flash;
  R.bubbleMat.opacity = 0.2 + 0.1 * flash;

  /* ---- friendly orbiters respect the edge ---- */
  const away = sseg(e, 14, 16) * (1 - sseg(e, 26, 28));
  R.orbiters.forEach((o, i) => {
    const t0 = 5 + 0.3 * i;
    const r = 3.7 + 0.15 * Math.sin(e * 1.2 + i) + 0.8 * away;
    const a = e * 0.45 + (i * Math.PI * 2) / R.orbiters.length;
    o.mesh.visible = e >= t0;
    o.mesh.position.set(Math.cos(a) * r, 1.3 + Math.sin(e * 0.9 + i * 1.3) * 0.7, Math.sin(a) * r);
    o.mesh.rotation.set(e * 0.7, e * 1.2 + i, 0);
    o.mesh.scale.setScalar(Math.max(0.001, pop(e, t0) * (1 - sseg(e, 36, 38))));
    o.mat.emissiveIntensity = 0.9 - 0.4 * away + 0.2 * Math.sin(e * 3 + i);
  });

  /* ---- the grey shape drifts in, is pushed back, and fades to a speck ---- */
  const sh = R.shape;
  const shapeOn = e >= 14 && e < 30.2;
  sh.visible = shapeOn;
  if (shapeOn) {
    const ap = sseg(e, 14, 20);
    const nudge = sseg(e, 20, 24.2) * 0.12 * Math.sin(e * 3);
    const push = 14 * easeOutQuad(seg(e, 24.6, 29.5));
    sh.position.set(
      lerp(9, 3.0, ap) - nudge + R.pushDir.x * push,
      lerp(2.6, 1.7, ap) + Math.sin(e * 1.6) * 0.15 + R.pushDir.y * push,
      lerp(-1.8, 0.3, ap) + R.pushDir.z * push
    );
    const push01 = sseg(e, 24.6, 29.5);
    sh.rotation.set(e * 0.7 + 8 * push01, e * 0.9 + 10 * push01, 0);
    sh.scale.setScalar(Math.max(0.001, sseg(e, 14, 15.5) * (1 - 0.95 * sseg(e, 26.2, 29.8))));
    R.shapeMat.emissiveIntensity = lerp(0.35, 0.1, sseg(e, 24.5, 27));
  }

  /* ---- the NO! moment: shockwave + badge ---- */
  const sp = seg(e, 24.5, 27.5);
  R.shockSphere.visible = sp > 0 && sp < 1;
  R.shockSphere.scale.setScalar(lerp(2.3, 7.5, easeOutQuad(sp)));
  R.shockMat.opacity = 0.32 * (1 - sp);
  R.shockRings.forEach((r, i) => {
    const p = seg(e, 24.5 + i * 0.5, 28 + i * 0.5);
    r.mesh.visible = p > 0 && p < 1;
    r.mesh.scale.setScalar(lerp(2.3, 9, easeOutQuad(p)));
    r.mat.opacity = 0.7 * (1 - p);
  });

  const noS = easeOutBack(seg(e, 24.4, 25.0)) * (1 - sseg(e, 28, 29));
  R.noSign.visible = noS > 0.01;
  R.noSign.scale.setScalar(Math.max(0.001, noS * (1 + 0.05 * Math.sin(e * 14) * seg(e, 25.2, 28))));
  R.noSign.rotation.z = 0.06 * Math.sin(e * 20) * seg(e, 25, 26.5) * (1 - sseg(e, 27, 28));

  /* ---- Safe Circle ---- */
  const S = R.safe;
  S.circleRing.visible = e >= 31.5;
  S.circleDisc.visible = e >= 31.5;
  const ringS = Math.max(0.001, sseg(e, 31.5, 33));
  S.circleRing.scale.setScalar(ringS);
  S.circleDisc.scale.setScalar(ringS);
  S.circleRing.material.emissiveIntensity = 0.9 + 0.2 * Math.sin(e * 2.5);

  S.safeStar.visible = e >= 32;
  S.starHalo.visible = e >= 32;
  const starS = pop(e, 32, 1.2) * (1 + 0.06 * Math.sin(e * 3));
  S.safeStar.scale.setScalar(starS);
  S.starHalo.scale.setScalar(starS * (1 + 0.1 * Math.sin(e * 2)));
  S.safeStar.position.y = 3.7 + 0.15 * Math.sin(e * 1.5);
  S.starHalo.position.y = S.safeStar.position.y;
  S.safeStar.rotation.y = e * 0.9;
  S.starMat.emissiveIntensity = 1.2 + 0.8 * sseg(e, 38, 41) + 0.2 * Math.sin(e * 4);
  S.starHaloMat.opacity = 0.16 + 0.08 * sseg(e, 38, 41);

  S.warmBeam.visible = e >= 32.2;
  S.warmBeamMat.opacity = 0.2 * sseg(e, 32.2, 34) * (0.9 + 0.1 * Math.sin(e * 3));

  R.guardians.forEach((g, i) => {
    const t0 = 33 + 0.6 * i;
    g.group.visible = e >= t0;
    g.group.scale.setScalar(pop(e, t0) * 1.3);
    const gw = sseg(e, t0 + 0.8, t0 + 1.4);
    let gl = 0.12;
    if (i === 0) gl = lerp(0.12, 2.4 + 0.3 * Math.sin(e * 3), gw); // a gentle, welcoming wave
    poseKid(g, { armL: gl, armR: 0.12, t: e + i });
  });

  // trail of light dots from Asha toward the circle
  R.dots.forEach((d, i) => {
    const t0 = 32.5 + i * 0.15;
    const vis = sseg(e, t0, t0 + 0.5) * (1 - sseg(e, 38, 40));
    d.visible = vis > 0.01;
    d.scale.setScalar(Math.max(0.001, vis));
    d.material.emissiveIntensity = 0.6 + 1.2 * Math.max(0, Math.sin(e * 6 - i * 0.8));
  });

  /* ---- Childline 1098 sign ---- */
  R.sign.visible = e >= 41.8;
  const signS = pop(e, 41.8, 1.0);
  R.sign.scale.setScalar(signS);
  R.sign.position.y = lerp(4.2, 5.8, sseg(e, 42, 44)) + 0.1 * Math.sin(e * 2) * sseg(e, 44, 45);
  R.signRings.forEach((r, i) => {
    const on = e >= 42.5;
    const p = (e * 0.5 + i / 3) % 1;
    r.mesh.visible = on;
    r.mesh.position.y = R.sign.position.y;
    r.mesh.scale.setScalar(0.8 + 0.9 * p);
    r.mat.opacity = on ? 0.5 * (1 - p) * sseg(e, 42.5, 43.5) : 0;
  });
}

export default {
  duration: DURATION,
  captions,
  init,
  animate,
};