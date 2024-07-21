import { createSlice } from "@reduxjs/toolkit";
import { addOrganization, fetchAllOrganization } from "../action/organizationAction";
import { StateOptions } from "../../util/enum";

const initialState: {
    fetchState: StateResponseData;
    addState: StateResponseData;
  } = {
    fetchState: {
      state: StateOptions.INITIAL,
      data: null,
      status: null,
      loading: false,
      error: false,
      message: ""
    },
    addState: {
      state: StateOptions.INITIAL,
      data: null,
      status: null,
      loading: false,
      error: false,
      message: ""
    }
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
        state.addState.message = action.error.message || "Adding organization failed";
        state.addState.state = StateOptions.REJECTED;
      });
  },
});

export const organizationSliceAction = organizationSlice.actions;
export default organizationSlice.reducer;
