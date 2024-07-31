import { createSlice } from "@reduxjs/toolkit";
import { userInfoAnalytics } from "../action/UserAction";
import { StateOptions } from "../../util/enum";

const initialState: {
fetchUserAnalyticState: StateResponseData;
} = {
  fetchUserAnalyticState: {
    state: StateOptions.INITIAL,
    data: null,
    status: null,
    loading: false,
    error: false,
    message: "",
  }
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // User Dashboard Analytics
      .addCase(userInfoAnalytics.fulfilled, (state, action) => {
        state.fetchUserAnalyticState.data = action.payload;
        state.fetchUserAnalyticState.loading = false;
        state.fetchUserAnalyticState.error = false;
        state.fetchUserAnalyticState.state = StateOptions.FULFILLED;
      })
      .addCase(userInfoAnalytics.pending, (state) => {
        state.fetchUserAnalyticState.loading = true;
        state.fetchUserAnalyticState.error = false;
        state.fetchUserAnalyticState.state = StateOptions.PENDING;
      })
      .addCase(userInfoAnalytics.rejected, (state, action) => {
        state.fetchUserAnalyticState.error = true;
        state.fetchUserAnalyticState.loading = false;
        state.fetchUserAnalyticState.message = action.error.message;
        state.fetchUserAnalyticState.state = StateOptions.REJECTED;
      })
      ;
  },
});

export default userSlice.reducer;
