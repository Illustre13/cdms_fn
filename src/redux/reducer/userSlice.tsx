import { createSlice } from "@reduxjs/toolkit";
import { fetchUserInfo } from "../action/UserAction";

interface IndexState {
  data: object;
  status: string;
  message: string | undefined;
  isLoading: boolean;
  error: boolean;
}

const initialState: IndexState = {
  data: {},
  status: "",
  message: "",
  isLoading: false,
  error: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isLoading = false;
        state.error = false;
      })
      .addCase(fetchUserInfo.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(fetchUserInfo.rejected, (state, action) => {
        state.error = true;
        state.isLoading = false;
        state.message = action.error.message;
      });
  },
});

export default userSlice.reducer;
