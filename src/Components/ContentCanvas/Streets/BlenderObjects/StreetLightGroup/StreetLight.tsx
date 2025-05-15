import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { useMemo } from "react";
import { useStreetLightPosition } from "./useStreetLightPos";
import { useRandomLightState } from "./useRandomLightState";

interface StreetLightProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
}

const StreetLight = ({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
}: StreetLightProps) => {
  const { scene } = useGLTF("src/assets/light.glb");

  // Clonar o objeto para não modificar a instância original
  const clonedScene = useMemo(() => scene.clone(), [scene]);

  // Usar o hook de luzes aleatórias
  // const lightsOn = useRandomLightState();

  // Usar o hook de atualização de posição da luz
  const groupRef = useStreetLightPosition(clonedScene);

  return (
    <RigidBody position={position} type="fixed" colliders="cuboid">
      <group ref={groupRef} rotation={rotation}>
        <primitive object={clonedScene} />
        <pointLight
          // intensity={lightsOn ? 100 : 0} // Controla intensidade das luzes sincronizadamente
          intensity={100}
          distance={0}
          decay={2.5}
          color="#ffffff"
          position={[0, 3, -4]}
        />
        <pointLight
          // intensity={lightsOn ? 100 : 0} // Controla intensidade das luzes sincronizadamente
          intensity={100}
          distance={0}
          decay={10}
          color="#ffffff"
          position={[0, 10, -4]}
        />
      </group>
    </RigidBody>
  );
};

export default StreetLight;
