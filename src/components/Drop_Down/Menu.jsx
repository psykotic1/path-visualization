import React, { useContext } from "react";
import { Context } from "../Contex/Context";

function Menu(props) {
  const [Algorithm, setAlgorithm, Visualize, setVisualize] =
    useContext(Context);
  return (
    <div className="dropdown-menu">
      <ul>
        {props.l.map((item) => {
          return (
            <li className="item" key={item}>
              <button
                onClick={() => {
                  setAlgorithm(item);
                  props.setOpen(false);
                }}
              >
                {item}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Menu;
