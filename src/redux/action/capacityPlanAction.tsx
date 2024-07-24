import URL from "../../util/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAllCapacityPlan = createAsyncThunk(
  "capacityplan/fetchAll",
  async (filters: capacityPlanFilters) => {
    try {
      const token = "Bearer " + localStorage.getItem("token");

      const params = new URLSearchParams();
      if (filters.searchKey) params.append("search", filters.searchKey);
      if (filters.status) params.append("status", filters.status);
      if (filters.industry) params.append("industry", filters.industry);

      const response = await URL.get(`/cp?${params.toString()}`, {
        headers: { "Accept-language": "en", Authorization: token },
      });

      // console.log(response)
      return response.data;
    } catch (error: any) {
      throw error.response.data.message;
    }
  }
);

export const addCapacityPlan = createAsyncThunk<ResponseData, capacityplanInfo>(
  "capacityplan/add",
  async (capacityplanInfo, { rejectWithValue }) => {
    try {
      const token = "Bearer " + localStorage.getItem("token");
      const response = await URL.post("/cp/", capacityplanInfo, {
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

export const deleteCapacityPlan = createAsyncThunk<ResponseData, ItemID>(
  "capacityplan/delete",
  async (id, { rejectWithValue }) => {
    try {
      const token = "Bearer " + localStorage.getItem("token");
      const response = await URL.delete(`/cp/${id}`, {
        headers: { "Accept-language": "en", Authorization: token },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchCPCardsAnalytics = createAsyncThunk(
  "capacityplan/cardsAnalytics",
  async (payload: any) => {
    try {
      const token = "Bearer " + localStorage.getItem("token");

      const params = new URLSearchParams();
      if (payload?.cardAnalyticsYear)
        params.append("year", payload.cardAnalyticsYear);
      const response = await URL.get(
        `/cp/cards/analytics?${params.toString()}`,
        {
          headers: { "Accept-language": "en", Authorization: token },
        }
      );

      console.log(response);
      return response.data;
    } catch (error: any) {
      throw error.response.data.message;
    }
  }
);

export const bulkCreateCapacityPlan = createAsyncThunk<
  ResponseData,
  { info: capacityplanInfo[]; title: string }
>("capacityplan/bulk-create", async (capacityplanInfo, { rejectWithValue }) => {
  try {
    const token = "Bearer " + localStorage.getItem("token");
    const response = await URL.post("/cp/bulk-create", capacityplanInfo, {
      headers: { "Accept-language": "en", Authorization: token },
    });

    console.log(response);
    return response.data;
  } catch (error) {
    return rejectWithValue(error);
    // throw error.response.data.message;
  }
});
