import URL from "../../util/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAllOrganization = createAsyncThunk("organization/", async () => {
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

