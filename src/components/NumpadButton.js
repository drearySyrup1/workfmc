import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeTypingAreaValue } from "../features/main/mainSlice";

const NumpadButton = ({ text }) => {
  const dispatch = useDispatch();
  const { exec } = useSelector((state) => state.main);
  const onClick = () => {
    if (exec) return;
    dispatch(changeTypingAreaValue(text));
  };
  return (
    <div
      onClick={onClick}
      className="w-9 h-9 grid rounded-full place-content-center text-xs text-white bg-black shadow-[inset_1px_1px_0px_1px_#222] grid active:shadow-none"
    >
      {text === "dot" ? (
        <div className="w-[5px] h-[5px] rounded-full bg-white"></div>
      ) : (
        <>{text}</>
      )}
    </div>
  );
};

export default NumpadButton;
