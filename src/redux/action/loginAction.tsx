import URL from "../../util/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

interface userCredentials {
	email: string;
	password: string;
	newPassword?: string;
}

export const handleLogin = createAsyncThunk<ResponseData, userCredentials>(
	"login",
	async (userCredentials, { rejectWithValue }) => {
		try {
			const loginDataRequest = await URL.post("/auth/login", userCredentials);
			const loginDataResponse = await loginDataRequest.data;
			if (loginDataResponse?.success) {
				const token = loginDataResponse.data.token;
				localStorage.setItem("token", token);
			}

			return loginDataResponse;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

export const handleResetPassword = createAsyncThunk<ResponseData, userCredentials>(
	"reset/password",
	async (userCredentials, { rejectWithValue }) => {
		try {
			const token = "Bearer " + localStorage.getItem("token");
			const requestPasswordRequest = await URL.post("/auth/reset-password", userCredentials, { headers: { "Accept-language": "en", Authorization: token } });
			const requestPasswordResponse = await requestPasswordRequest.data;
			return requestPasswordResponse;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);
