// import { RapierRigidBody } from "@react-three/rapier";
// import { Vector3 } from "three";

// /**
//  * Hook responsável por fazer o inimigo se mover em direção à posição alvo (ex: personagem principal).
//  */
// export const useEnemyMovement = () => {
//   const speed = 10;

//   /**
//    * moveEnemy - Atualiza a velocidade do corpo físico para seguir o alvo.
//    * @param enemyBody Corpo físico do inimigo (Rapier)
//    * @param targetPosition Posição atual do personagemprincipal (Vector3)
//    */
//   const moveEnemy = (enemyBody: RapierRigidBody, targetPosition: Vector3) => {
//     if (!enemyBody || !targetPosition) return;

//     // Posição atual do inimigo
//     const enemyPosition = enemyBody.translation();

//     // Calcula a direção do alvo (targetPosition - enemyPosition)
//     const direction = new Vector3(
//       targetPosition.x - enemyPosition.x,
//       0, // ignoramos altura por enquanto
//       targetPosition.z - enemyPosition.z
//     );

//     // Se direção for muito pequena, não faz nada
//     if (direction.lengthSq() < 0.01) return;

//     // Normaliza a direção e multiplica pela velocidade
//     direction.normalize().multiplyScalar(speed);

//     // Aplica a velocidade linear no corpo do inimigo
//     enemyBody.setLinvel(
//       { x: direction.x, y: enemyBody.linvel().y, z: direction.z },
//       true
//     );
//   };

//   return {
//     moveEnemy,
//   };
// };
