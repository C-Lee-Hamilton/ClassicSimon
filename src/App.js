import "./App.css";
import Light from "./components/light";
import { useState, useEffect } from "react";
function App() {
  const [onOff, setOnOff] = useState(false);
  const [red, setRed] = useState("red");
  const [blue, setBlue] = useState("blue");
  const [yellow, setYellow] = useState("yellow");
  const [green, setGreen] = useState("green");
  //random color moves
  const colors = [red, blue, yellow, green];
  const colorSelector = Math.floor(Math.random() * colors.length);
  const [move, setMove] = useState([colors[colorSelector]]);

  const [playerMove, setPlayerMove] = useState([]);

  useEffect(() => {
    if (playerMove.length > 0) {
      console.log("player" + " " + playerMove);
    }
  }, [playerMove]);
  useEffect(() => {
    if (playerMove.length >= move.length) {
      setMove([...move, colors[colorSelector]]);
      console.log("computer" + " " + move);
    }
  }, [playerMove, move]);

  //
  const centerButtonColorPress = () => {
    setOnOff(!onOff);
    if (onOff === false) {
      setRed("lightpink");
      setBlue("lightblue");
      setYellow("lightgoldenrodyellow");
      setGreen("lightgreen");
      // setMove([...move, colors[colorSelector]]);
      console.log("computer" + " " + move);
    } else {
      setRed("red");
      setBlue("blue");
      setYellow("yellow");
      setGreen("green");
      setMove([]);
      setPlayerMove([]);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Click to Play</h1>
      </header>
      <div className="gameboard">
        <div className="gameboardHalf">
          <Light
            borderRadius="100% 0% 0% 0%"
            color="red"
            hovercolor={red}
            playerMove={playerMove}
            setPlayerMove={setPlayerMove}
            onOff={onOff}
          />
          <Light
            borderRadius="0% 100% 0% 0%"
            color="blue"
            hovercolor={blue}
            playerMove={playerMove}
            setPlayerMove={setPlayerMove}
            onOff={onOff}
          />
        </div>

        <div className="gameboardHalf">
          <Light
            borderRadius="0% 0% 0% 100%"
            color="yellow"
            hovercolor={yellow}
            playerMove={playerMove}
            setPlayerMove={setPlayerMove}
            onOff={onOff}
          />
          <Light
            borderRadius="0% 0% 100% 0%"
            color="green"
            hovercolor={green}
            playerMove={playerMove}
            setPlayerMove={setPlayerMove}
            onOff={onOff}
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
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
