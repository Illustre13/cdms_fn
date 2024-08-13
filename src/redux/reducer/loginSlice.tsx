import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { handleLogin } from "../action/loginAction";
import { StateOptions } from "../../util/enum";

const initialState: StateResponseData = {
  state: StateOptions.INITIAL,
  data: null,
  status: null,
  loading: false,
  error: false,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    resetLoginState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(handleLogin.pending, (state) => {
        state.state = StateOptions.PENDING;
        state.loading = true;
      })
      .addCase(handleLogin.fulfilled, (state, action: PayloadAction<any>) => {
        state.state = StateOptions.FULFILLED;
        state.status = action.payload.status;
        state.data = action.payload;
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(handleLogin.rejected, (state, action: PayloadAction<any>) => {
        state.state = StateOptions.REJECTED;
        state.loading = false;
        state.status = action.payload.response.data.status;
        state.error = true;
        state.message = action.payload.response.data.message || "Login failed";
        state.data =
          action.payload.response.data.message || action.payload.message;
      });
  },
});
export const { resetLoginState } = loginSlice.actions;
export default loginSlice.reducer;
