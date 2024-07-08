import URL from "../../util/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getOtp = createAsyncThunk("verify/OTP", async () => {
	try {
		const token = "Bearer " + localStorage.getItem("token");
		const response = await URL.get("/auth/sendOTP", {
			headers: { "Accept-language": "en", Authorization: token },
		});
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
