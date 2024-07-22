import { createSlice } from "@reduxjs/toolkit";
import {
  addCapacityPlan,
  fetchAllCapacityPlan,
  deleteCapacityPlan,
} from "../action/capacityPlanAction";
import { StateOptions } from "../../util/enum";

const initialState: {
  fetchState: StateResponseData;
  addState: StateResponseData;
  deleteState: StateResponseData;
} = {
  fetchState: {
    state: StateOptions.INITIAL,
    data: null,
    status: null,
    loading: false,
    error: false,
    message: "",
  },
  addState: {
    state: StateOptions.INITIAL,
    data: null,
    status: null,
    loading: false,
    error: false,
    message: "",
  },
  deleteState: {
    state: StateOptions.INITIAL,
    data: null,
    status: null,
    loading: false,
    error: false,
    message: "",
  },
};

const capacityplanSlice = createSlice({
  name: "capacityplan",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all capacityplans
      .addCase(fetchAllCapacityPlan.fulfilled, (state, action) => {
        state.fetchState.data = action.payload;
        state.fetchState.loading = false;
        state.fetchState.error = false;
        state.fetchState.state = StateOptions.FULFILLED;
      })
      .addCase(fetchAllCapacityPlan.pending, (state) => {
        state.fetchState.loading = true;
        state.fetchState.error = false;
        state.fetchState.state = StateOptions.PENDING;
      })
      .addCase(fetchAllCapacityPlan.rejected, (state, action) => {
        state.fetchState.error = true;
        state.fetchState.loading = false;
        state.fetchState.message = action.error.message;
        state.fetchState.state = StateOptions.REJECTED;
      })
      // Add capacityplan
      .addCase(addCapacityPlan.fulfilled, (state, action) => {
        state.addState.data = action.payload;
        state.addState.message = "CapacityPlan added successfully!";
        state.addState.loading = false;
        state.addState.error = false;
        state.addState.state = StateOptions.FULFILLED;
      })
      .addCase(addCapacityPlan.pending, (state) => {
        state.addState.loading = true;
        state.addState.error = false;
        state.addState.state = StateOptions.PENDING;
      })
      .addCase(addCapacityPlan.rejected, (state, action) => {
        state.addState.error = true;
        state.addState.loading = false;
        state.addState.message =
          action.error.message || "Adding capacity plan failed";
        state.addState.state = StateOptions.REJECTED;
      })

      // Delete CapacityPlan

      .addCase(deleteCapacityPlan.fulfilled, (state, action) => {
        state.deleteState.data = action.payload;
        state.deleteState.message = "Capacity plan deleted successfully!";
        state.deleteState.loading = false;
        state.deleteState.error = false;
        state.deleteState.state = StateOptions.FULFILLED;
      })
      .addCase(deleteCapacityPlan.pending, (state) => {
        state.deleteState.loading = true;
        state.deleteState.error = false;
        state.deleteState.state = StateOptions.PENDING;
      })
      .addCase(deleteCapacityPlan.rejected, (state, action) => {
        state.deleteState.error = true;
        state.deleteState.loading = false;
        state.deleteState.message =
          action.error.message || "Deleting capacity plan failed";
        state.deleteState.state = StateOptions.REJECTED;
      });
  },
});

export const capacityplanSliceAction = capacityplanSlice.actions;
export default capacityplanSlice.reducer;
