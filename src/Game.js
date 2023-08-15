import "./App.css";
import Light from "./components/light";
import ScoreBoard from "./components/scoreBoard";
import { useState, useEffect } from "react";
import { Link } from "wouter";
import loseSoundFile from "./audio/loseNoise.wav";
import RedNoise from "./audio/RedNoise.mp3";
import BlueNoise from "./audio/BlueNoise.mp3";
import YellowNoise from "./audio/YellowNoise.mp3";
import GreenNoise from "./audio/GreenNoise.mp3";

function Game() {
  const [onOff, setOnOff] = useState(false);
  //random color moves
  const colors = ["red", "blue", "yellow", "green"];
  //moves
  const [compMove, setCompMove] = useState([]); //computer move
  const [playerMove, setPlayerMove] = useState([]);
  const [compPlaying, setCompPlaying] = useState(false);
  //scoring
  const [score, setScore] = useState(0);
  const [highScore, setHighscore] = useState(0);
  //sounds
  const [lose, setLose] = useState(false);
  const [RedAudio] = useState(new Audio(RedNoise));
  const [BlueAudio] = useState(new Audio(BlueNoise));
  const [YellowAudio] = useState(new Audio(YellowNoise));
  const [GreenAudio] = useState(new Audio(GreenNoise));
  const [audio] = useState(new Audio(loseSoundFile));
  const playSound = () => {
    audio.play();
  };
  const lightColors = {
    red: ["red", "lightpink"],
    blue: ["blue", "lightblue"],
    green: ["green", "lightgreen"],
    yellow: ["yellow", "lightgoldenrodyellow"],
  };

  const [lights, setLights] = useState({
    red: "red",
    blue: "blue",
    green: "green",
    yellow: "yellow",
  });

  const delay = () => {
    return new Promise((resolve) => setTimeout(resolve, 1000));
  };

  const compTurn = async () => {
    const color = colors[Math.floor(Math.random() * colors.length)];
    setCompPlaying(true);

    await delay();
    setCompMove([...compMove, color]);
    setPlayerMove([]);

    for (const move of compMove) {
      setLights({
        ...lights,
        [move]: lightColors[move][1],
      });
      const playColorSound = () => {
        if (move === "red") {
          RedAudio.play();
        } else if (move === "blue") {
          BlueAudio.play();
        } else if (move === "yellow") {
          YellowAudio.play();
        } else {
          GreenAudio.play();
        }
      };
      playColorSound();
      await delay();

      setLights({
        ...lights,
        [color]: lightColors[color][0],
      });

      await delay();
    }

    setCompPlaying(false);
  };

  useEffect(() => {
    if (playerMove.length > 0) {
      if (
        playerMove[playerMove.length - 1] === compMove[playerMove.length - 1]
      ) {
        console.log("keep going");
        setLose(false);
        setScore(playerMove.length);
        score > highScore ? setHighscore(score) : console.log("");
      } else {
        console.log("Try Again");
        setOnOff(false);
        setLose(true);
        setCompMove([]);
        playSound();
      }
    }
  }, [playerMove]);

  useEffect(() => {
    if (onOff) {
      compTurn();
      setLose(false);
    } else {
      setHighscore(score);
      setScore(0);
      setCompMove([]);
      setPlayerMove([]);
      setLights({
        red: "red",
        blue: "blue",
        green: "green",
        yellow: "yellow",
      });
    }
  }, [onOff]);

  useEffect(() => {
    if (compMove.length === playerMove.length + 1 && !compPlaying) {
      compTurn();
      // setScore(playerMove.length);
      // score > highScore ? setHighscore(score ) : console.log("");
    }
  }, [playerMove, compMove]);

  //
  const centerButtonColorPress = () => {
    setOnOff(!onOff);
  };

  return (
    <div className="App">
      <ScoreBoard score={score} highScore={highScore} />

      <div className="gameboard">
        <div className="gameboardHalf">
          <Light
            borderRadius="100% 0% 0% 0%"
            color={lights.red}
            hovercolor={!onOff ? "red" : "lightpink"}
            playerMove={playerMove}
            setPlayerMove={setPlayerMove}
            onOff={onOff}
            compPlaying={compPlaying}
          />
          <Light
            borderRadius="0% 100% 0% 0%"
            color={lights.blue}
            hovercolor={!onOff ? "blue" : "lightblue"}
            playerMove={playerMove}
            setPlayerMove={setPlayerMove}
            onOff={onOff}
            compPlaying={compPlaying}
          />
        </div>

        <div className="gameboardHalf">
          <Light
            borderRadius="0% 0% 0% 100%"
            color={lights.yellow}
            hovercolor={!onOff ? "yellow" : "lightgoldenrodyellow"}
            playerMove={playerMove}
            setPlayerMove={setPlayerMove}
            onOff={onOff}
            compPlaying={compPlaying}
          />
          <Light
            borderRadius="0% 0% 100% 0%"
            color={lights.green}
            hovercolor={!onOff ? "green" : "lightgreen"}
            playerMove={playerMove}
            setPlayerMove={setPlayerMove}
            onOff={onOff}
            compPlaying={compPlaying}
          />
          <button className="startButton" onClick={centerButtonColorPress}>
            <h1
              className="centerLogo"
              style={{
                color: onOff ? "rgb(255, 63, 63)" : "darkred",
                textShadow: onOff ? "red 1px 0 10px" : "",
              }}
            >
              Simon
            </h1>
            {!onOff && <>Click to Play</>}
          </button>
        </div>

        <h1 className={!lose ? "loser" : "loser2"}>You Lose!</h1>
      </div>
      {/* <SoundButton lose={lose} /> */}
      <Leave link="/" text={"Log Out"} />
    </div>
  );
}
function Leave(props) {
  return (
    <Link to={props.link}>
      {" "}
      <button>Go Back</button>
    </Link>
  );
}
export default Game;
