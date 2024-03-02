import React from "react";
import SideButton from "../components/SideButton";
import { v4 as uuidv4 } from "uuid";
const ButtonGroup = ({ side }) => {
  return (
    <div className="justify-self-center grid content-center gap-[18px]">
      {Array(6)
        .fill(0)
        .map((_, i) => `${side}${i + 1}`)
        .map((id) => (
          <SideButton id={id} key={uuidv4()} />
        ))}
    </div>
  );
};

export default ButtonGroup;
