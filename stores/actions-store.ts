import { MeshBuilder, Color3 } from '@babylonjs/core';
import { create } from 'zustand'

export const useActionsStore = create((set, get) => ({
  scene: null,
  hl: null,
  addCube: () => {
    // Our built-in 'box' shape.
    const scene = get().scene
    const hl = get().hl
    const box = MeshBuilder.CreateBox("box", { size: 2 }, scene);
    // Move the box upward 1/2 its height
    box.position.y = 5;

    box.rotation.y = 1;
    
    hl.removeAllMeshes();
    hl.addMesh(box, Color3.Blue())
  }
}))