import { MeshBuilder, Color3 } from '@babylonjs/core';
import { create } from 'zustand'

export const useActionsStore = create((set, get) => ({
  scene: null,
  hl: null,
  selectedMesh: null,
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
  },
  selectMesh: () => {
    const scene = get().scene
    var pickInfo = scene.pick(scene.pointerX, scene.pointerY, mesh => mesh.id !== "ground")
    const selectedMesh = pickInfo.pickedMesh
    if (!selectedMesh) return;
    set({ selectedMesh })
    const hl = get().hl

    hl.removeAllMeshes();
    hl.addMesh(selectedMesh, Color3.Blue())

  }
}))