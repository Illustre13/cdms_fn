import { combineReducers, configureStore } from "@reduxjs/toolkit";
import themeConfigSlice from "../reducer/themeConfigSlice";
import loginSlice from "../reducer/LoginSlice";
import signUpSlice from "../reducer/signUpSlice";
import TFASlice from "../reducer/2FASlice";
import GetOTPSlice from "../reducer/GetOTPSlice";

const rootReducer = combineReducers({
	themeConfig: themeConfigSlice,
	login: loginSlice,
	signUp: signUpSlice,
	tfa: TFASlice,
	getOtp: GetOTPSlice,
});

const store = configureStore({
	reducer: rootReducer,
});

export type IRootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export default store;
