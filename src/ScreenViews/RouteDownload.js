import React from "react";
import { useSelector } from "react-redux";

const RouteDownload = () => {
  const { routeId, fileName } = useSelector((state) => state.routeDownload);
  const { exec } = useSelector((state) => state.main);
  return (
    <>
      {/* Title Area */}
      <div className=" bg-black text-center  grid place-content-center">
        ROUTE DOWNLOAD
      </div>

      {/* 1st row */}
      <div className={` scl grid-cols-2 grid-rows-2`}>
        <div className="text-xxs">ROUTE ID</div>
        <div className=" tracking-[.2em] col-[1] row-[2]">
          {routeId === "" ? "____" : routeId}
        </div>
        {routeId && (
          <div className="col-[2] row-[1_/_-1] self-center justify-self-end">
            DOWNLOAD {">"}
          </div>
        )}
      </div>
      {/* 2nd row */}
      {fileName !== "" ? (
        <div className={` scl grid-cols-3 grid-rows-2`}>
          <div className="text-xxs">FILE NAME</div>
          <div className="text-xxs text-nowrap tracking-[.2em] col-[1] row-[2]">
            {`${fileName.slice(0, 5)}...${fileName.split(".")[0].slice(-4)}`}
          </div>
          <div className="text-xxs">FILE TYPE</div>
          <div className="text-xxs text-nowrap tracking-[.2em] col-[2] row-[2]">
            {`${fileName.split(".")[1]}`}
          </div>
        </div>
      ) : (
        <div className="scl ">{"<"}SELECT FILE</div>
      )}
      {/* end 2nd row */}
      <div className="scl "></div>
      <div className="scl "></div>
      <div className="scl "></div>
      <div className="scl ">{exec && "< EREASE"}</div>
    </>
  );
};

export default RouteDownload;
