import { createSlice } from "@reduxjs/toolkit";
import { fetchAllOrganization } from "../action/organizationAction";
import { StateOptions } from "../../util/enum";

const initialState: StateResponseData = {
	state: StateOptions.INITIAL,
	data: null,
	status: null,
	loading: false,
	error: false,
    message: ""
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllOrganization.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.error = false;
      })
      .addCase(fetchAllOrganization.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchAllOrganization.rejected, (state, action) => {
        state.error = true;
        state.loading = false;
        state.message = action.error.message;
      });
  },
});

export default userSlice.reducer;
