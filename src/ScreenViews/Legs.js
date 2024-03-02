import React from "react";
import { useSelector } from "react-redux";
import { Time } from "../utils";

const getEstimatedFinishTime = (stops, minutesPerStop) => {
  const uncompletedStops = stops.filter((item) => !item.completed);
  const time = new Time();
  time.addTime({ minutes: uncompletedStops.length * minutesPerStop });

  return {
    eft: time.toString(),
    totalMinutes: uncompletedStops.length * minutesPerStop,
  };
};

const Legs = () => {
  const { page, stops, itemsPerPage, moveMode, itemToMove } = useSelector(
    (state) => state.legs
  );
  const { minutesPerStop } = useSelector((state) => state.settings);
  const { exec } = useSelector((state) => state.main);
  const startIndex = itemsPerPage * page;
  const endIndex = startIndex + itemsPerPage;
  const sliceLength = stops.slice(startIndex, endIndex).length;
  const leftOver = stops.length % itemsPerPage;
  const fullPage = sliceLength === itemsPerPage;
  const itemToBlink = itemToMove && itemToMove - page * itemsPerPage;
  const totalPages = Math.ceil(stops.length / itemsPerPage);
  const { eft: estimatedFinishTime, totalMinutes } = getEstimatedFinishTime(
    stops,
    minutesPerStop
  );
  return (
    <>
      {/* Title Area */}
      <div className=" bg-black text-center px-2  gap-4 grid grid-cols-[auto_auto_1fr_auto] place-content-center">
        <p>LEGS</p>
        <p className="text-xxs">
          {stops.length !== 0 && (
            <div>
              {stops.filter((item) => !item.completed).length} / {stops.length}
            </div>
          )}
        </p>
        <p className="text-xxs">
          {estimatedFinishTime} ({totalMinutes} min)
        </p>
        <p className="text-xxs">
          PAGE {page + 1}/{totalPages || 1}
        </p>
      </div>

      {stops.slice(startIndex, endIndex).map((item, i) => {
        const noTime =
          item.completedTime === "" && item.estimatedCompleteTime === "";
        return (
          <div className={` scl grid-cols-2 grid-rows-2`}>
            {/* COL1 ROW1 Name */}
            <div
              className={`text-xs ${
                noTime && item.note === "" && "row-[1_/_-1]"
              } ${
                item.completed && "line-through text-zinc-500"
              } flex items-center gap-1`}
            >
              <p className={itemToBlink === i && "animation-blink"}>
                {startIndex + i + 1}. {item.name}
              </p>
              {item.markers.pickup && (
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
              )}

              {item.markers.both && (
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              )}
              {item.markers.pallet && (
                <div className="w-2 h-2 rounded-full bg-orange-500"></div>
              )}
            </div>

            {/* COL1 ROW2 Time and note */}
            <div className="col-[1] text-xxs flex items-center gap-1">
              {item.completed ? (
                <span className=" text-zinc-500">{item.completedTime}</span>
              ) : (
                item.estimatedCompleteTime
              )}
              {item.note !== "" && (
                <>
                  {noTime || " /"}
                  <div className="bg-red-700 h-3 px-[2px] flex items-center ">
                    {item.note}
                  </div>
                </>
              )}
            </div>
            {(() => {
              const returnList = [];
              switch (i) {
                case 0:
                  returnList.push(
                    <div className="col-[2] row-[1_/_-1] justify-self-end self-center text-xs">
                      CHECK ALL {">"}
                    </div>
                  );
                  break;
                case 1:
                  returnList.push(
                    <div className="col-[2] row-[1_/_-1] justify-self-end self-center text-xs">
                      UNCHECK ALL {">"}
                    </div>
                  );
                  break;
                case 2:
                  returnList.push(
                    <div className="col-[2] row-[1_/_-1] justify-self-end self-center text-xs">
                      REMOVE ALL {">"}
                    </div>
                  );
                  break;
                case 4:
                  returnList.push(
                    <div className="col-[2] row-[1_/_-1] justify-self-end self-center text-xs">
                      <span>MOVE</span>
                      <span>
                        {"<"}
                        <span
                          className={moveMode && `text-green-600 font-bold`}
                        >
                          ON
                        </span>
                        /
                        <span className={!moveMode && `text-red-600 font-bold`}>
                          OFF
                        </span>
                        {">"}
                      </span>
                    </div>
                  );
                  break;
                case 5:
                  returnList.push(
                    <div className="col-[2] row-[1_/_-1] justify-self-end self-center text-xs">
                      {exec ? "EREASE >" : "PASTE >"}
                    </div>
                  );
                  break;
                default:
                  break;
              }
              return returnList;
            })()}
          </div>
        );
      })}
      {/* render paste button on last row if page is not full */}
      {(() => {
        let returnList = [];
        if (fullPage) return;
        for (let i = 0; i < 6; i++) {
          if (i > leftOver - 1) {
            if (i === 1) {
              returnList.push(
                <div className="scl grid-cols-2 row-[-7]">
                  <div className="col-[2] justify-self-end self-center">
                    UNCHECK ALL {">"}
                  </div>
                </div>
              );
            } else if (i === 2) {
              returnList.push(
                <div className="scl grid-cols-2 row-[-6]">
                  <div className="col-[2] justify-self-end self-center">
                    REMOVE ALL {">"}
                  </div>
                </div>
              );
            } else if (i === 4) {
              returnList.push(
                <div className="scl grid-cols-2 row-[-4]">
                  <div className="col-[2] justify-self-end self-center">
                    <span>MOVE</span>
                    <span>
                      {"<"}
                      <span className={moveMode && `text-green-600 font-bold`}>
                        ON
                      </span>
                      /
                      <span className={!moveMode && `text-red-600 font-bold`}>
                        OFF
                      </span>
                      {">"}
                    </span>
                  </div>
                </div>
              );
            } else if (i === 5) {
              const jsxToAdd = (
                <div className="scl grid-cols-2 row-[-3]">
                  <div className="col-[2] justify-self-end self-center">
                    {exec ? "EREASE >" : "PASTE >"}
                  </div>
                </div>
              );
              if (stops.length === 0) {
                returnList = [jsxToAdd];
              } else {
                returnList.push(jsxToAdd);
              }
            }
          }
        }
        return returnList;
      })()}
    </>
  );
};

export default Legs;
