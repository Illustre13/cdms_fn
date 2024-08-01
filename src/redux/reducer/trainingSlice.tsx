import { createSlice } from "@reduxjs/toolkit";
import {
  addTraining,
  fetchAllTraining,
  deleteTraining,
  fetchCPCardsAnalytics,
  bulkCreateTraining,
  updateTraining,
  fetchCPBudgetAnalytics
} from "../action/trainingAction";
import { StateOptions } from "../../util/enum";

const initialState: {
  fetchState: StateResponseData;
  addState: StateResponseData;
  deleteState: StateResponseData;
  fetchCardsAnalytics: StateResponseData;
  bulkCreateState: StateResponseData;
  updateState: StateResponseData;
  fetchBudgetAnalytics: StateResponseData;
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
  fetchCardsAnalytics: {
    state: StateOptions.INITIAL,
    data: null,
    status: null,
    loading: false,
    error: false,
    message: "",
  },
  bulkCreateState: {
    state: StateOptions.INITIAL,
    data: null,
    status: null,
    loading: false,
    error: false,
    message: "",
  },
  updateState: {
    state: StateOptions.INITIAL,
    data: null,
    status: null,
    loading: false,
    error: false,
    message: "",
  },
  fetchBudgetAnalytics: {
    state: StateOptions.INITIAL,
    data: null,
    status: null,
    loading: false,
    error: false,
    message: "",
  },
};

const trainingSlice = createSlice({
  name: "training",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all trainings
      .addCase(fetchAllTraining.fulfilled, (state, action) => {
        state.fetchState.data = action.payload;
        state.fetchState.loading = false;
        state.fetchState.error = false;
        state.fetchState.state = StateOptions.FULFILLED;
      })
      .addCase(fetchAllTraining.pending, (state) => {
        state.fetchState.loading = true;
        state.fetchState.error = false;
        state.fetchState.state = StateOptions.PENDING;
      })
      .addCase(fetchAllTraining.rejected, (state, action) => {
        state.fetchState.error = true;
        state.fetchState.loading = false;
        state.fetchState.message = action.error.message;
        state.fetchState.state = StateOptions.REJECTED;
      })
      // Add training
      .addCase(addTraining.fulfilled, (state, action) => {
        state.addState.data = action.payload;
        state.addState.message = "Training added successfully!";
        state.addState.loading = false;
        state.addState.error = false;
        state.addState.state = StateOptions.FULFILLED;
      })
      .addCase(addTraining.pending, (state) => {
        state.addState.loading = true;
        state.addState.error = false;
        state.addState.state = StateOptions.PENDING;
      })
      .addCase(addTraining.rejected, (state, action) => {
        const { message } = action.error;
        state.addState.error = true;
        state.addState.loading = false;
        state.addState.message =
          action.error.message || "Adding capacity plan failed";
        state.addState.state = StateOptions.REJECTED;
      })
      
      // Delete Training

      .addCase(deleteTraining.fulfilled, (state, action) => {
        state.deleteState.data = action.payload;
        state.deleteState.message = "Capacity plan deleted successfully!";
        state.deleteState.loading = false;
        state.deleteState.error = false;
        state.deleteState.state = StateOptions.FULFILLED;
      })
      .addCase(deleteTraining.pending, (state) => {
        state.deleteState.loading = true;
        state.deleteState.error = false;
        state.deleteState.state = StateOptions.PENDING;
      })
      .addCase(deleteTraining.rejected, (state, action) => {
        state.deleteState.error = true;
        state.deleteState.loading = false;
        state.deleteState.message =
          action.error.message || "Deleting capacity plan failed";
        state.deleteState.state = StateOptions.REJECTED;
      })

      //Fetch Cards Analytics

      .addCase(fetchCPCardsAnalytics.fulfilled, (state, action) => {
        state.fetchCardsAnalytics.data = action.payload;
        state.fetchCardsAnalytics.loading = false;
        state.fetchCardsAnalytics.error = false;
        state.fetchCardsAnalytics.state = StateOptions.FULFILLED;
      })
      .addCase(fetchCPCardsAnalytics.pending, (state) => {
        state.fetchCardsAnalytics.loading = true;
        state.fetchCardsAnalytics.error = false;
        state.fetchCardsAnalytics.state = StateOptions.PENDING;
      })
      .addCase(fetchCPCardsAnalytics.rejected, (state, action) => {
        state.fetchCardsAnalytics.error = true;
        state.fetchCardsAnalytics.loading = false;
        state.fetchCardsAnalytics.message = action.error.message;
        state.fetchCardsAnalytics.state = StateOptions.REJECTED;
      })

      // Bulk create capacity plan
      .addCase(bulkCreateTraining.fulfilled, (state, action) => {
        state.bulkCreateState.data = action.payload;
        state.bulkCreateState.message = "Created Capacity Plan in Bulks successfully!";
        state.bulkCreateState.loading = false;
        state.bulkCreateState.error = false;
        state.bulkCreateState.state = StateOptions.FULFILLED;
      })
      .addCase(bulkCreateTraining.pending, (state) => {
        state.bulkCreateState.loading = true;
        state.bulkCreateState.error = false;
        state.bulkCreateState.state = StateOptions.PENDING;
      })
      .addCase(bulkCreateTraining.rejected, (state, action) => {
        state.bulkCreateState.error = true;
        state.bulkCreateState.loading = false;
        state.bulkCreateState.message =
          action.error.message || "Capacity plan bulk create failed";
        state.bulkCreateState.state = StateOptions.REJECTED;
      })
      
      // Update capacity plan
      .addCase(updateTraining.fulfilled, (state, action) => {
        state.updateState.data = action.payload;
        state.updateState.message = "Capacity Plan updated successfully!";
        state.updateState.loading = false;
        state.updateState.error = false;
        state.updateState.state = StateOptions.FULFILLED;
      })
      .addCase(updateTraining.pending, (state) => {
        state.updateState.loading = true;
        state.updateState.error = false;
        state.updateState.state = StateOptions.PENDING;
      })
      .addCase(updateTraining.rejected, (state, action) => {
        const { message } = action.error;
        state.updateState.error = true;
        state.updateState.loading = false;
        state.updateState.message =
          action.error.message || "Updating capacity plan failed";
        state.updateState.state = StateOptions.REJECTED;
      })


       //Fetch Budget Analytics

       .addCase(fetchCPBudgetAnalytics.fulfilled, (state, action) => {
        state.fetchBudgetAnalytics.data = action.payload;
        state.fetchBudgetAnalytics.loading = false;
        state.fetchBudgetAnalytics.error = false;
        state.fetchBudgetAnalytics.state = StateOptions.FULFILLED;
      })
      .addCase(fetchCPBudgetAnalytics.pending, (state) => {
        state.fetchBudgetAnalytics.loading = true;
        state.fetchBudgetAnalytics.error = false;
        state.fetchBudgetAnalytics.state = StateOptions.PENDING;
      })
      .addCase(fetchCPBudgetAnalytics.rejected, (state, action) => {
        state.fetchBudgetAnalytics.error = true;
        state.fetchBudgetAnalytics.loading = false;
        state.fetchBudgetAnalytics.message = action.error.message;
        state.fetchBudgetAnalytics.state = StateOptions.REJECTED;
      })
      ;
  },
});

export const trainingSliceAction = trainingSlice.actions;
export default trainingSlice.reducer;
