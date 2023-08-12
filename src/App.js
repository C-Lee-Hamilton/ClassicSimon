import "./App.css";
import Light from "./components/light";
import { useState } from "react";
function App() {
  const [onOff, setOnOff] = useState(false);
  const [red, setRed] = useState("red");
  const [blue, setBlue] = useState("blue");
  const [yellow, setYellow] = useState("yellow");
  const [green, setGreen] = useState("green");

  const centerButtonColorPress = () => {
    setOnOff(!onOff);
    if (onOff === false) {
      setRed("lightpink");
      setBlue("lightblue");
      setYellow("lightgoldenrodyellow");
      setGreen("lightgreen");
    } else {
      setRed("red");
      setBlue("blue");
      setYellow("yellow");
      setGreen("green");
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Click to Play</h1>
      </header>
      <div className="gameboard">
        <div className="gameboardHalf">
          <Light borderRadius="100% 0% 0% 0%" color="red" hovercolor={red} />
          <Light borderRadius="0% 100% 0% 0%" color="blue" hovercolor={blue} />
        </div>

        <div className="gameboardHalf">
          <Light
            borderRadius="0% 0% 0% 100%"
            color="yellow"
            hovercolor={yellow}
          />
          <Light
            borderRadius="0% 0% 100% 0%"
            color="green"
            hovercolor={green}
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
