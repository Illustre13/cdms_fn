import { createSlice } from "@reduxjs/toolkit";
import {
  addEmployeeTraining,
  fetchAllEmployeeTraining
} from "../action/employeeTrainingAction";
import { StateOptions } from "../../util/enum";

const initialState: {
  fetchEmployeeTrainingState: StateResponseData;
  addEmployeeTrainingState: StateResponseData;
} = {
  fetchEmployeeTrainingState: {
    state: StateOptions.INITIAL,
    data: null,
    status: null,
    loading: false,
    error: false,
    message: "",
  },
  addEmployeeTrainingState: {
    state: StateOptions.INITIAL,
    data: null,
    status: null,
    loading: false,
    error: false,
    message: "",
  },
};

const EmployeeTrainingSlice = createSlice({
  name: "employeeTraining",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all employee trainings
      .addCase(fetchAllEmployeeTraining.fulfilled, (state, action) => {
        state.fetchEmployeeTrainingState.data = action.payload;
        state.fetchEmployeeTrainingState.loading = false;
        state.fetchEmployeeTrainingState.error = false;
        state.fetchEmployeeTrainingState.state = StateOptions.FULFILLED;
      })
      .addCase(fetchAllEmployeeTraining.pending, (state) => {
        state.fetchEmployeeTrainingState.loading = true;
        state.fetchEmployeeTrainingState.error = false;
        state.fetchEmployeeTrainingState.state = StateOptions.PENDING;
      })
      .addCase(fetchAllEmployeeTraining.rejected, (state, action) => {
        state.fetchEmployeeTrainingState.error = true;
        state.fetchEmployeeTrainingState.loading = false;
        state.fetchEmployeeTrainingState.message = action.error.message;
        state.fetchEmployeeTrainingState.state = StateOptions.REJECTED;
      })
      // Add employee training
      .addCase(addEmployeeTraining.fulfilled, (state, action) => {
        state.addEmployeeTrainingState.data = action.payload;
        state.addEmployeeTrainingState.message = "Employee Training added successfully!";
        state.addEmployeeTrainingState.loading = false;
        state.addEmployeeTrainingState.error = false;
        state.addEmployeeTrainingState.state = StateOptions.FULFILLED;
      })
      .addCase(addEmployeeTraining.pending, (state) => {
        state.addEmployeeTrainingState.loading = true;
        state.addEmployeeTrainingState.error = false;
        state.addEmployeeTrainingState.state = StateOptions.PENDING;
      })
      .addCase(addEmployeeTraining.rejected, (state, action) => {
        const { message } = action.error;
        state.addEmployeeTrainingState.error = true;
        state.addEmployeeTrainingState.loading = false;
        state.addEmployeeTrainingState.message =
          action.error.message || "Adding Employee Training failed";
        state.addEmployeeTrainingState.state = StateOptions.REJECTED;
      })
      ;
  },
});

export const EmployeeTrainingSliceAction = EmployeeTrainingSlice.actions;
export default EmployeeTrainingSlice.reducer;
