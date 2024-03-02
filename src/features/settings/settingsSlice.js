import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  vibration: false,
  settings: {
    vibrationAmount: 50,
    vibrationAmountDisplay: 50,
  },
  minutesPerStop: 4,
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    changeMinutesPerStop: (state, action) => {
      state.minutesPerStop = action.payload;
    },
    restoreState: (state, action) => {
      for (let key in action.payload) {
        state[key] = action.payload[key];
      }
    },
    toggleVibration: (state) => {
      state.vibration = !state.vibration;
    },
    setVibrationAmount: (state, action) => {
      state.settings.vibrationAmount = action.payload;
      state.settings.vibrationAmountDisplay = action.payload;
    },
    setVibrationAmountDisplay: (state, action) => {
      state.settings.vibrationAmountDisplay = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  toggleVibration,
  setVibrationAmount,
  setVibrationAmountDisplay,
  restoreState,
  changeMinutesPerStop,
} = settingsSlice.actions;

export default settingsSlice.reducer;
