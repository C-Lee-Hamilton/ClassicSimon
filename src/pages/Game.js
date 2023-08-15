import "../css/Game.css";
import Light from "../components/light";
import ScoreBoard from "../components/scoreBoard";
import { useState, useEffect } from "react";
import { Link } from "wouter";
import loseNoise from "../audio/loseNoise.mp3";
import RedNoise from "../audio/RedNoise.mp3";
import BlueNoise from "../audio/BlueNoise.mp3";
import YellowNoise from "../audio/YellowNoise.mp3";
import GreenNoise from "../audio/GreenNoise.mp3";
import leaveNoise from "../audio/leaveNoise.mp3";
import muter from "../images/mute.png";
import speaker from "../images/speaker.png";

function Game() {
  const [onOff, setOnOff] = useState(false);
  //random color moves
  const colors = ["red", "blue", "yellow", "green"];
  //button message
  const [message, setMessage] = useState("Click to Play");
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
  const [leaveAudio] = useState(new Audio(leaveNoise));
  const [loseAudio] = useState(new Audio(loseNoise));
  const [mute, setMute] = useState(false);
  const playSound = () => {
    if (mute === false) {
      loseAudio.play();
    }
  };
  const playLeaveSound = () => {
    if (mute === false) {
      leaveAudio.play();
    }
  };
  const muteButton = () => {
    setMute(!mute);
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

      if (mute === false) {
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
      }
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
        setMessage("Try Again");
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
  const leavePress = () => {
    setOnOff(!onOff);
    playLeaveSound();
  };

  return (
    <div className="Game">
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
            mute={mute}
          />
          <Light
            borderRadius="0% 100% 0% 0%"
            color={lights.blue}
            hovercolor={!onOff ? "blue" : "lightblue"}
            playerMove={playerMove}
            setPlayerMove={setPlayerMove}
            onOff={onOff}
            compPlaying={compPlaying}
            mute={mute}
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
            mute={mute}
          />
          <Light
            borderRadius="0% 0% 100% 0%"
            color={lights.green}
            hovercolor={!onOff ? "green" : "lightgreen"}
            playerMove={playerMove}
            setPlayerMove={setPlayerMove}
            onOff={onOff}
            compPlaying={compPlaying}
            mute={mute}
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
            {!onOff && <>{message}</>}
          </button>
        </div>

        <h1 className={!lose ? "loser" : "loser2"}>You Lose!</h1>
      </div>

      <Leave link="/" leavePress={leavePress} text={"Log Out"} />
      <br />
      <img
        className="muteButton"
        src={mute ? muter : speaker}
        onClick={muteButton}
      />
    </div>
  );
}
function Leave(props) {
  return (
    <Link to={props.link}>
      {" "}
      <button onClick={props.leavePress} className="LeaveGame">
        Go Back
      </button>
    </Link>
  );
}
export default Game;
