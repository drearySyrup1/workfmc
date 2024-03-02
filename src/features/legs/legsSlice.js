import { createSlice } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";
import { Time } from "../../utils";
import { stops } from "../../placeholderdata";

const swapItemsInTheList = (list, index1, index2) => {
  // Copy the original list to avoid mutating it directly
  const newList = [...list];
  //   //swapping listPosition
  //   const item1Position = newList[index1].listPosition;
  //   newList[index1].listPosition = newList[index2].listPosition;
  //   newList[index2].listPosition = item1Position;
  // Swap the items using array destructuring and splice
  [newList[index1], newList[index2]] = [newList[index2], newList[index1]];

  return newList; // Return the modified list
};

const sortStopsByPosition = (stops) => {
  const completedItems = stops.filter((item) => item.completed);
  const uncompletedItems = stops.filter((item) => !item.completed);

  // Sort the uncompleted items based on lastListPosition
  uncompletedItems.sort((a, b) => a.listPosition - b.listPosition);

  // Merge the sorted uncompleted items with the completed items
  const sortedList = [...uncompletedItems, ...completedItems];

  return sortedList;
};

const initialState = {
  page: 0,
  itemsPerPage: 6,
  incomingStops: [],
  moveMode: false,
  deleteMode: false,
  itemToMove: null,
  stops: [],
};

export const legsSlice = createSlice({
  name: "legs",
  initialState,
  reducers: {
    // temp only
    initPositions: (state) => {
      state.stops = state.stops.map((item, i) => {
        return { ...item, listPosition: i };
      });
    },
    restoreState: (state, action) => {
      for (let key in action.payload) {
        state[key] = action.payload[key];
      }
    },
    calculateEstimatedTimes: (state, action) => {
      // most recent completed stop's in hours and minutes
      const { hours, minutes, minutesPerStop } = action.payload;

      let uncompletedStops = state.stops.filter((item) => !item.completed);
      const completedStops = state.stops.filter((item) => item.completed);

      uncompletedStops = uncompletedStops.map((item, i) => {
        const time = new Time(hours, minutes);
        time.addTime({ minutes: minutesPerStop * i + 1 });

        return { ...item, estimatedCompleteTime: time.toString() };
      });
      // Merge the sorted uncompleted items with the completed items
      const mergedList = [...uncompletedStops, ...completedStops];
      state.stops = mergedList;
    },
    deleteModeOn: (state) => {
      state.deleteMode = true;
    },
    deleteModeOff: (state) => {
      state.deleteMode = false;
    },
    editStop: (state, action) => {
      const editableStop = state.stops[action.payload.index];
      if (!action.payload.noFlagsEntered) {
        for (let marker in action.payload.markers) {
          if (marker === "pickup" && editableStop.markers["both"] === true)
            editableStop.markers["both"] = false;

          if (marker === "both" && editableStop.markers["pickup"] === true)
            editableStop.markers["pickup"] = false;
          if (editableStop.markers[marker] && action.payload.markers[marker]) {
            editableStop.markers[marker] = !editableStop.markers[marker];
          } else {
            editableStop.markers[marker] = action.payload.markers[marker];
          }
        }
      }

      if (action.payload.note !== "") {
        editableStop.note = action.payload.note;
      }

      if (action.payload.note === "Z9") {
        editableStop.note = "";
      }
    },
    deleteStop: (state, action) => {
      state.stops.splice(action.payload, 1);
      state.stops = state.stops.map((item, i) => {
        return { ...item, listPosition: i };
      });
    },
    checkAll: (state) => {
      state.stops = state.stops.map((item) => ({
        ...item,
        completed: true,
        completedTime: new Time().toString(),
        estimatedCompleteTime: "",
      }));
    },
    uncheckAll: (state) => {
      state.stops = state.stops.map((item) => ({
        ...item,
        completed: false,
        estimatedCompleteTime: "",
        completedTime: "",
      }));
      state.stops = sortStopsByPosition(state.stops);
    },
    removeAll: (state) => {
      state.stops = [];
      state.page = 0;
    },
    setItemToMove: (state, action) => {
      if (!state.stops[action.payload]) return;

      state.itemToMove = action.payload;
    },
    insertStop: (state, action) => {
      const { insertIndex, item } = action.payload;
      state.stops.splice(insertIndex, 0, item);
      state.stops = state.stops.map((item, i) => {
        return { ...item, listPosition: i };
      });
    },
    swapItems: (state, action) => {
      if (!state.stops[state.itemToMove] || !state.stops[action.payload])
        return;
      // if item to move is present in state than swap it with the next pressed one
      // and update their list positions
      // ignore if trying to move completed item
      //   state.stops = swapItemsInTheList(
      //     state.stops,
      //     state.itemToMove,
      //     action.payload
      //   );
      const itemToMoveRef = state.stops[state.itemToMove];
      state.stops.splice(state.itemToMove, 1);
      state.stops.splice(action.payload, 0, itemToMoveRef);
      state.stops = state.stops.map((item, i) => {
        return { ...item, listPosition: i };
      });
      state.itemToMove = null;
    },
    resetItemToMove: (state) => {
      state.itemToMove = null;
    },
    toggleMoveMode: (state) => {
      if (state.moveMode) {
        state.itemToMove = null;
      }
      state.moveMode = !state.moveMode;
    },
    nextPage: (state) => {
      if (state.page + 1 >= Math.ceil(state.stops.length / state.itemsPerPage))
        return;
      state.page += 1;
    },
    prevPage: (state) => {
      if (state.page <= 0) return;
      state.page -= 1;
    },
    setIncomingStops: (state, action) => {
      state.incomingStops = action.payload;
    },
    changeItemsPerPage: (state, action) => {
      state.itemsPerPage = action.payload;
    },
    approveIncomingStops: (state) => {
      state.incomingStops.forEach((object, i) => (object.listPosition = i));
      state.stops = state.incomingStops;
    },
    toggleCompletedStop: (state, action) => {
      const { index, completedTime } = action.payload;
      const item = state.stops[index];
      if (!item) return;

      if (state.stops[index].completed) {
        item.completed = !item.completed;
        state.stops = sortStopsByPosition(state.stops);
        // Partition the array into completed and uncompleted items
        // const completedItems = state.stops.filter((item) => item.completed);
        // const uncompletedItems = state.stops.filter((item) => !item.completed);

        // // Sort the uncompleted items based on lastListPosition
        // uncompletedItems.sort((a, b) => a.listPosition - b.listPosition);

        // // Merge the sorted uncompleted items with the completed items
        // const sortedList = [...uncompletedItems, ...completedItems];

        // state.stops = sortedList;

        // const itemToRestore = state.stops.splice(index, 1)[0]; // Splice returns an array, so we extract the first (and only) item

        // Insert the last item at the specified index
        // const specifiedIndex = itemToRestore.listPosition; // Example index
        // state.stops.splice(specifiedIndex, 0, itemToRestore);
      } else {
        // complete and save position and move it to the back
        state.stops.splice(index, 1);

        // Push the object to the end of the array
        state.stops.push(item);
        item.completed = !item.completed;
        item.completedTime = completedTime;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  nextPage,
  approveIncomingStops,
  changeItemsPerPage,
  prevPage,
  setIncomingStops,
  initPositions,
  toggleCompletedStop,
  setItemToMove,
  checkAll,
  uncheckAll,
  deleteModeOn,
  deleteModeOff,
  removeAll,
  resetItemToMove,
  insertStop,
  toggleMoveMode,
  swapItems,
  editStop,
  deleteStop,
  calculateEstimatedTimes,
  restoreState,
} = legsSlice.actions;

export default legsSlice.reducer;
