import React from "react";
import KeyboardLongButton from "../components/KeyboardLongButton";
import ExecButton from "../components/ExecButton";
import KeyboardButton from "../components/KeyboardButton";
import NumpadButton from "../components/NumpadButton";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";

const specials = ["SP", "DEL", "/", "CLR"];
const alphabet = Array.from("ABCDEFGHIJKLMNOPQRSTUVWXYZ").concat(specials);
const numpad = Array.from("123456789").concat(["dot", "0", "+/-"]);

const MainKeyboard = () => {
  const dispatch = useDispatch();
  return (
    <div className="grid px-2 keyboard-grid grid-cols-[1fr_2fr] gap-2 ">
      <div className="lb grid grid-cols-2 ">
        <KeyboardLongButton text={["INIT", "REF"]} />
        <KeyboardLongButton id="rte" text={["RTE"]} />
        <KeyboardLongButton id="menu" text={["MENU"]} />
        <KeyboardLongButton id="legs" text={["LEGS"]} />
        <KeyboardLongButton text={["N1", "LIMIT"]} />
        <KeyboardLongButton text={["FIX"]} />
        <KeyboardLongButton id="prevpage" text={["PREV", "PAGE"]} />
        <KeyboardLongButton id="nextpage" text={["NEXT", "PAGE"]} />
      </div>
      <div className="rb grid grid-cols-4 gap-4">
        <KeyboardLongButton text={["CLB"]} />
        <KeyboardLongButton text={["CRZ"]} />
        <KeyboardLongButton text={["DES"]} />
        <div className=""></div>
        <KeyboardLongButton text={["DEP", "ARR"]} />
        <KeyboardLongButton text={["HOLD"]} />
        <KeyboardLongButton text={["PROG"]} />
        <ExecButton />
      </div>
      <div className="kb grid grid-cols-5 gap-2 ">
        {alphabet.map((letter) => {
          const textsize = specials.includes(letter);
          const highlight = Array.from("ENSWHBP").includes(letter);
          return (
            <KeyboardButton
              highlight={highlight}
              textsmall={textsize}
              text={letter}
              key={uuidv4()}
            />
          );
        })}
      </div>
      <div className="np grid grid-cols-3 gap-2">
        {numpad.map((num) => {
          return <NumpadButton key={uuidv4()} text={num} />;
        })}
      </div>
    </div>
  );
};

export default MainKeyboard;
