import React, { useState } from "react";
import soundFile from "../audio/loseNoise.wav";
function SoundButton(props) {
  const { lose } = props;
  const [audio] = useState(new Audio(soundFile));

  const playSound = () => {
    audio.play();
  };

  return (
    <div>
      <h1 className={!lose ? "loser" : "loser2"} onchange={playSound}>
        You Lose!
      </h1>
    </div>
  );
}

export default SoundButton;
