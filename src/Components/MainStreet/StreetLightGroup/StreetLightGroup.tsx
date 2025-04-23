import StreetLight from "./StreetLight";

const StreetLightGroup = () => {
  return (
    <group>
      {/* <StreetLight position={[-50, 0, -5]} />
      <StreetLight position={[0, 0, -5]} />
      <StreetLight position={[-90, 0, -5]} />
      <StreetLight position={[-90, 0, 25]} />
      <StreetLight position={[-90, 0, 50]} />
      <StreetLight position={[-90, 0, 75]} rotation={[0, Math.PI, 0]} /> */}
    </group>
  );
};

export default StreetLightGroup;

// criamos este compoente para agrupar os StreetLights, assim podemos adicionar mais "lampioes" facilmente no futuro.
