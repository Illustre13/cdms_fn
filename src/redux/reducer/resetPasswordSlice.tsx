import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { handleResetPassword } from "../action/loginAction";
import { StateOptions } from "../../util/enum";


const initialState: StateResponseData = {
	state: StateOptions.INITIAL,
	data: null,
	status: null,
	loading: false,
	error: false,
};

const resetPasswordSlice = createSlice({
	name: "resetPassword",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(handleResetPassword.pending, (state) => {
				state.state = StateOptions.PENDING;
				state.loading = true;
			})
			.addCase(handleResetPassword.fulfilled, (state, action: PayloadAction<any>) => {
				state.state = StateOptions.FULFILLED;
				state.status = action.payload.status;
				state.data = action.payload.message;
			})
			.addCase(handleResetPassword.rejected, (state, action: PayloadAction<any>) => {
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
export const resetPasswordSliceAction = resetPasswordSlice.actions;
export default resetPasswordSlice.reducer;
