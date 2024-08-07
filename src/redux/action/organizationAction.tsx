import URL from "../../util/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAllOrganization = createAsyncThunk(
  "organization/fetchAll",
  async (filters: organizationFilters) => {
    try {
      const token = "Bearer " + localStorage.getItem("token");

      const params = new URLSearchParams();
      if (filters.search) params.append("search", filters.search);
      if (filters.status) params.append("status", filters.status);
      if (filters.industry) params.append("industry", filters.industry);


      const response = await URL.get(`/organization?${params.toString()}`, {
        headers: { "Accept-language": "en", Authorization: token },
      });

      // console.log(response)
      return response.data;
    } catch (error: any) {
      throw error.response.data.message;
    }
  }
);

export const addOrganization = createAsyncThunk<ResponseData, organizationInfo>(
  "organization/add",
  async (organizationInfo, { rejectWithValue }) => {
    try {
      const token = "Bearer " + localStorage.getItem("token");
      const response = await URL.post("/organization/", organizationInfo, {
        headers: { "Accept-language": "en", Authorization: token },
      });

      console.log(response);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
      // throw error.response.data.message;
    }
  }
);

export const deleteOrganization = createAsyncThunk<ResponseData, ItemID>(
  "organization/delete",
  async (id, { rejectWithValue }) => {
    try {
      const token = "Bearer " + localStorage.getItem("token");
      const response = await URL.delete(`/organization/${id}`, {
        headers: { "Accept-language": "en", Authorization: token },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchOrganizationInfo = createAsyncThunk("organization/fetchOrganizationInfo", async () => {
	try {
		const token = "Bearer " + localStorage.getItem("token");
		const response = await URL.get("/organization/info", {
			headers: { "Accept-language": "en", Authorization: token },
		});
		return response.data;
	} catch (error: any) {
		throw error.response.data.message;
	}
});

export const updateOrganization = createAsyncThunk<
  ResponseData,
  { data: organizationInfo | any; id: string }
>("organization/update", async (organizationInfo, { rejectWithValue }) => {
  try {
    const token = "Bearer " + localStorage.getItem("token");
    const { id, data } = organizationInfo;

    const response = await URL.patch(`/organization/${id}`, data, {
      headers: { "Accept-language": "en", Authorization: token },
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});
