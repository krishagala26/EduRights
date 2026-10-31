import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import './ModuleAnimation.css';

export default function ModuleAnimation({ scene: sceneModule, onComplete }) {
  const mountRef = useRef(null);
  const frameRef = useRef(null);
  const onCompleteRef = useRef(onComplete);
  const [progress, setProgress] = useState(0);
  const [captionText, setCaptionText] = useState('');

  // Keep the latest onComplete without re-running the whole Three.js setup
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount || !sceneModule) return undefined;

    let finished = false;

    const width = mount.clientWidth || 640;
    const height = mount.clientHeight || Math.round(width * (9 / 16));

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.set(0, 4, 13);
    camera.lookAt(0, 1, 0);

    scene.add(new THREE.AmbientLight(0xffffff, 0.75));
    const directional = new THREE.DirectionalLight(0xffffff, 0.8);
    directional.position.set(5, 8, 5);
    scene.add(directional);

    // Let the scene script build its own objects and hand back refs it
    // needs to animate later.
    const refs = sceneModule.init(THREE, { scene, camera });

    const clock = new THREE.Clock();

    const resizeObserver = new ResizeObserver(() => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      if (!w || !h) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    });
    resizeObserver.observe(mount);

    const finish = () => {
      if (finished) return;
      finished = true;
      onCompleteRef.current?.();
    };

    const tick = () => {
      const elapsed = clock.getElapsedTime();
      const delta = clock.getDelta();

      sceneModule.animate(THREE, { scene, camera, elapsed, delta, refs });

      const active = sceneModule.captions.find(
        (c) => elapsed >= c.start && elapsed < c.end
      );
      setCaptionText(active ? active.text : '');
      setProgress(Math.min(100, (elapsed / sceneModule.duration) * 100));

      renderer.render(scene, camera);

      if (elapsed >= sceneModule.duration) {
        setProgress(100);
        finish();
        return;
      }
      frameRef.current = requestAnimationFrame(tick);
    };
    frameRef.current = requestAnimationFrame(tick);

    return () => {
      finished = true;
      cancelAnimationFrame(frameRef.current);
      resizeObserver.disconnect();

      scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
          mats.forEach((m) => m.dispose());
        }
      });
      renderer.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
    // sceneModule is expected to be a stable, module-level object
    // (ChildLabourScene / InternetSafetyScene), not re-created on render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sceneModule]);

  const handleSkip = () => {
    cancelAnimationFrame(frameRef.current);
    onCompleteRef.current?.();
  };

  const secondsLeft = sceneModule
    ? Math.max(0, Math.ceil(sceneModule.duration * (1 - progress / 100)))
    : 0;

  return (
    <div className="module-animation">
      <div className="module-animation__canvas" ref={mountRef} />

      <span className="module-animation__tag">
        <i className="module-animation__dot" aria-hidden="true" />
        Now playing
      </span>

      {captionText && (
        <div className="module-animation__caption" aria-live="polite">
          {captionText}
        </div>
      )}

      <div className="module-animation__footer">
        <div
          className="module-animation__progress-track"
          role="progressbar"
          aria-label="Animation progress"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progress)}
        >
          <div
            className="module-animation__progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="module-animation__time">{secondsLeft}s</span>
        <button type="button" className="module-animation__skip" onClick={handleSkip}>
          Skip ⏭
        </button>
      </div>
    </div>
  );
}