import React from "react";
import { useSelector } from "react-redux";

const VibrationSettings = () => {
  const { settings, vibration } = useSelector((state) => state.settings);
  const { exec } = useSelector((state) => state.main);
  return (
    <>
      {/* Title Area */}
      <div className=" bg-black text-center  grid place-content-center">
        VIBRATION SETTINGS
      </div>
      <div className="scl flex gap-2">
        <span>VIBRATION</span>
        <span>
          {"<"}
          <span className={vibration && `text-green-600 font-bold`}>ON</span>/
          <span className={!vibration && `text-red-600 font-bold`}>OFF</span>
          {">"}
        </span>
      </div>
      <div className={` scl grid-cols-2 grid-rows-2`}>
        {vibration && (
          <>
            <div className="text-xxs">VIBRATION AMOUNT</div>
            <div className=" col-[1] row-[2]">
              {settings.vibrationAmountDisplay}
            </div>
          </>
        )}
      </div>
      <div className="scl "></div>
      <div className="scl "></div>
      <div className="scl "></div>
      <div className="scl ">{exec ? "< EREASE" : "< BACK"}</div>
    </>
  );
};

export default VibrationSettings;
