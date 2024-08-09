import URL from "../../util/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUserInfo = createAsyncThunk("user/info", async () => {
  try {
    const token = "Bearer " + localStorage.getItem("token");
    const response = await URL.get("/user/info", {
      headers: { "Accept-language": "en", Authorization: token },
    });
    //
    // debugger;
    return response.data;
  } catch (error: any) {
    throw error.response.data.message;
  }
});

export const verifyOTP = createAsyncThunk("verify/OTP", async (otp: string) => {
  try {
    const token = "Bearer " + localStorage.getItem("token");
    const response = await URL.post(
      "/auth/verifyOTP",
      { otp },
      { headers: { "Accept-language": "en", Authorization: token } }
    );
    return response.data;
  } catch (error: any) {
    throw error.response.data.message;
  }
});

export const userInfoAnalytics = createAsyncThunk(
  "user/dashboard/info",
  async () => {
    try {
      const token = "Bearer " + localStorage.getItem("token");
      const response = await URL.get("/user/info/analytics1", {
        headers: { "Accept-language": "en", Authorization: token },
      });
      return response.data;
    } catch (error: any) {
      throw error.response.data.message;
    }
  }
);

export const updateUser = createAsyncThunk<
  ResponseData,
  { data: IUserInfo | any; id: string }
>("user/update", async (updateInfo, { rejectWithValue }) => {
  try {
    const token = "Bearer " + localStorage.getItem("token");
    const { id, data } = updateInfo;

    const response = await URL.patch(`/user/${id}`, data, {
      headers: { "Accept-language": "en", Authorization: token },
    });

    return response.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});
