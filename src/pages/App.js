import "../css/App.css";
import { Link, Route, Switch } from "wouter";
import Game from "../pages/Game";
import Logo from "../images/SimonLogo.png";

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
  return (
    <>
      <h1 className="welcome">Welcome to...</h1>

      <img className="logo" src={Logo} alt="SIMON" />

      <Link to="/Game">
        {" "}
        <button className="StartGame">Start Game</button>
      </Link>
    </>
  );
};

export default App;
