import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedView } from "../features/main/mainSlice";
import { nextPage, prevPage } from "../features/legs/legsSlice";

const KeyboardLongButton = ({ text, id }) => {
  const dispatch = useDispatch();
  const { exec } = useSelector((state) => state.main);
  const onClick = () => {
    if (exec) return;

    if (id === "menu") {
      dispatch(setSelectedView("MENU"));
      return;
    } else if (id === "rte") {
      dispatch(setSelectedView("ROUTE_DOWNLOAD"));
    } else if (id === "legs") {
      dispatch(setSelectedView("LEGS"));
    } else if (id === "nextpage") {
      dispatch(nextPage());
    } else if (id === "prevpage") {
      dispatch(prevPage());
    }
  };
  return (
    <div
      onClick={onClick}
      className="w-12 h-8 grid place-content-center text-xs text-white rounded-sm bg-black shadow-[inset_1px_1px_0px_1px_#222] grid active:shadow-none text-center"
    >
      {text.map((item, i) => {
        return <p key={i}>{item}</p>;
      })}
    </div>
  );
};

export default KeyboardLongButton;
