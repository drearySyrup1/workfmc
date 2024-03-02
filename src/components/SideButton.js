import React, { useState } from "react";
import { setRouteId } from "../features/routedownload/routedownloadSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  clearTypingArea,
  disableExec,
  enableExec,
  setSelectedView,
} from "../features/main/mainSlice";
import {
  changeMinutesPerStop,
  setVibrationAmountDisplay,
  toggleVibration,
} from "../features/settings/settingsSlice";
import {
  calculateEstimatedTimes,
  changeItemsPerPage,
  deleteModeOff,
  deleteStop,
  editStop,
  insertStop,
  setIncomingStops,
  setItemToMove,
  swapItems,
  toggleCompletedStop,
  toggleMoveMode,
} from "../features/legs/legsSlice";
import { Time, decoder, sortStops } from "../utils";

const readClipboard = async () => {
  try {
    const clipboardText = await navigator.clipboard.readText();
    return clipboardText;
  } catch (error) {
    console.error("Failed to read clipboard:", error);
    return null;
  }
};

const createStopsList = (string) => {
  let list = string.split("\n").map((item) => item.replace(/\r/g, ""));
  list = sortStops(list);
  list = list.map((item) => {
    return {
      name: item,
      completed: false,
      estimatedCompleteTime: "",
      completedTime: "",
      note: "",
      markers: {
        pickup: false,
        both: false,
        pallet: false,
      },
    };
  });

  return list;
};

const SideButton = ({ id }) => {
  const { selectedView, typingAreaValue, exec } = useSelector(
    (state) => state.main
  );
  const { routeId, fileInputRef } = useSelector((state) => state.routeDownload);
  const { settings, vibration, minutesPerStop } = useSelector(
    (state) => state.settings
  );
  const { page, itemsPerPage, stops, moveMode, itemToMove, deleteMode } =
    useSelector((state) => state.legs);

  const dispatch = useDispatch();
  const onClick = async () => {
    // Vibration
    if ("vibrate" in navigator) {
      if (vibration && exec) {
        navigator.vibrate(settings.vibrationAmountDisplay);
      } else if (vibration) {
        navigator.vibrate(settings.vibrationAmount);
      }
    }

    // Route download view
    if (selectedView === "ROUTE_DOWNLOAD") {
      if (id === "R1") {
        if (deleteMode) {
          dispatch(setRouteId(""));
          dispatch(deleteModeOff());
          dispatch(clearTypingArea());
          return;
        }
        if (routeId === "") {
          dispatch(setRouteId(typingAreaValue));
          dispatch(clearTypingArea());
        }
      }
      if (id === "R2") {
        fileInputRef.current.click();
      }

      if (id === "L1") {
        if (routeId !== "") {
          dispatch(enableExec("DOWNLOAD_ROUTE"));
        }
      }

      if (id === "R6") {
        if (exec) dispatch(disableExec());
      }
      // -----------------------------------------
      // MENU view
    } else if (selectedView === "MENU") {
      if (id === "R1") {
        dispatch(setSelectedView("SETTINGS"));
      }
      // -----------------------------------------
      // Settings view
    } else if (selectedView === "SETTINGS") {
      if (id === "R1") {
        dispatch(setSelectedView("VIBRATION_SETTINGS"));
      } else if (id === "R2") {
        dispatch(setSelectedView("LEGS_SETTINGS"));
      }
      // -----------------------------------------
      // Vibraion settngs view
    } else if (selectedView === "LEGS_SETTINGS") {
      if (id === "R1") {
        if (typingAreaValue === "") return;
        const value = Number(typingAreaValue);
        dispatch(changeMinutesPerStop(value));
        dispatch(clearTypingArea());
      } else if (id === "R6") {
        dispatch(setSelectedView("SETTINGS"));
      }
    } else if (selectedView === "VIBRATION_SETTINGS") {
      if (id === "R1") {
        dispatch(toggleVibration());
        return;
      }

      if (id === "R2") {
        dispatch(setVibrationAmountDisplay(typingAreaValue));
        dispatch(clearTypingArea());
        dispatch(enableExec("CHANGE_VIBRATION_AMOUNT"));
        return;
      }

      if (id === "R6" && exec) {
        dispatch(setVibrationAmountDisplay(settings.vibrationAmount));
        dispatch(disableExec());
      } else if (id === "R6") {
        dispatch(setSelectedView("SETTINGS"));
      }
      // -----------------------------------------
      // Legs view
    } else if (selectedView === "LEGS") {
      // for pressing right side buttons

      for (let i = 0; i < 6; i++) {
        const clickedItemIndex = i + page * itemsPerPage;

        if (id === `R${i + 1}`) {
          if (exec) return;
          if (moveMode) {
            if (stops[clickedItemIndex]?.completed) return;
            if (itemToMove !== null) {
              dispatch(swapItems(clickedItemIndex));
            } else {
              dispatch(setItemToMove(clickedItemIndex));
            }
            return;
          }

          if (deleteMode) {
            dispatch(deleteStop(clickedItemIndex));
            return;
          }

          if (typingAreaValue === "") {
            const time = new Time();
            //find index which button - 1 + page
            dispatch(
              toggleCompletedStop({
                index: clickedItemIndex,
                completedTime: time.toString(),
              })
            );
            dispatch(
              calculateEstimatedTimes({
                hours: time.hour,
                minutes: time.trueMinutes,
                minutesPerStop,
              })
            );
            // alert(stops[clickedItemIndex].name);
          } else {
            const { stopName, markers, note, noFlagsEntered } =
              decoder(typingAreaValue);

            if (stopName) {
              // insert item above
              const item = {
                name: stopName,
                completed: false,
                estimatedCompleteTime: "",
                completedTime: "",
                note: note,
                markers: {
                  pickup: markers.pickup,
                  both: markers.both,
                  pallet: markers.pallet,
                },
              };
              dispatch(insertStop({ insertIndex: clickedItemIndex, item }));
              dispatch(clearTypingArea());
            } else {
              dispatch(
                editStop({
                  index: clickedItemIndex,
                  markers,
                  note,
                  noFlagsEntered,
                })
              );

              // dispatch(clearTypingArea());
            }
          }

          return;
        }
      }

      for (let i = 0; i < 6; i++) {
        if (id === `L${i + 1}` && id !== "L5" && moveMode) {
          return;
        }
      }

      if (id === "L1") {
        if (exec) return;
        dispatch(enableExec("CHECK_ALL_LEGS"));
      }

      if (id === "L2") {
        if (exec) return;
        dispatch(enableExec("UNCHECK_ALL_LEGS"));
      }
      if (id === "L3") {
        if (exec) return;
        dispatch(enableExec("REMOVE_ALL_LEGS"));
      }

      if (id === "L5") {
        if (exec) return;
        dispatch(toggleMoveMode());
      }

      if (id === "L6") {
        if (!exec) {
          const result = await navigator.permissions.query({
            name: "clipboard-write",
          });
          if (result.state === "granted" || result.state === "prompt") {
            const latestClipboardItem = await readClipboard();

            const list = createStopsList(latestClipboardItem);
            dispatch(setIncomingStops(list));
            dispatch(enableExec("PASTE_NEW_LIST"));
          }
        } else {
          dispatch(disableExec());
        }
      }
    }
  };
  return (
    <div
      onClick={onClick}
      className="w-9 h-5 relative p-2 rounded-sm bg-black shadow-[inset_1px_1px_0px_1px_#222] grid active:shadow-none"
    >
      <div className="w-full h-full rounded-[1px] bg-white"></div>
    </div>
  );
};

export default SideButton;
