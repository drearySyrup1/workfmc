import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  typingAreaValue: "",
  selectedView: "LEGS",
  exec: false,
  execAction: "",
};

export const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    changeTypingAreaValue: (state, action) => {
      state.typingAreaValue += action.payload;
    },
    ereaseFromTypingArea: (state) => {
      state.typingAreaValue = state.typingAreaValue.slice(0, -1);
    },
    clearTypingArea: (state) => {
      state.typingAreaValue = "";
    },
    enableExec: (state, action) => {
      state.exec = true;
      state.execAction = action.payload;
    },
    disableExec: (state) => {
      state.exec = false;
      state.execAction = "";
    },
    setSelectedView: (state, action) => {
      state.selectedView = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  changeTypingAreaValue,
  ereaseFromTypingArea,
  clearTypingArea,
  enableExec,
  disableExec,
  setSelectedView,
} = mainSlice.actions;

export default mainSlice.reducer;
