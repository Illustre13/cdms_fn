import URL from "../../util/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

interface userCredentials {
	email: string;
	password: string;
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
