import { createSlice } from "@reduxjs/toolkit";
import { ActiveFilter } from "../ts/types";

const initialFilterState: ActiveFilter = {
  id: "",
  name: "",
  active: false,
};

const filterSlice = createSlice({
  name: "filter",
  initialState: initialFilterState,
  reducers: {
    setActiveFilter: (state, action) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.active = action.payload.active;
    },
    resetActiveFilter: () => initialFilterState,
  },
});

export const filterActions = filterSlice.actions;

export default filterSlice.reducer;
