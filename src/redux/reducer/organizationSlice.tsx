import { createSlice } from "@reduxjs/toolkit";
import {
  addOrganization,
  fetchAllOrganization,
  fetchOrganizationInfo,
  deleteOrganization,
  updateOrganization,
} from "../action/organizationAction";
import { StateOptions } from "../../util/enum";

const initialState: {
  fetchState: StateResponseData;
  addState: StateResponseData;
  deleteState: StateResponseData;
  fetchOrganizationInfoState: StateResponseData;
  updateOrganizationState: StateResponseData;
} = {
  fetchState: {
    state: StateOptions.INITIAL,
    data: null,
    status: null,
    loading: false,
    error: false,
    message: "",
  },
  fetchOrganizationInfoState: {
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
  updateOrganizationState: {
    state: StateOptions.INITIAL,
    data: null,
    status: null,
    loading: false,
    error: false,
    message: "",
  },
};

const organizationSlice = createSlice({
  name: "organization",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all organizations
      .addCase(fetchAllOrganization.fulfilled, (state, action) => {
        state.fetchState.data = action.payload;
        state.fetchState.loading = false;
        state.fetchState.error = false;
        state.fetchState.state = StateOptions.FULFILLED;
      })
      .addCase(fetchAllOrganization.pending, (state) => {
        state.fetchState.loading = true;
        state.fetchState.error = false;
        state.fetchState.state = StateOptions.PENDING;
      })
      .addCase(fetchAllOrganization.rejected, (state, action) => {
        state.fetchState.error = true;
        state.fetchState.loading = false;
        state.fetchState.message = action.error.message;
        state.fetchState.state = StateOptions.REJECTED;
      })
      // Add organization
      .addCase(addOrganization.fulfilled, (state, action) => {
        state.addState.data = action.payload;
        state.addState.message = "Organization added successfully!";
        state.addState.loading = false;
        state.addState.error = false;
        state.addState.state = StateOptions.FULFILLED;
      })
      .addCase(addOrganization.pending, (state) => {
        state.addState.loading = true;
        state.addState.error = false;
        state.addState.state = StateOptions.PENDING;
      })
      .addCase(addOrganization.rejected, (state, action) => {
        state.addState.error = true;
        state.addState.loading = false;
        state.addState.message =
          action.error.message || "Adding organization failed";
        state.addState.state = StateOptions.REJECTED;
      })

      // Delete Organization

      .addCase(deleteOrganization.fulfilled, (state, action) => {
        state.deleteState.data = action.payload;
        state.deleteState.message = "Organization deleted successfully!";
        state.deleteState.loading = false;
        state.deleteState.error = false;
        state.deleteState.state = StateOptions.FULFILLED;
      })
      .addCase(deleteOrganization.pending, (state) => {
        state.deleteState.loading = true;
        state.deleteState.error = false;
        state.deleteState.state = StateOptions.PENDING;
      })
      .addCase(deleteOrganization.rejected, (state, action) => {
        state.deleteState.error = true;
        state.deleteState.loading = false;
        state.deleteState.message =
          action.error.message || "Deleting organization failed";
        state.deleteState.state = StateOptions.REJECTED;
      })
      
      // Fetch organizations
      .addCase(fetchOrganizationInfo.fulfilled, (state, action) => {
        state.fetchOrganizationInfoState.data = action.payload;
        state.fetchOrganizationInfoState.loading = false;
        state.fetchOrganizationInfoState.error = false;
        state.fetchOrganizationInfoState.state = StateOptions.FULFILLED;
      })
      .addCase(fetchOrganizationInfo.pending, (state) => {
        state.fetchOrganizationInfoState.loading = true;
        state.fetchOrganizationInfoState.error = false;
        state.fetchOrganizationInfoState.state = StateOptions.PENDING;
      })
      .addCase(fetchOrganizationInfo.rejected, (state, action) => {
        state.fetchOrganizationInfoState.error = true;
        state.fetchOrganizationInfoState.loading = false;
        state.fetchOrganizationInfoState.message = action.error.message;
        state.fetchOrganizationInfoState.state = StateOptions.REJECTED;
      })

      // Update organization
      .addCase(updateOrganization.fulfilled, (state, action) => {
        state.updateOrganizationState.data = action.payload;
        state.updateOrganizationState.message = "Organization updated successfully!";
        state.updateOrganizationState.loading = false;
        state.updateOrganizationState.error = false;
        state.updateOrganizationState.state = StateOptions.FULFILLED;
      })
      .addCase(updateOrganization.pending, (state) => {
        state.updateOrganizationState.loading = true;
        state.updateOrganizationState.error = false;
        state.updateOrganizationState.state = StateOptions.PENDING;
      })
      .addCase(updateOrganization.rejected, (state, action) => {
        state.updateOrganizationState.error = true;
        state.updateOrganizationState.loading = false;
        state.updateOrganizationState.message =
          action.error.message || "Updating organization failed";
        state.updateOrganizationState.state = StateOptions.REJECTED;
      })
      ;
  },
});

export const organizationSliceAction = organizationSlice.actions;
export default organizationSlice.reducer;
