import "./App.css";
import { Link, Route, Switch } from "wouter";
import Game from "./Game.js";

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
      <header>Welcome to SIMON</header>

      <Link to="/Game">
        {" "}
        <button>Start Game</button>
      </Link>
    </>
  );
};

export default App;
