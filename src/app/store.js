import {
  configureStore,
  createListenerMiddleware,
  isAnyOf,
} from "@reduxjs/toolkit";
import mainSliceReducer from "../features/main/mainSlice";
import routedownloadSliceReducer from "../features/routedownload/routedownloadSlice";
import settingsSliceReducer from "../features/settings/settingsSlice";
import legsSliceReducer from "../features/legs/legsSlice";
import { listenerMiddleware } from "./listenerMiddleware";

export const store = configureStore({
  reducer: {
    main: mainSliceReducer,
    routeDownload: routedownloadSliceReducer,
    settings: settingsSliceReducer,
    legs: legsSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(listenerMiddleware.middleware),
});

export default store;
