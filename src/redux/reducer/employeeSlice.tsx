import { createSlice } from "@reduxjs/toolkit";
import {
  fetchAllEmployee, fetchAllEmployeeByCP
} from "../action/employeeAction";
import { StateOptions } from "../../util/enum";

const initialState: {
  fetchEmployeeState: StateResponseData;
  fetchAllEmployeeByCPState: StateResponseData;
} = {
  fetchEmployeeState: {
    state: StateOptions.INITIAL,
    data: null,
    status: null,
    loading: false,
    error: false,
    message: "",
  },
  fetchAllEmployeeByCPState: {
    state: StateOptions.INITIAL,
    data: null,
    status: null,
    loading: false,
    error: false,
    message: "",
  }
};

const EmployeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all employee
      .addCase(fetchAllEmployee.fulfilled, (state, action) => {
        state.fetchEmployeeState.data = action.payload;
        state.fetchEmployeeState.loading = false;
        state.fetchEmployeeState.error = false;
        state.fetchEmployeeState.state = StateOptions.FULFILLED;
      })
      .addCase(fetchAllEmployee.pending, (state) => {
        state.fetchEmployeeState.loading = true;
        state.fetchEmployeeState.error = false;
        state.fetchEmployeeState.state = StateOptions.PENDING;
      })
      .addCase(fetchAllEmployee.rejected, (state, action) => {
        state.fetchEmployeeState.error = true;
        state.fetchEmployeeState.loading = false;
        state.fetchEmployeeState.message = action.error.message;
        state.fetchEmployeeState.state = StateOptions.REJECTED;
      })
     
      // Fetch all employee by CP
      .addCase(fetchAllEmployeeByCP.fulfilled, (state, action) => {
        state.fetchAllEmployeeByCPState.data = action.payload;
        state.fetchAllEmployeeByCPState.loading = false;
        state.fetchAllEmployeeByCPState.error = false;
        state.fetchAllEmployeeByCPState.state = StateOptions.FULFILLED;
      })
      .addCase(fetchAllEmployeeByCP.pending, (state) => {
        state.fetchAllEmployeeByCPState.loading = true;
        state.fetchAllEmployeeByCPState.error = false;
        state.fetchAllEmployeeByCPState.state = StateOptions.PENDING;
      })
      .addCase(fetchAllEmployeeByCP.rejected, (state, action) => {
        state.fetchAllEmployeeByCPState.error = true;
        state.fetchAllEmployeeByCPState.loading = false;
        state.fetchAllEmployeeByCPState.message = action.error.message;
        state.fetchAllEmployeeByCPState.state = StateOptions.REJECTED;
      })
     
      ;
  },
});

export const EmployeeSliceAction = EmployeeSlice.actions;
export default EmployeeSlice.reducer;
