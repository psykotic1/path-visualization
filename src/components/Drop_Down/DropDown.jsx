import React, { useState } from "react";
import Menu from "./Menu";
import Description from "../../Data/Data";
import "./DropDown.css";
import { MdOutlineArrowDropDownCircle } from "react-icons/md";

function DropDown(props) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`dropdown ${props.heading}`}>
      <button className="dropdown-btn" onClick={() => setOpen(!open)}>
        {props.heading}
        <MdOutlineArrowDropDownCircle className="icon" />
      </button>
      {open && (
        <div>
          {Description.map((iteam) => {
            if (iteam.heading === props.heading) {
              return (
                <Menu title={iteam.titles} l={iteam.l} setOpen={setOpen} />
              );
            } else return null;
          })}
        </div>
      )}
    </div>
  );
}

export default DropDown;
