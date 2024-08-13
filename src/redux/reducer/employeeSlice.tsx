import { createSlice } from "@reduxjs/toolkit";
import {
  fetchAllEmployee,
  fetchAllEmployeeByCP,
  addEmployee,
  updateEmployee,
  deleteEmployee,
  fetchEmployeeInfo,
  bulkCreateEmployee,
} from "../action/employeeAction";
import { StateOptions } from "../../util/enum";

const initialState: {
  fetchEmployeeState: StateResponseData;
  fetchAllEmployeeByCPState: StateResponseData;
  addEmployeeState: StateResponseData;
  updateEmployeeState: StateResponseData;
  deleteEmployeeState: StateResponseData;
  fetchEmployeeInfoState: StateResponseData;
  bulkCreateEmployeeState: StateResponseData;
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
  },
  addEmployeeState: {
    state: StateOptions.INITIAL,
    data: null,
    status: null,
    loading: false,
    error: false,
    message: "",
  },
  updateEmployeeState: {
    state: StateOptions.INITIAL,
    data: null,
    status: null,
    loading: false,
    error: false,
    message: "",
  },
  deleteEmployeeState: {
    state: StateOptions.INITIAL,
    data: null,
    status: null,
    loading: false,
    error: false,
    message: "",
  },
  fetchEmployeeInfoState: {
    state: StateOptions.INITIAL,
    data: null,
    status: null,
    loading: false,
    error: false,
    message: "",
  },
  bulkCreateEmployeeState: {
    state: StateOptions.INITIAL,
    data: null,
    status: null,
    loading: false,
    error: false,
    message: "",
  },
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

      // Add employee
      .addCase(addEmployee.fulfilled, (state, action) => {
        state.addEmployeeState.data = action.payload;
        state.addEmployeeState.message = "Employee added successfully!";
        state.addEmployeeState.loading = false;
        state.addEmployeeState.error = false;
        state.addEmployeeState.state = StateOptions.FULFILLED;
      })
      .addCase(addEmployee.pending, (state) => {
        state.addEmployeeState.loading = true;
        state.addEmployeeState.error = false;
        state.addEmployeeState.state = StateOptions.PENDING;
      })
      .addCase(addEmployee.rejected, (state, action) => {
        const { message } = action.error;
        state.addEmployeeState.error = true;
        state.addEmployeeState.loading = false;
        state.addEmployeeState.message =
          action.error.message || "Adding employee failed";
        state.addEmployeeState.state = StateOptions.REJECTED;
      })

      // Delete Employee

      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.deleteEmployeeState.data = action.payload;
        state.deleteEmployeeState.message = "Employee deleted successfully!";
        state.deleteEmployeeState.loading = false;
        state.deleteEmployeeState.error = false;
        state.deleteEmployeeState.state = StateOptions.FULFILLED;
      })
      .addCase(deleteEmployee.pending, (state) => {
        state.deleteEmployeeState.loading = true;
        state.deleteEmployeeState.error = false;
        state.deleteEmployeeState.state = StateOptions.PENDING;
      })
      .addCase(deleteEmployee.rejected, (state, action) => {
        state.deleteEmployeeState.error = true;
        state.deleteEmployeeState.loading = false;
        state.deleteEmployeeState.message =
          action.error.message || "Deleting employee failed";
        state.deleteEmployeeState.state = StateOptions.REJECTED;
      })
      // Update Employee plan
      .addCase(updateEmployee.fulfilled, (state, action) => {
        state.updateEmployeeState.data = action.payload;
        state.updateEmployeeState.message = "Employee updated successfully!";
        state.updateEmployeeState.loading = false;
        state.updateEmployeeState.error = false;
        state.updateEmployeeState.state = StateOptions.FULFILLED;
      })
      .addCase(updateEmployee.pending, (state) => {
        state.updateEmployeeState.loading = true;
        state.updateEmployeeState.error = false;
        state.updateEmployeeState.state = StateOptions.PENDING;
      })
      .addCase(updateEmployee.rejected, (state, action) => {
        const { message } = action.error;
        state.updateEmployeeState.error = true;
        state.updateEmployeeState.loading = false;
        state.updateEmployeeState.message =
          action.error.message || "Updating employee failed";
        state.updateEmployeeState.state = StateOptions.REJECTED;
      })
      // Fetch Employee by his/her id
      .addCase(fetchEmployeeInfo.fulfilled, (state, action) => {
        state.fetchEmployeeInfoState.data = action.payload;
        state.fetchEmployeeInfoState.message = "Employee updated successfully!";
        state.fetchEmployeeInfoState.loading = false;
        state.fetchEmployeeInfoState.error = false;
        state.fetchEmployeeInfoState.state = StateOptions.FULFILLED;
      })
      .addCase(fetchEmployeeInfo.pending, (state) => {
        state.fetchEmployeeInfoState.loading = true;
        state.fetchEmployeeInfoState.error = false;
        state.fetchEmployeeInfoState.state = StateOptions.PENDING;
      })
      .addCase(fetchEmployeeInfo.rejected, (state, action) => {
        const { message } = action.error;
        state.fetchEmployeeInfoState.error = true;
        state.fetchEmployeeInfoState.loading = false;
        state.fetchEmployeeInfoState.message =
          action.error.message || "Updating employee failed";
        state.fetchEmployeeInfoState.state = StateOptions.REJECTED;
      })

      // Bulk create employee
      .addCase(bulkCreateEmployee.fulfilled, (state, action) => {
        state.bulkCreateEmployeeState.data = action.payload;
        state.bulkCreateEmployeeState.message =
          "Created Employee in Bulks successfully!";
        state.bulkCreateEmployeeState.loading = false;
        state.bulkCreateEmployeeState.error = false;
        state.bulkCreateEmployeeState.state = StateOptions.FULFILLED;
      })
      .addCase(bulkCreateEmployee.pending, (state) => {
        state.bulkCreateEmployeeState.loading = true;
        state.bulkCreateEmployeeState.error = false;
        state.bulkCreateEmployeeState.state = StateOptions.PENDING;
      })
      .addCase(bulkCreateEmployee.rejected, (state, action) => {
        state.bulkCreateEmployeeState.error = true;
        state.bulkCreateEmployeeState.loading = false;
        state.bulkCreateEmployeeState.message =
          action.error.message || "Employee bulk create failed";
        state.bulkCreateEmployeeState.state = StateOptions.REJECTED;
      });
  },
});

export const EmployeeSliceAction = EmployeeSlice.actions;
export default EmployeeSlice.reducer;
