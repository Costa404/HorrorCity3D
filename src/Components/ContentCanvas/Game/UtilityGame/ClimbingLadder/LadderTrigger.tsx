import { RigidBody } from "@react-three/rapier";
import { useClimbingLadderStore } from "./useClimbingLadderStore";
import { Vector3 } from "@react-three/fiber";

type LadderZoneTriggerProps = {
  position?: Vector3;
  type: "top" | "bottom";
};

export const LadderZoneTrigger = ({
  position = [0, 0, 0],
  type,
}: LadderZoneTriggerProps) => {
  const setLadderZoneType = useClimbingLadderStore((s) => s.setLadderZoneType);

  const setIsInsideTrigger = useClimbingLadderStore(
    (s) => s.setIsInsideTrigger
  );

  return (
    <>
      <RigidBody
        type="fixed"
        sensor
        onIntersectionEnter={({ other }) => {
          if (other.rigidBodyObject?.name === "player") {
            setIsInsideTrigger(true);
            setLadderZoneType(type); // Atualiza a zona quando o jogador entra
          }
        }}
        onIntersectionExit={({ other }) => {
          if (other.rigidBodyObject?.name === "player") {
            setIsInsideTrigger(false);
            setLadderZoneType(null); // Reset a zona quando o jogador sai
          }
        }}
      >
        <mesh position={position}>
          <boxGeometry args={[3, 3, 3]} />
          <meshBasicMaterial
            color={type === "bottom" ? "green" : "red"}
            transparent
          />
        </mesh>
      </RigidBody>
    </>
  );
};
