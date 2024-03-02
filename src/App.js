import React, { useEffect, useRef } from "react";
import ButtonGroup from "./groups/ButtonGroup";
import KeyboardLongButton from "./components/KeyboardLongButton";
import KeyboardButton from "./components/KeyboardButton";
import NumpadButton from "./components/NumpadButton";
import ExecButton from "./components/ExecButton";
import MainKeyboard from "./groups/MainKeyboard";
import Screen from "./groups/Screen";
import { useDispatch, useSelector } from "react-redux";
import {
  setFileInputRef,
  setFileName,
} from "./features/routedownload/routedownloadSlice";
import { initPositions } from "./features/legs/legsSlice";
import { restoreState as restoreStateSettings } from "./features/settings/settingsSlice";
import { restoreState as restoreStateLegs } from "./features/legs/legsSlice";
const App = () => {
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();
  const settingsState = useSelector((state) => state.settings);
  const legsState = useSelector((state) => state.legs);
  useEffect(() => {
    // dispatch(setFileInputRef(fileInputRef));
    // dispatch(initPositions());
    const settings = localStorage.getItem("settings");
    const legs = localStorage.getItem("legsState");
    if (settings === null) {
      console.log("No settings writing current");
      localStorage.setItem("settings", JSON.stringify(settingsState));
    } else {
      console.log("Loading Settings from localStorage", settings);
      dispatch(restoreStateSettings(JSON.parse(settings)));
    }

    if (legs === null) {
      console.log("No settings writing current");
      localStorage.setItem("legsState", JSON.stringify(legsState));
    } else {
      console.log("Loading Settings from localStorage");
      dispatch(restoreStateLegs(JSON.parse(legs)));
    }
  }, [dispatch]);

  const onChangeFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      dispatch(setFileName(file.name));
    }
  };
  return (
    <div>
      <div className="w-svw h-svh bg-zinc-700">
        <div className="grid pt-1 mb-[6px] grid-cols-[1fr_6fr_1fr]">
          <ButtonGroup side="R" />
          <Screen />
          <ButtonGroup side="L" />
        </div>
        {/* Main Keyboard */}
        <MainKeyboard />
      </div>
      <input
        className="hidden"
        type="file"
        id="pdf_file"
        name="pdf_file"
        accept=".pdf"
        ref={fileInputRef}
        onChange={onChangeFile}
      />
    </div>
  );
};

export default App;
