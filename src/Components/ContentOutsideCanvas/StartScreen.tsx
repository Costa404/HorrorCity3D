interface StartScreenProps {
  onStart: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  return (
    <div className="d-flex justify-content-center align-items-center">
      <button className="p-5 btn btn-primary" onClick={onStart}>
        Play
      </button>
    </div>
  );
};

export default StartScreen;
