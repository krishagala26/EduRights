/**
 * EducationRightsScene.js
 * Module 1: The Shield of Knowledge (Education Rights, RTE Act 2009)
 *
 * Scene script contract (same as Modules 3 & 4):
 *   export default { duration, captions, init(THREE, { scene }), animate(THREE, { elapsed, refs }) }
 *
 * Notes
 * - The player owns the camera and lights, so every object lives inside one `world` group.
 *   Small "camera moves" (slow dolly-in, final pull-up) are done by nudging that group.
 * - Scene is built around the origin: gate at z = 0, school at z = -7, Aarav starts at z = +5.5.
 * - Everything is MeshStandardMaterial + flat shading (low-poly, tablet friendly). No shadows.
 */

const DURATION = 48;

const captions = [
  { start: 0, end: 6, text: 'Meet Aarav. He dreams of going to school every single day.' },
  { start: 6, end: 14, text: 'But the gate is closed. School feels too far away and too costly.' },
  { start: 14, end: 22, text: 'Then India made a promise: the Right to Education Act, 2009!' },
  { start: 22, end: 30, text: 'Every child aged 6 to 14 has the right to free and compulsory education.' },
  {
    start: 30,
    end: 40,
    text: 'Free means no fees can stop you. Compulsory means the government must make sure a school is there for you.',
  },
  { start: 40, end: 48, text: 'Every child has the right to learn. Education is your golden key!' },
];

/* ------------------------------------------------------------------ */
/* Small helpers                                                       */
/* ------------------------------------------------------------------ */

const clamp01 = (v) => Math.min(1, Math.max(0, v));
const lerp = (a, b, t) => a + (b - a) * t;
const smooth = (t) => t * t * (3 - 2 * t);
const seg = (e, a, b) => clamp01((e - a) / (b - a)); // 0..1 progress between a and b
const sseg = (e, a, b) => smooth(seg(e, a, b)); // eased progress
const easeOutBack = (t) => {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
};
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

/**
 * A friendly low-poly kid. Faces +z by default.
 * armL sits at +x, armR at -x. Positive rotation.z on armL (and negative on armR) lifts arms outward/up.
 */
function makeKid(THREE, { shirt, skin = 0xe8b48a, hair = 0x2b1b12, pants = 0x2f5d9b }) {
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

/** armL / armR are magnitudes (0 = hanging, ~2.5 = raised). */
function poseKid(kid, { walk = 0, phase = 0, armL = 0.12, armR = 0.12, headX = 0, t = 0 }) {
  const sw = Math.sin(phase) * walk;
  kid.legL.rotation.x = sw * 0.7;
  kid.legR.rotation.x = -sw * 0.7;
  kid.armL.rotation.x = -sw * 0.6;
  kid.armR.rotation.x = sw * 0.6;
  kid.armL.rotation.z = armL;
  kid.armR.rotation.z = -armR;
  kid.head.rotation.x = headX;
  kid.body.scale.y = 1 + 0.015 * Math.sin(t * 2.2);
}

// Aarav's walk path along z (the gate is at z = 0, school door near z = -5)
const aaravZ = (e) => {
  if (e < 6) return 5.5;
  if (e < 12) return lerp(5.5, 1.5, sseg(e, 6, 12));
  if (e < 30) return 1.5;
  return lerp(1.5, -3.2, sseg(e, 30, 35.5));
};

/* ------------------------------------------------------------------ */
/* init                                                                */
/* ------------------------------------------------------------------ */

function init(THREE, { scene }) {
  const world = new THREE.Group();
  scene.add(world);

  const DUSK = new THREE.Color(0x4a4f8c);
  const DAY = new THREE.Color(0xffe2a0);
  const bg = DUSK.clone();
  scene.background = bg;
  scene.fog = new THREE.Fog(DUSK.clone(), 9, 26);

  // Materials that brighten from "dull dusk" to "warm daylight" as the story progresses
  const tints = [];
  const tm = (dull, bright, extra = {}) => {
    const m = std(THREE, dull, extra);
    tints.push({ m, dull: new THREE.Color(dull), bright: new THREE.Color(bright) });
    return m;
  };
  const add = (o) => {
    world.add(o);
    return o;
  };
  const box = (w, h, d, m, x, y, z) => add(mesh(THREE, new THREE.BoxGeometry(w, h, d), m, x, y, z));

  /* ---- ground & path ---- */
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(80, 80), tm(0x2c3a5e, 0x86d46f));
  ground.rotation.x = -Math.PI / 2;
  add(ground);
  const pathM = tm(0x59597a, 0xeacb8c);
  box(1.8, 0.04, 15, pathM, 0, 0.03, 2.6);
  box(9, 0.04, 2.6, pathM, 0, 0.03, -4.2);

  /* ---- hills, sun, clouds ---- */
  const hillM = tm(0x3a4272, 0x7ec26a);
  [
    [-14, -16],
    [0, -21],
    [15, -17],
  ].forEach(([x, z]) => {
    const h = add(mesh(THREE, new THREE.IcosahedronGeometry(5, 0), hillM, x, -0.5, z));
    h.scale.set(1.4, 0.6, 1);
  });

  const sun = add(
    mesh(
      THREE,
      new THREE.SphereGeometry(1.6, 10, 8),
      std(THREE, 0xffe28a, { emissive: 0xffc83d, emissiveIntensity: 1, fog: false }),
      10,
      10,
      -20
    )
  );
  sun.scale.setScalar(0.001);

  const cloudM = tm(0x7a7fb0, 0xffffff);
  const clouds = [
    [-9, 10, -14],
    [3, 11.5, -16],
    [11, 9, -13],
  ].map(([x, y, z]) => {
    const g = new THREE.Group();
    g.position.set(x, y, z);
    [
      [0, 0, 1.2],
      [1.3, -0.15, 0.9],
      [-1.2, -0.1, 0.8],
    ].forEach(([cx, cy, r]) => g.add(mesh(THREE, new THREE.IcosahedronGeometry(r, 0), cloudM, cx, cy, 0)));
    add(g);
    return { g, baseX: x };
  });

  /* ---- gate, posts, walls ---- */
  const gateM = tm(0x2f2f45, 0x8a5a2b);
  const trimM = tm(0x6b6b88, 0xffd166);
  const wallM = tm(0x3b3f66, 0xe4c9a0);
  [-1, 1].forEach((s) => {
    box(0.36, 3.2, 0.36, gateM, s * 2.3, 1.6, 0);
    add(mesh(THREE, new THREE.SphereGeometry(0.25, 8, 6), trimM, s * 2.3, 3.4, 0));
    box(6.5, 1.2, 0.3, wallM, s * 5.75, 0.6, 0);
  });

  const makeLeaf = (s) => {
    // s = +1 -> right post (x > 0), leaf extends toward -x. s = -1 -> mirror.
    const pivot = new THREE.Group();
    pivot.position.set(s * 2.15, 0, 0);
    pivot.add(mesh(THREE, new THREE.BoxGeometry(2.0, 0.14, 0.14), gateM, -s * 1.0, 0.45, 0));
    pivot.add(mesh(THREE, new THREE.BoxGeometry(2.0, 0.14, 0.14), gateM, -s * 1.0, 2.65, 0));
    for (let i = 0; i < 6; i++) {
      const x = -s * (0.15 + i * 0.36);
      pivot.add(mesh(THREE, new THREE.BoxGeometry(0.08, 2.3, 0.08), gateM, x, 1.55, 0));
      pivot.add(mesh(THREE, new THREE.ConeGeometry(0.09, 0.25, 4), trimM, x, 2.83, 0));
    }
    add(pivot);
    return { pivot, s };
  };
  const leaves = [makeLeaf(-1), makeLeaf(1)];

  /* ---- padlock (grey-red -> gold) ---- */
  const lockMat = std(THREE, 0x8b8d99, { emissive: 0x7a2e3a, emissiveIntensity: 0.3 });
  const lockGroup = new THREE.Group();
  lockGroup.position.set(0, 1.65, 0.12);
  lockGroup.add(mesh(THREE, new THREE.BoxGeometry(0.9, 0.12, 0.14), std(THREE, 0x4a4a5e), 0, 0, 0));
  const lockSwing = new THREE.Group();
  lockGroup.add(lockSwing);
  const shackle = mesh(THREE, new THREE.TorusGeometry(0.17, 0.045, 6, 10, Math.PI), lockMat, 0, -0.2, 0);
  lockSwing.add(shackle);
  lockSwing.add(mesh(THREE, new THREE.BoxGeometry(0.55, 0.5, 0.22), lockMat, 0, -0.45, 0));
  lockSwing.add(mesh(THREE, new THREE.BoxGeometry(0.07, 0.16, 0.02), std(THREE, 0x222233), 0, -0.45, 0.12));
  add(lockGroup);

  /* ---- golden book-key ---- */
  const goldMat = std(THREE, 0xffc83d, { emissive: 0xffa800, emissiveIntensity: 0.8, roughness: 0.4, metalness: 0.3 });
  const darkGold = std(THREE, 0xd9961a, { emissive: 0x8a5a00, emissiveIntensity: 0.5 });
  const pagesMat = std(THREE, 0xfff4d6, { emissive: 0xffe9a8, emissiveIntensity: 0.4 });
  const keyGroup = new THREE.Group();
  keyGroup.add(mesh(THREE, new THREE.BoxGeometry(1.0, 1.3, 0.3), goldMat));
  keyGroup.add(mesh(THREE, new THREE.BoxGeometry(0.12, 1.3, 0.34), darkGold, -0.5, 0, 0));
  keyGroup.add(mesh(THREE, new THREE.BoxGeometry(0.06, 1.2, 0.26), pagesMat, 0.5, 0, 0));
  const emblem = mesh(
    THREE,
    starGeometry(THREE, 0.3, 0.13, 0.06),
    std(THREE, 0xfff3b0, { emissive: 0xffe08a, emissiveIntensity: 1.2 }),
    0.02,
    0.08,
    0.17
  );
  keyGroup.add(emblem);
  keyGroup.add(mesh(THREE, new THREE.TorusGeometry(0.2, 0.07, 6, 10), goldMat, 0, -0.95, 0));
  keyGroup.add(mesh(THREE, new THREE.CylinderGeometry(0.07, 0.07, 1.0, 8), goldMat, 0, -1.65, 0));
  keyGroup.add(mesh(THREE, new THREE.BoxGeometry(0.3, 0.12, 0.1), goldMat, 0.18, -1.95, 0));
  keyGroup.add(mesh(THREE, new THREE.BoxGeometry(0.22, 0.12, 0.1), goldMat, 0.15, -1.72, 0));
  const haloMat = std(THREE, 0xffd36a, {
    emissive: 0xffd36a,
    emissiveIntensity: 1,
    transparent: true,
    opacity: 0.15,
    depthWrite: false,
  });
  keyGroup.add(mesh(THREE, new THREE.SphereGeometry(1.25, 14, 10), haloMat, 0, -0.4, 0));
  const sparkleMat = std(THREE, 0xfff3b0, { emissive: 0xffe08a, emissiveIntensity: 1.4 });
  const sparkles = [];
  for (let i = 0; i < 8; i++) {
    const s = mesh(THREE, new THREE.OctahedronGeometry(0.08, 0), sparkleMat);
    keyGroup.add(s);
    sparkles.push(s);
  }
  keyGroup.visible = false;
  keyGroup.scale.setScalar(0.001);
  add(keyGroup);

  /* ---- golden light beam ---- */
  const beamMat = std(THREE, 0xffe08a, {
    emissive: 0xffd36a,
    emissiveIntensity: 1,
    transparent: true,
    opacity: 0,
    depthWrite: false,
    side: THREE.DoubleSide,
  });
  const beam = add(mesh(THREE, new THREE.CylinderGeometry(0.35, 1.5, 14, 16, 1, true), beamMat, 0, 7, 0.2));
  beam.visible = false;

  /* ---- dull "cost" coins ---- */
  const coinMat = std(THREE, 0x8e8f9c, { roughness: 0.9 });
  const coins = [
    [-3.8, 3.2, 1.8],
    [-2.0, 4.1, 2.2],
    [2.2, 3.6, 2.0],
    [3.9, 2.8, 1.6],
    [-0.8, 5.0, 1.4],
    [1.0, 4.4, 2.4],
  ].map(([x, y, z]) => {
    const holder = new THREE.Group();
    const c = mesh(THREE, new THREE.CylinderGeometry(0.35, 0.35, 0.07, 10), coinMat);
    c.rotation.x = Math.PI / 2;
    holder.add(c);
    holder.visible = false;
    add(holder);
    return { holder, x, y, z };
  });

  /* ---- school ---- */
  const SZ = -7;
  const schoolWall = tm(0x4c4f7a, 0xff9f6b);
  const schoolRoof = tm(0x3a3d66, 0xd9534f);
  box(7, 3.2, 3.6, schoolWall, 0, 1.6, SZ);
  box(2.4, 1.4, 2.6, schoolWall, 0, 3.9, SZ);
  const roof = add(mesh(THREE, new THREE.ConeGeometry(2.0, 1.5, 4), schoolRoof, 0, 5.35, SZ));
  roof.rotation.y = Math.PI / 4;
  box(1.1, 1.8, 0.12, tm(0x3a3a55, 0x8b5a2b), 0, 0.9, SZ + 1.86);
  box(1.8, 0.15, 0.6, tm(0x55557a, 0xd8c8a8), 0, 0.075, SZ + 2.1);
  const windowMat = tm(0x6b6fa0, 0xfff1a8, { emissive: 0xffe08a, emissiveIntensity: 0.05 });
  [-2.8, -1.6, 1.6, 2.8].forEach((x) => box(0.75, 0.85, 0.1, windowMat, x, 1.9, SZ + 1.83));
  const clock = add(mesh(THREE, new THREE.CylinderGeometry(0.45, 0.45, 0.1, 12), windowMat, 0, 3.9, SZ + 1.33));
  clock.rotation.x = Math.PI / 2;

  // flag (tricolour stripes) on the left roof corner
  add(mesh(THREE, new THREE.CylinderGeometry(0.04, 0.04, 2.0, 6), trimM, -2.7, 4.2, SZ));
  const flag = new THREE.Group();
  flag.position.set(-2.7, 4.9, SZ);
  [
    [0.17, 0x8a5a2a, 0xff9933],
    [0, 0x9a9ab0, 0xffffff],
    [-0.17, 0x2a5a3a, 0x138808],
  ].forEach(([y, dull, bright]) => flag.add(mesh(THREE, new THREE.BoxGeometry(0.9, 0.17, 0.03), tm(dull, bright), 0.45, y, 0)));
  add(flag);

  /* ---- trees ---- */
  const trunkM = tm(0x4a3a40, 0x8b5a2b);
  const leafM = tm(0x2d4a5e, 0x3fa34d);
  [
    [-6.5, -2.5, 1],
    [7, -3, 1.1],
    [-9, -9, 1.3],
    [9.5, -10, 1.2],
    [-4.5, -11, 1],
    [5, -12, 1.2],
    [-7.5, 2.5, 0.9],
    [7.5, 3, 0.9],
  ].forEach(([x, z, s]) => {
    const t = new THREE.Group();
    t.position.set(x, 0, z);
    t.scale.setScalar(s);
    t.add(mesh(THREE, new THREE.CylinderGeometry(0.18, 0.24, 1.0, 6), trunkM, 0, 0.5, 0));
    t.add(mesh(THREE, new THREE.ConeGeometry(1.0, 2.4, 7), leafM, 0, 2.1, 0));
    t.add(mesh(THREE, new THREE.ConeGeometry(0.75, 1.6, 7), leafM, 0, 3.2, 0));
    add(t);
  });

  /* ---- characters ---- */
  const aarav = makeKid(THREE, { shirt: 0xff6b3d, skin: 0xd9a066, hair: 0x1f1410, pants: 0x2f5d9b });
  aarav.group.position.set(0, 0, 5.5);
  aarav.group.rotation.y = Math.PI;
  add(aarav.group);

  const friendDefs = [
    { shirt: 0xf06292, skin: 0xf1c27d, hair: 0x3b2314, pos: [-2.0, -3.7] },
    { shirt: 0x26a69a, skin: 0xc68642, hair: 0x1a1a1a, pos: [2.0, -3.7] },
    { shirt: 0x9575cd, skin: 0x8d5524, hair: 0x120d0a, pos: [-4.0, -4.5] },
    { shirt: 0xffd54f, skin: 0xe0ac69, hair: 0x4a2c17, pos: [4.0, -4.5] },
  ];
  const friends = friendDefs.map((d) => {
    const k = makeKid(THREE, { shirt: d.shirt, skin: d.skin, hair: d.hair, pants: 0x3d4a8a });
    k.group.position.set(d.pos[0], 0, d.pos[1]);
    k.group.visible = false;
    k.group.scale.setScalar(0.001);
    add(k.group);
    return k;
  });

  /* ---- floating books (flapping) ---- */
  const bookSpots = [
    [-5.2, 3.4, -3.0],
    [-3.4, 5.0, -4.0],
    [3.4, 4.8, -4.0],
    [5.2, 3.2, -3.0],
    [-1.0, 7.4, -3.5],
  ];
  const books = [0xe63946, 0x2a9d8f, 0x4361ee, 0xf4a261, 0x9b5de5].map((c, i) => {
    const g = new THREE.Group();
    const m = std(THREE, c, { emissive: c, emissiveIntensity: 0.25 });
    const cream = std(THREE, 0xfff4d6, { emissive: 0xffe9a8, emissiveIntensity: 0.2 });
    g.add(mesh(THREE, new THREE.BoxGeometry(0.08, 0.06, 0.8), m));
    const wing = (s) => {
      const p = new THREE.Group();
      p.position.set(s * 0.04, 0, 0);
      p.add(mesh(THREE, new THREE.BoxGeometry(0.62, 0.05, 0.8), m, s * 0.31, 0, 0));
      p.add(mesh(THREE, new THREE.BoxGeometry(0.56, 0.02, 0.74), cream, s * 0.31, 0.03, 0));
      g.add(p);
      return p;
    };
    const wingR = wing(1);
    const wingL = wing(-1);
    g.position.set(...bookSpots[i]);
    g.visible = false;
    add(g);
    return { g, wingL, wingR, base: bookSpots[i] };
  });

  /* ---- orbiting stars over the school ---- */
  const starGeo = starGeometry(THREE, 0.3, 0.13, 0.08);
  const starMat = std(THREE, 0xffd84d, { emissive: 0xffc107, emissiveIntensity: 1.1 });
  const stars = [];
  for (let i = 0; i < 10; i++) {
    const s = mesh(THREE, starGeo, starMat);
    s.visible = false;
    add(s);
    stars.push(s);
  }

  /* ---- celebration starburst ---- */
  const burstMat = std(THREE, 0xfff3b0, { emissive: 0xffe08a, emissiveIntensity: 1.3 });
  const burst = [];
  for (let i = 0; i < 18; i++) {
    const s = mesh(THREE, new THREE.OctahedronGeometry(0.12, 0), burstMat);
    s.visible = false;
    add(s);
    burst.push(s);
  }

  return {
    scene,
    world,
    bg,
    DUSK,
    DAY,
    tints,
    windowMat,
    sun,
    clouds,
    leaves,
    lockGroup,
    lockSwing,
    shackle,
    lockMat,
    keyGroup,
    goldMat,
    haloMat,
    sparkles,
    beam,
    beamMat,
    coins,
    flag,
    aarav,
    friends,
    books,
    stars,
    burst,
    cLockStart: new THREE.Color(0x8b8d99),
    cLockEnd: new THREE.Color(0xffc83d),
    eLockStart: new THREE.Color(0x7a2e3a),
    eLockEnd: new THREE.Color(0xffb000),
  };
}

/* ------------------------------------------------------------------ */
/* animate                                                             */
/* ------------------------------------------------------------------ */

function animate(THREE, { elapsed, refs }) {
  const e = elapsed;
  const R = refs;

  /* ---- mood: dull dusk -> warm daylight ---- */
  const k = 0.12 * sseg(e, 14, 22) + 0.5 * sseg(e, 26, 31) + 0.38 * sseg(e, 30, 37);
  R.bg.lerpColors(R.DUSK, R.DAY, k);
  R.scene.fog.color.copy(R.bg);
  R.scene.fog.near = lerp(9, 24, k);
  R.scene.fog.far = lerp(26, 70, k);
  R.tints.forEach((t) => t.m.color.lerpColors(t.dull, t.bright, k));
  R.windowMat.emissiveIntensity = 0.05 + 0.95 * k;
  R.sun.scale.setScalar(Math.max(0.001, sseg(e, 28, 36)));
  R.clouds.forEach((c, i) => {
    c.g.position.x = c.baseX + Math.sin(e * 0.2 + i * 2) * 2;
  });
  R.flag.rotation.y = Math.sin(e * 3) * 0.25;

  /* ---- gentle "camera" moves (world group) ---- */
  const pull = sseg(e, 40, 48);
  R.world.position.set(0, -1.6 * pull, 1.2 * sseg(e, 0, 6) - 1.8 * pull);
  R.world.rotation.x = 0.1 * pull;

  /* ---- golden beam ---- */
  const beamA = 0.38 * sseg(e, 14, 16) * (1 - sseg(e, 24, 28));
  R.beam.visible = beamA > 0.001;
  R.beamMat.opacity = beamA * (0.85 + 0.15 * Math.sin(e * 3));

  /* ---- golden book-key ---- */
  const kg = R.keyGroup;
  kg.visible = e >= 14;
  let ky;
  if (e < 21) ky = lerp(11, 4.6, sseg(e, 14, 21));
  else if (e < 24) ky = lerp(4.6, 3.2, sseg(e, 21, 24));
  else if (e < 29) ky = 3.2;
  else if (e < 36) ky = lerp(3.2, 3.9, sseg(e, 29, 31));
  else ky = lerp(3.9, 7.6, sseg(e, 36, 41));
  ky += 0.12 * Math.sin(e * 2) * sseg(e, 29, 31) * (1 - sseg(e, 36, 38));
  const kz = lerp(0.26, -6.5, sseg(e, 36, 41));
  kg.position.set(0, ky, kz);
  kg.scale.setScalar(Math.max(0.001, 0.8 * sseg(e, 14, 15.5) + 0.6 * sseg(e, 36, 41)));
  kg.rotation.y =
    Math.PI * 4 * (1 - sseg(e, 14, 24)) +
    (Math.PI / 2) * sseg(e, 25, 26.5) -
    (Math.PI / 2) * sseg(e, 29, 31) +
    0.5 * Math.max(0, e - 36);
  R.goldMat.emissiveIntensity = 0.7 + 0.4 * Math.sin(e * 5);
  R.haloMat.opacity = 0.14 + 0.06 * Math.sin(e * 4);
  R.sparkles.forEach((s, i) => {
    const a = e * 2 + (i * Math.PI * 2) / R.sparkles.length;
    s.position.set(Math.cos(a) * 1.1, -0.4 + Math.sin(e * 3 + i) * 0.5, Math.sin(a) * 0.7);
    s.scale.setScalar(0.6 + 0.4 * Math.sin(e * 6 + i));
    s.rotation.y = e * 2 + i;
  });

  /* ---- padlock: sway, unlock, fall ---- */
  const unlock = sseg(e, 26.4, 27.2);
  R.lockMat.color.lerpColors(R.cLockStart, R.cLockEnd, unlock);
  R.lockMat.emissive.lerpColors(R.eLockStart, R.eLockEnd, unlock);
  R.lockMat.emissiveIntensity = lerp(0.3, 0.9, unlock);
  R.shackle.position.y = -0.2 + 0.18 * sseg(e, 26.8, 27.6);
  R.lockSwing.rotation.z = (1 - unlock) * 0.07 * Math.sin(e * 2.2) + 0.05 * Math.sin(e * 22) * seg(e, 25, 26.4) * (1 - unlock);
  const fall = seg(e, 27.4, 28.9);
  R.lockGroup.position.y = 1.65 - 4 * fall * fall;
  R.lockGroup.rotation.z = 2.2 * fall;
  R.lockGroup.scale.setScalar(Math.max(0.001, 1 - sseg(e, 28.6, 29.3)));
  R.lockGroup.visible = e < 29.4;

  /* ---- gate leaves swing open ---- */
  const open = 1.55 * sseg(e, 27.2, 29.8);
  R.leaves.forEach((l) => {
    l.pivot.rotation.y = -l.s * open;
  });

  /* ---- coins (obstacles) drift in, then vanish with the light ---- */
  R.coins.forEach((c, i) => {
    const vis = sseg(e, 6 + i * 0.3, 7 + i * 0.3) * (1 - sseg(e, 14, 15.5));
    c.holder.visible = vis > 0.01;
    c.holder.scale.setScalar(Math.max(0.001, vis));
    c.holder.position.set(c.x + Math.sin(e * 0.9 + i) * 0.5, c.y + Math.sin(e * 1.3 + i * 1.7) * 0.25, c.z);
    c.holder.rotation.y = e * 1.5 + i;
  });

  /* ---- Aarav ---- */
  const A = R.aarav;
  const z = aaravZ(e);
  const speed = Math.abs(aaravZ(e + 0.05) - aaravZ(e - 0.05)) / 0.1;
  const walk = clamp01(speed / 0.35);
  const phase = (5.5 - z) * 4.2;

  const cheer1 = Math.sin(Math.PI * seg(e, 28, 30)); // joy when the gate opens
  const wave = sseg(e, 36.8, 37.4) * (1 - sseg(e, 39.6, 40));
  const finalCheer = sseg(e, 40, 41);

  let aL = 0.12;
  let aR = 0.12;
  aL = lerp(aL, 2.4 + 0.25 * Math.sin(e * 8), cheer1);
  aR = lerp(aR, 2.4 + 0.25 * Math.sin(e * 8 + 1), cheer1);
  aL = lerp(aL, 2.6 + 0.35 * Math.sin(e * 9), wave);
  aL = lerp(aL, 2.5 + 0.3 * Math.sin(e * 7), finalCheer);
  aR = lerp(aR, 2.5 + 0.3 * Math.sin(e * 7 + 1), finalCheer);

  const headX =
    0.45 * sseg(e, 12, 13.5) - 0.8 * sseg(e, 14.5, 16.5) + 0.35 * sseg(e, 28, 30);
  poseKid(A, { walk, phase, armL: aL, armR: aR, headX, t: e });

  const hop = 0.28 * Math.sin(Math.PI * seg(e, 28.3, 29.5)) + finalCheer * 0.3 * Math.abs(Math.sin(e * 4));
  A.group.position.set(0, hop + Math.abs(Math.sin(phase)) * 0.06 * walk, z);
  A.group.rotation.y = Math.PI * (1 - sseg(e, 35.5, 37.5));

  /* ---- friends pop in, wave, then cheer ---- */
  R.friends.forEach((f, i) => {
    const t0 = 31 + i;
    f.group.visible = e >= t0;
    f.group.scale.setScalar(pop(e, t0));
    const w = sseg(e, t0 + 0.8, t0 + 1.5) * (1 - finalCheer);
    let fl = 0.12;
    let fr = 0.12;
    if (i % 2 === 0) fl = lerp(0.12, 2.5 + 0.3 * Math.sin(e * 8 + i), w);
    else fr = lerp(0.12, 2.5 + 0.3 * Math.sin(e * 8 + i), w);
    fl = lerp(fl, 2.5 + 0.3 * Math.sin(e * 7 + i), finalCheer);
    fr = lerp(fr, 2.5 + 0.3 * Math.sin(e * 7 + i + 1), finalCheer);
    poseKid(f, { armL: fl, armR: fr, t: e + i });
    f.group.position.y = finalCheer * 0.3 * Math.abs(Math.sin(e * 4 + i * 0.9));
  });

  /* ---- floating, flapping books ---- */
  R.books.forEach((b, i) => {
    const t0 = 30 + i * 0.4;
    b.g.visible = e >= t0;
    b.g.scale.setScalar(pop(e, t0));
    b.g.position.set(b.base[0], b.base[1] + Math.sin(e * 1.5 + i) * 0.3, b.base[2]);
    b.g.rotation.y = Math.sin(e * 0.8 + i) * 0.5;
    const flap = 0.5 + 0.45 * Math.sin(e * 5 + i);
    b.wingR.rotation.z = flap;
    b.wingL.rotation.z = -flap;
  });

  /* ---- orbiting stars over the school ---- */
  R.stars.forEach((s, i) => {
    const t0 = 30.5 + i * 0.2;
    s.visible = e >= t0;
    const a = e * 0.7 + (i * Math.PI * 2) / R.stars.length;
    s.position.set(Math.cos(a) * 3.8, 6.2 + Math.sin(a * 2 + i) * 0.8, -6.5 + Math.sin(a) * 2.0);
    s.rotation.y = e * 1.5 + i;
    s.scale.setScalar(pop(e, t0) * (0.9 + 0.2 * Math.sin(e * 4 + i)));
  });

  /* ---- starburst when the children cheer ---- */
  R.burst.forEach((s, i) => {
    const p = seg(e, 40.5 + i * 0.01, 44.5 + i * 0.01);
    s.visible = p > 0 && p < 1;
    if (!s.visible) return;
    const th = (i / R.burst.length) * Math.PI * 2;
    const r = 6 * (1 - Math.pow(1 - p, 2));
    s.position.set(Math.cos(th) * r * 0.9, 4 + Math.sin(th) * r * 0.7, -3.5 + Math.sin(th * 2) * 0.8);
    s.rotation.y = e * 3 + i;
    s.rotation.x = e * 2 + i;
    s.scale.setScalar(Math.max(0.001, 0.5 + 1.2 * Math.sin(Math.PI * p)));
  });
}

export default {
  duration: DURATION,
  captions,
  init,
  animate,
};