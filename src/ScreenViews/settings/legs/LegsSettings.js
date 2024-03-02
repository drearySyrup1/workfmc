import React from "react";
import { useSelector } from "react-redux";

const LegsSettings = () => {
  const { minutesPerStop } = useSelector((state) => state.settings);
  const { exec } = useSelector((state) => state.main);
  return (
    <>
      {/* Title Area */}
      <div className=" bg-black text-center  grid place-content-center">
        Legs SETTINGS
      </div>

      <div className={` scl grid-cols-2 grid-rows-2`}>
        <div className="text-xxs">MINUTES PER STOP</div>
        <div className=" tracking-[.2em] col-[1] row-[2]">{minutesPerStop}</div>
      </div>
      <div className="scl "></div>
      <div className="scl "></div>
      <div className="scl "></div>
      <div className="scl "></div>
      <div className="scl ">{exec ? "< EREASE" : "< BACK"}</div>
    </>
  );
};

export default LegsSettings;
