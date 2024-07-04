import { combineReducers, configureStore } from "@reduxjs/toolkit";
import themeConfigSlice from "../reducer/themeConfigSlice";
import loginSlice from "../reducer/loginSlice";

const rootReducer = combineReducers({
	themeConfig: themeConfigSlice,
	login: loginSlice,
});

const store = configureStore({
	reducer: rootReducer,
});

export type IRootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export default store;
