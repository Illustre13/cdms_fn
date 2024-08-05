import URL from "../../util/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAllEmployeeTraining = createAsyncThunk<ResponseData, ItemID>(
  "employeeTraining/fetchAll",
  async (trainingId, {rejectWithValue}) => {
    try {
      const token = "Bearer " + localStorage.getItem("token");
      const response = await URL.get(`/employee-training/all/${trainingId}`, {
        headers: { "Accept-language": "en", Authorization: token },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const addEmployeeTraining = createAsyncThunk<ResponseData, employeeTrainingAddProp>(
  "employeeTraining/add",
  async (data, { rejectWithValue }) => {
    try {
      const token = "Bearer " + localStorage.getItem("token");
      const response = await URL.post("/employee-training/", data, {
        headers: { "Accept-language": "en", Authorization: token },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
