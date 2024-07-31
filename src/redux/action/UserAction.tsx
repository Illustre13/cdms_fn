import URL from "../../util/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUserInfo = createAsyncThunk("user/info", async () => {
	try {
		const token = "Bearer " + localStorage.getItem("token");
		const response = await URL.get("/user/info", {
			headers: { "Accept-language": "en", Authorization: token },
		});
		// console.log(response);
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

export const userInfoAnalytics = createAsyncThunk("user/dashboard/info", async () => {
	try {
		const token = "Bearer " + localStorage.getItem("token");
		const response = await URL.get("/user/dashboard/analytics", {
			headers: { "Accept-language": "en", Authorization: token },
		});
		// console.log(response);
		// debugger;
		return response.data;
	} catch (error: any) {
		throw error.response.data.message;
	}
});
