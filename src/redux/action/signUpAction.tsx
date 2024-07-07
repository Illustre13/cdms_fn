import URL from "../../util/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { clearSessionStorage } from "../../util/helper";

export const handleSignup = createAsyncThunk<ResponseData, signupInfoData>(
	"signup",
	async (signupInfoData, { rejectWithValue }) => {
		try {
			const signUpDataRequest = await URL.post("/auth/signup", signupInfoData);
			const signUpDataResponse = await signUpDataRequest.data;
			if (signUpDataResponse?.success) {
				clearSessionStorage([
					"firstName",
					"middleName",
					"lastName",
					"email",
					"phoneNumber",
					"gender",
					"nationality",
					"profileImage",
					"rssbNo",
					"idNumber",
					"address",
					"password",
					"confirmPassword",
					"organizationName",
					"organizationDisplayName",
					"organizationLogoUrl",
					"organizationAboutUs",
					"organizationMission",
					"organizationVision",
					"organizationIndustry",
					"organizationAddress",
					"organizationPhoneNumber",
					"organizationEmail",
					"organizationWebsite",
					"organizationTinNo",
					"department",
					"position",
				]);
			}

			return signUpDataResponse;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);
