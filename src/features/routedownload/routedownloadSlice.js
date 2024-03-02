import { createSlice } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";

const initialState = {
  routeId: "",
  fileInputRef: null,
  fileName: "",
};

export const routeDownloadSlice = createSlice({
  name: "routeDownload",
  initialState,
  reducers: {
    setRouteId: (state, action) => {
      state.routeId = action.payload;
    },
    setFileInputRef: (state, action) => {
      state.fileInputRef = action.payload;
    },
    setFileName: (state, action) => {
      state.fileName = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setRouteId, setFileInputRef, setFileName } =
  routeDownloadSlice.actions;

export default routeDownloadSlice.reducer;
