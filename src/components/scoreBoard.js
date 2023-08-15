import "../fonts/stylesheet.css";
import "../css/Game.css";

function scoreBoard(props) {
  const { score, highScore } = props;
  return (
    <div className="scoreboard">
      Score:
      <div className="scores">
        {score}:{highScore}
      </div>
      :High &nbsp;Score
    </div>
  );
}

export default scoreBoard;
