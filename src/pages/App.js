import "../css/App.css";
import { useState } from "react";
import { Link, Route, Switch } from "wouter";
import Game from "../pages/Game";
import Logo from "../images/SimonLogo.png";
import introNoise from "../audio/introNoise.mp3";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/Game" exact component={Game} />
        <Route path="/" component={Log} />
      </Switch>
    </div>
  );
}

const Log = () => {
  const [introAudio] = useState(new Audio(introNoise));
  const playIntroSound = () => {
    introAudio.play();
  };
  return (
    <>
      <h1 className="welcome">Welcome to...</h1>

      <img className="logo" src={Logo} alt="SIMON" />

      <Link to="/Game">
        {" "}
        <button onClick={playIntroSound} className="StartGame">
          Start Game
        </button>
      </Link>
      <br />
    </>
  );
};

export default App;
