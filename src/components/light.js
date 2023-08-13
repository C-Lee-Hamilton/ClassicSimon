import { useState } from "react";

function Light(props) {
  const { color, hovercolor, borderRadius, playerMove, setPlayerMove, onOff } =
    props;
  const [active, setActive] = useState(true);

  const activeset = () => {
    active === true ? setActive(false) : setActive(true);
  };
  const playerMover = () => {
    if (onOff === true) {
      setPlayerMove([...playerMove, color]);
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
