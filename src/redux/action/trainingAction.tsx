import URL from "../../util/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAllTraining = createAsyncThunk(
  "training/fetchAll",
  async (filters: trainingFilters) => {
    try {
      const token = "Bearer " + localStorage.getItem("token");

      const params = new URLSearchParams();
      if (filters.searchKey) params.append("search", filters.searchKey);
      if (filters.status) params.append("status", filters.status);
      if (filters.industry) params.append("industry", filters.industry);

      const response = await URL.get(`/training?${params.toString()}`, {
        headers: { "Accept-language": "en", Authorization: token },
      });

      // console.log(response)
      return response.data;
    } catch (error: any) {
      throw error.response.data.message;
    }
  }
);

export const addTraining = createAsyncThunk<ResponseData, trainingInfo>(
  "training/add",
  async (trainingInfo, { rejectWithValue }) => {
    try {
      const token = "Bearer " + localStorage.getItem("token");
      const response = await URL.post("/training/", trainingInfo, {
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

export const deleteTraining = createAsyncThunk<ResponseData, ItemID>(
  "training/delete",
  async (id, { rejectWithValue }) => {
    try {
      const token = "Bearer " + localStorage.getItem("token");
      const response = await URL.delete(`/training/${id}`, {
        headers: { "Accept-language": "en", Authorization: token },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchCPCardsAnalytics = createAsyncThunk(
  "training/cardsAnalytics",
  async (payload: any) => {
    try {
      const token = "Bearer " + localStorage.getItem("token");

      const params = new URLSearchParams();
      if (payload?.cardAnalyticsYear)
        params.append("year", payload.cardAnalyticsYear);
      const response = await URL.get(
        `/training/cards/analytics?${params.toString()}`,
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

export const bulkCreateTraining = createAsyncThunk<
  ResponseData,
  { info: trainingInfo[]; title: string }
>("training/bulk-create", async (trainingInfo, { rejectWithValue }) => {
  try {
    const token = "Bearer " + localStorage.getItem("token");
    const response = await URL.post("/training/bulk-create", trainingInfo, {
      headers: { "Accept-language": "en", Authorization: token },
    });

    console.log(response);
    return response.data;
  } catch (error) {
    return rejectWithValue(error);
    // throw error.response.data.message;
  }
});

export const updateTraining = createAsyncThunk<
  ResponseData,
  { data: trainingInfo | any; id: string }
>("training/update", async (updateInfo, { rejectWithValue }) => {
  try {
    const token = "Bearer " + localStorage.getItem("token");
    const { id, data } = updateInfo;

    const response = await URL.patch(`/training/${id}`, data, {
      headers: { "Accept-language": "en", Authorization: token },
    });

    console.log(response);
    return response.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const fetchCPBudgetAnalytics = createAsyncThunk(
  "training/budget/analytics",
  async (payload: any) => {
    try {
      const token = "Bearer " + localStorage.getItem("token");

      const params = new URLSearchParams();
      if (payload?.cardAnalyticsYear)
        params.append("year", payload.cardAnalyticsYear);
      const response = await URL.get(
        `/training/budget/analytics?${params.toString()}`,
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

export const fetchTrainingInfo = createAsyncThunk<ResponseData, ItemID>(
  "training/getOneById",
  async (id, { rejectWithValue }) => {
    try {
      const token = "Bearer " + localStorage.getItem("token");
      const response = await URL.get(`/training/${id}`, {
        headers: { "Accept-language": "en", Authorization: token },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
