import { combineReducers, configureStore } from "@reduxjs/toolkit";
import themeConfigSlice from "../reducer/themeConfigSlice";
import loginSlice from "../reducer/loginSlice";
import signUpSlice from "../reducer/signUpSlice";
import TFASlice from "../reducer/2FASlice";
import GetOTPSlice from "../reducer/GetOTPSlice";
import userSlice from "../reducer/userSlice";
import organizationSlice from "../reducer/organizationSlice";
import capacityPlanSlice from "../reducer/capacityPlanSlice";

const rootReducer = combineReducers({
  themeConfig: themeConfigSlice,
  login: loginSlice,
  signUp: signUpSlice,
  tfa: TFASlice,
  getOtp: GetOTPSlice,
  user: userSlice,
  organization: organizationSlice,
  capacityPlan: capacityPlanSlice,
});

const store = configureStore({
  reducer: rootReducer,
});

// export type IRootState = ReturnType<typeof rootReducer>;

export type IRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
