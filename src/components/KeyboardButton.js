import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeTypingAreaValue,
  clearTypingArea,
  ereaseFromTypingArea,
} from "../features/main/mainSlice";
import { deleteModeOff, deleteModeOn } from "../features/legs/legsSlice";

const specials = {
  CLR: "CLR",
  SP: "SP",
  DEL: "DEL",
};

const KeyboardButton = ({ text, textsmall = false, highlight = false }) => {
  const dispatch = useDispatch();
  const { exec } = useSelector((state) => state.main);
  const { moveMode, deleteMode } = useSelector((state) => state.legs);
  const onClick = () => {
    if (exec || moveMode || (deleteMode && text !== specials.CLR)) return;

    if (deleteMode && text === specials.CLR) {
      dispatch(clearTypingArea());
      dispatch(deleteModeOff());
    }

    if (text === specials.CLR) {
      dispatch(ereaseFromTypingArea());
      return;
    }
    if (text === specials.DEL) {
      dispatch(clearTypingArea());
      dispatch(deleteModeOn());
    }
    dispatch(changeTypingAreaValue(text));
  };
  return (
    <div
      className={`w-10 h-10 place-items-center ${
        textsmall ? "text-[9px]" : "text-xs"
      } text-white rounded-sm bg-black shadow-[inset_1px_1px_0px_1px_#222] grid active:shadow-none`}
      onClick={onClick}
    >
      {/* highlight */}
      {highlight ? (
        <div className="w-[80%] h-[80%] rounded-sm border-2 grid place-content-center">
          {text}
        </div>
      ) : (
        <>{text}</>
      )}
    </div>
  );
};

export default KeyboardButton;
