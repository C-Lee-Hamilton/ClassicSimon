import { useState } from "react";
import RedNoise from "../audio/RedNoise.mp3";
import BlueNoise from "../audio/BlueNoise.mp3";
import YellowNoise from "../audio/YellowNoise.mp3";
import GreenNoise from "../audio/GreenNoise.mp3";
function Light(props) {
  const {
    color,
    hovercolor,
    borderRadius,
    playerMove,
    setPlayerMove,
    onOff,
    compPlaying,
  } = props;
  const [active, setActive] = useState(true);
  //audio
  const [RedAudio] = useState(new Audio(RedNoise));
  const [BlueAudio] = useState(new Audio(BlueNoise));
  const [YellowAudio] = useState(new Audio(YellowNoise));
  const [GreenAudio] = useState(new Audio(GreenNoise));

  const playSound = () => {
    if (color === "red") {
      RedAudio.play();
    } else if (color === "blue") {
      BlueAudio.play();
    } else if (color === "yellow") {
      YellowAudio.play();
    } else {
      GreenAudio.play();
    }
  };
  const activeset = () => {
    active === true ? setActive(false) : setActive(true);
  };
  const playerMover = () => {
    if (onOff && !compPlaying) {
      setPlayerMove([...playerMove, color]);
      playSound();
    }
  };

  return (
    <div className="light">
      <button
        className="lightButton"
        style={{
          backgroundColor: active ? color : hovercolor,
          borderRadius: borderRadius,
        }}
        onMouseDown={activeset}
        onMouseUp={activeset}
        onClick={playerMover}
      ></button>
    </div>
  );
}

export default Light;
