// @source: babylon js docs. code of babylonjs-hook package
import { useEffect, useRef } from "react";
import { Engine, Scene } from "@babylonjs/core";
import styles from './scene.module.css'

// @ts-ignore
export const BabylonScene = ({ antialias, engineOptions, adaptToDeviceRatio, sceneOptions, onRender, onPointerDown, onSceneReady, ...rest }) => {
  const reactCanvas = useRef(null);

  // set up basic engine and scene
  useEffect(() => {
    const { current: canvas } = reactCanvas;

    if (!canvas) return;

    canvas.addEventListener("pointerdown", onPointerDown, false);
    const engine = new Engine(canvas, antialias, {stencil: true, ...engineOptions}, adaptToDeviceRatio);
    const scene = new Scene(engine, sceneOptions);
    if (scene.isReady()) {
      onSceneReady(scene);
    } else {
      scene.onReadyObservable.addOnce((scene) => onSceneReady(scene));
    }

    engine.runRenderLoop(() => {
      if (typeof onRender === "function") onRender(scene);
      scene.render();
    });

    const resize = () => {
      scene.getEngine().resize();
    };

    if (window) {
      window.addEventListener("resize", resize);
    }

    return () => {
      scene.getEngine().dispose();

      if (window) {
        window.removeEventListener("resize", resize);
      }
      
      canvas.removeEventListener("pointerdown", onPointerDown);

    };
  }, [antialias, engineOptions, adaptToDeviceRatio, sceneOptions, onRender, onSceneReady, onPointerDown]);

  return <canvas className={styles.babylonCanvas} ref={reactCanvas} {...rest} />;
};