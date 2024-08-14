import URL from "../../util/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAllComment = createAsyncThunk(
  "comment/fetchAll",
  async (filters: {cpId?: string}, { rejectWithValue }) => {
    try {
      const params = new URLSearchParams();
      if (filters.cpId) params.append("capacityPlanId", filters.cpId);
      const token = "Bearer " + localStorage.getItem("token");
      const response = await URL.get(`/comment?${params.toString()}`, {
        headers: { "Accept-language": "en", Authorization: token },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const addComment = createAsyncThunk<ResponseData, {capacityPlanId: string, comment: string}>(
  "comment/add",
  async (data, { rejectWithValue }) => {
    try {
      const token = "Bearer " + localStorage.getItem("token");
      const response = await URL.post("/comment/", data, {
        headers: { "Accept-language": "en", Authorization: token },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateComment = createAsyncThunk<
  ResponseData,
  { data: string | any; id: string }
>("comment/update", async (updateInfo, { rejectWithValue }) => {
  try {
    const token = "Bearer " + localStorage.getItem("token");
    const { id, data } = updateInfo;

    const response = await URL.patch(`/comment/${id}`, data, {
      headers: { "Accept-language": "en", Authorization: token },
    });

    return response.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const deleteComment = createAsyncThunk<ResponseData, string>(
  "comment/delete",
  async (id, { rejectWithValue }) => {
    try {
      const token = "Bearer " + localStorage.getItem("token");
      const response = await URL.delete(`/comment/${id}`, {
        headers: { "Accept-language": "en", Authorization: token },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
