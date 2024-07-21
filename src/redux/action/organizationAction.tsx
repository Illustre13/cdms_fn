import URL from "../../util/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAllOrganization = createAsyncThunk("organization/fetchAll", async () => {
	try {
		const token = "Bearer " + localStorage.getItem("token");
		const response = await URL.get("/organization/", {
			headers: { "Accept-language": "en", Authorization: token },
		});

        // console.log(response)
		return response.data;
	} catch (error: any) {
		throw error.response.data.message;
	}
});

export const addOrganization = createAsyncThunk<ResponseData, organizationInfo>("organization/add", async (organizationInfo, {rejectWithValue}) => {
	try {
		const token = "Bearer " + localStorage.getItem("token");
		const response = await URL.post("/organization/", organizationInfo, {
			headers: { "Accept-language": "en", Authorization: token },
		});

        console.log(response)
		return response.data;
	} catch (error) {
        return rejectWithValue(error);
		// throw error.response.data.message;
	}
});
