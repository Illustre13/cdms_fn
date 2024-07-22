import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { handleLogin } from "../action/loginAction";
import { StateOptions } from "../../util/enum";

// interface LoginData {
//   state: string;
//   data: string | null;
//   status: number | null;
//   loading: boolean;
//   error: boolean;
// }

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
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(handleLogin.pending, (state) => {
				state.state = StateOptions.PENDING;
				state.loading = true;
			})
			.addCase(handleLogin.fulfilled, (state, action: PayloadAction<any>) => {
				state.state = StateOptions.FULFILLED;
				state.status = action.payload.status;
				state.data = action.payload.message;
			})
			.addCase(handleLogin.rejected, (state, action: PayloadAction<any>) => {
				state.state = StateOptions.REJECTED;
				console.log(action.payload);
				if (!action.payload.response.data) {
					state.status = action.payload.response.data.status;
					state.error = true;
					state.data = action.payload.message;
					state.message = action.payload.message;
				} else {
					state.status = action.payload.response.data.status;
					state.error = true;
					state.data = action.payload.response.data.message;
				}
			});
	},
});
export const loginSliceAction = loginSlice.actions;
export default loginSlice.reducer;
