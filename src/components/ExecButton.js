import React from "react";
import KeyboardLongButton from "./KeyboardLongButton";
import { useDispatch, useSelector } from "react-redux";
import { setVibrationAmount } from "../features/settings/settingsSlice";
import { disableExec, setSelectedView } from "../features/main/mainSlice";
import {
  approveIncomingStops,
  checkAll,
  removeAll,
  uncheckAll,
} from "../features/legs/legsSlice";

const ExecButton = ({ light = false }) => {
  const { exec, execAction } = useSelector((state) => state.main);
  const { settings, vibration } = useSelector((state) => state.settings);
  const dispatch = useDispatch();
  const onClick = () => {
    if (execAction === "CHANGE_VIBRATION_AMOUNT") {
      dispatch(setVibrationAmount(settings.vibrationAmountDisplay));
      dispatch(disableExec());
      if (vibration) {
        navigator.vibrate(settings.vibrationAmountDisplay);
      }
    } else if (execAction === "DOWNLOAD_ROUTE") {
      dispatch(setSelectedView("LOADING"));
      dispatch(disableExec());
      setTimeout(() => {
        dispatch(setSelectedView("ROUTE_DOWNLOAD"));
      }, 3000);
      return;
    } else if (execAction === "PASTE_NEW_LIST") {
      dispatch(approveIncomingStops());
      dispatch(disableExec());
    } else if (execAction === "CHECK_ALL_LEGS") {
      dispatch(checkAll());
      dispatch(disableExec());
    } else if (execAction === "UNCHECK_ALL_LEGS") {
      dispatch(uncheckAll());
      dispatch(disableExec());
    } else if (execAction === "REMOVE_ALL_LEGS") {
      dispatch(removeAll());
      dispatch(disableExec());
    }
  };
  return (
    <div onClick={onClick} className="relative grid justify-items-center">
      <KeyboardLongButton text={["EXEC"]} />
      <div
        className={`absolute w-6 h-1 ${
          exec
            ? "animation-blink bg-white shadow-[0_0_5px_1px_rgba(255,_255,_255,_.8)]"
            : "bg-zinc-800"
        } -top-[8px]`}
      ></div>
    </div>
  );
};

export default ExecButton;
