import MyCity from "./ContentCanvas/MyCity";
import ContentOutsideCanvas from "./ContentOutsideCanvas/ContentOutsideCanvas";

const GameScene = () => {
  return (
    <>
      <div>
        <MyCity />
        <ContentOutsideCanvas />
      </div>
    </>
  );
};

export default GameScene;
