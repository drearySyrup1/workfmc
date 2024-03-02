import { createListenerMiddleware } from "@reduxjs/toolkit";

export const listenerMiddleware = createListenerMiddleware();

const isSettingsAction = (action) => {
  const [slice, actionType] = action.type.split("/");
  return (
    slice === "settings" &&
    !["restoreState", "setVibrationAmountDisplay"].includes(actionType)
  );
};

const isLegsAction = (action) => {
  const [slice, actionType] = action.type.split("/");
  const toNotMatch = [
    "deleteModeOn",
    "deleteModeOff",
    "setItemToMove",
    "resetItemToMove",
    "setIncomingStops",
    "changeItemsPerPage",
  ];
  return slice === "legs" && !toNotMatch.includes(actionType);
};

listenerMiddleware.startListening({
  matcher: isSettingsAction,
  effect: (action, listenerApi) => {
    const { settings } = listenerApi.getState();
    console.log("Writing settings to localStorage");
    localStorage.setItem("settings", JSON.stringify(settings));
  },
});

listenerMiddleware.startListening({
  matcher: isLegsAction,
  effect: (action, listenerApi) => {
    const { legs } = listenerApi.getState();
    console.log("Writing legsState to localStorage");
    localStorage.setItem("legsState", JSON.stringify(legs));
  },
});
