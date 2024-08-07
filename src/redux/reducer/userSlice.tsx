import { createSlice } from "@reduxjs/toolkit";
import { fetchUserInfo, updateUser } from "../action/UserAction";
import { StateOptions } from "../../util/enum";

const initialState: {
  fetchUserInfoState: StateResponseData;
  updateState: StateResponseData;
} = {
  fetchUserInfoState: {
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
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        state.fetchUserInfoState.data = action.payload;
        state.fetchUserInfoState.loading = false;
        state.fetchUserInfoState.error = false;
        state.fetchUserInfoState.state = StateOptions.FULFILLED;
      })
      .addCase(fetchUserInfo.pending, (state) => {
        state.fetchUserInfoState.loading = true;
        state.fetchUserInfoState.error = false;
        state.fetchUserInfoState.state = StateOptions.PENDING;
      })
      .addCase(fetchUserInfo.rejected, (state, action) => {
        state.fetchUserInfoState.error = true;
        state.fetchUserInfoState.loading = false;
        state.fetchUserInfoState.message = action.error.message;
        state.fetchUserInfoState.state = StateOptions.REJECTED;
      })
      
      // Update User
      .addCase(updateUser.fulfilled, (state, action) => {
        state.updateState.data = action.payload;
        state.updateState.message = "User updated successfully!";
        state.updateState.loading = false;
        state.updateState.error = false;
        state.updateState.state = StateOptions.FULFILLED;
      })
      .addCase(updateUser.pending, (state) => {
        state.updateState.loading = true;
        state.updateState.error = false;
        state.updateState.state = StateOptions.PENDING;
      })
      .addCase(updateUser.rejected, (state, action) => {
        const { message } = action.error;
        state.updateState.error = true;
        state.updateState.loading = false;
        state.updateState.message =
          action.error.message || "Updating user failed";
        state.updateState.state = StateOptions.REJECTED;
      })
      ;
  },
});

export const userSliceAction = userSlice.actions;
export default userSlice.reducer;
