import { combineReducers, configureStore } from "@reduxjs/toolkit";
import themeConfigSlice from "../reducer/themeConfigSlice";
import loginSlice from "../reducer/loginSlice";
import signUpSlice from "../reducer/signUpSlice";
import TFASlice from "../reducer/2FASlice";
import GetOTPSlice from "../reducer/GetOTPSlice";
import userSlice from "../reducer/userSlice";
import organizationSlice from "../reducer/organizationSlice";
import capacityPlanSlice from "../reducer/capacityPlanSlice";
import analyticsSlice from "../reducer/analyticsSlice";
import trainingSlice from "../reducer/trainingSlice";
import employeeTrainingSlice from "../reducer/employeeTrainingSlice";

const rootReducer = combineReducers({
  themeConfig: themeConfigSlice,
  login: loginSlice,
  signUp: signUpSlice,
  tfa: TFASlice,
  getOtp: GetOTPSlice,
  user: userSlice,
  organization: organizationSlice,
  capacityPlan: capacityPlanSlice,
  analytics: analyticsSlice,
  training: trainingSlice,
  employeeTraining: employeeTrainingSlice,
});

const store = configureStore({
  reducer: rootReducer,
});

// export type IRootState = ReturnType<typeof rootReducer>;

export type IRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
