import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import RouteDownload from "../ScreenViews/RouteDownload";
import Menu from "../ScreenViews/Menu";
import Settings from "../ScreenViews/Settings";
import VibrationSettings from "../ScreenViews/settings/vibration/VibrationSettings";
import Loading from "../ScreenViews/Loading";
import Legs from "../ScreenViews/Legs";
import LegsSettings from "../ScreenViews/settings/legs/LegsSettings";

const Screen = () => {
  const { typingAreaValue, selectedView } = useSelector((state) => state.main);
  const { deleteMode } = useSelector((state) => state.legs);
  const [currentView, setCurrentView] = useState(null);
  useEffect(() => {
    setCurrentView(getView(selectedView));
  }, [selectedView]);

  const getView = (view) => {
    switch (view) {
      case "ROUTE_DOWNLOAD":
        return <RouteDownload />;
      case "MENU":
        return <Menu />;
      case "SETTINGS":
        return <Settings />;
      case "VIBRATION_SETTINGS":
        return <VibrationSettings />;
      case "LEGS_SETTINGS":
        return <LegsSettings />;
      case "LOADING":
        return <Loading />;
      case "LEGS":
        return <Legs />;
      default:
        return <RouteDownload />;
    }
  };
  return (
    <div className="w-[100%] h-[268px] rounded bg-black grid grid-rows-[20px_repeat(6,_1fr)_20px] text-white text-xs overflow-hidden">
      {currentView}
      {/* Typing Area */}
      <div className="row-[8] overflow-hidden bg-red-black pl-2 grid items-center max-w-[100%]">
        {deleteMode && typingAreaValue === "DEL" ? (
          <span className="text-red-600 animation-blink">
            {typingAreaValue}
          </span>
        ) : (
          typingAreaValue
        )}
      </div>
    </div>
  );
};

export default Screen;
