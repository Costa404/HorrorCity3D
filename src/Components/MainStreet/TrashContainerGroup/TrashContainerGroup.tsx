import TrashContainer from "./TrashContainer";

const TrashContainerGroup = () => {
  return (
    <group>
      <TrashContainer position={[-50, 0, -50]} />

      <TrashContainer position={[10, 0, 0]} />
      <TrashContainer position={[-98, 0, 50]} />
    </group>
  );
};

export default TrashContainerGroup;

// criamos este compoente para agrupar os trashContainers, assim podemos adicionar mais containers de lixo facilmente no futuro.
