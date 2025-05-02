import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { GLTF } from "three-stdlib";
import { Object3D } from "three";
// @ts-expect-error: SkeletonUtils does not have type definitions
import { clone } from "three/examples/jsm/utils/SkeletonUtils";
import { useMemo } from "react";

type GLTFResult = GLTF & {
  nodes: { [key: string]: Object3D };
  materials: { [key: string]: any };
};

export const useEnemyModel = (modelPath: string, enemyId: string) => {
  const { scene, animations } = useGLTF(modelPath) as GLTFResult;

  const clonedScene = useMemo(() => {
    const cloneScene = clone(scene);

    cloneScene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.userData.enemyId = enemyId;
      }
    });

    return cloneScene;
  }, [scene]);

  return { scene, clonedScene, animations };
};
