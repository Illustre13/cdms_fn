import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { handleSignup } from "../action/signUpAction";
import { StateOptions } from "../../util/enum";

const initialState: StateResponseData = {
	state: StateOptions.INITIAL,
	data: null,
	status: null,
	loading: false,
	error: false,
};

const signUpSlice = createSlice({
	name: "signUp",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(handleSignup.pending, (state) => {
				state.state = StateOptions.PENDING;
				state.loading = true;
			})
			.addCase(handleSignup.fulfilled, (state, action: PayloadAction<any>) => {
				console.log(action.payload);
				state.state = StateOptions.FULFILLED;
				state.status = action.payload.status;
				state.data = action.payload.message;
			})
			.addCase(handleSignup.rejected, (state, action: PayloadAction<any>) => {
				state.state = StateOptions.REJECTED;
				console.log(action.payload);
				if (!action.payload.response.data) {
					state.status = action.payload.response.data.status;
					state.error = true;
					state.data = action.payload.message;
				} else {
					state.status = action.payload.response.data.status;
					state.error = true;
					state.data = action.payload.response.data.message;
				}
			});
	},
});
export const signUpSliceAction = signUpSlice.actions;
export default signUpSlice.reducer;
