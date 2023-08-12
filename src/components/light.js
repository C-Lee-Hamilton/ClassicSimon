import { useState } from "react";

function Light(props) {
  const { color, hovercolor, borderRadius } = props;
  const [active, setActive] = useState(true);
  const activeset = () => {
    active === true ? setActive(false) : setActive(true);
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
      ></button>
    </div>
  );
}

export default Light;
