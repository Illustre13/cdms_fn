import URL from "../../util/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAllEmployee = createAsyncThunk(
  "employee/fetchAll",
  async (filters: EmployeeFilters, {rejectWithValue}) => {
    try {
      const params = new URLSearchParams();
      if (filters.searchKey) params.append("search", filters.searchKey);
      if (filters.status) params.append("status", filters.status);
      const token = "Bearer " + localStorage.getItem("token");
      const response = await URL.get(`/employee?${params.toString()}`, {
        headers: { "Accept-language": "en", Authorization: token },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchAllEmployeeByCP = createAsyncThunk(
    "employee/fetchAllByCp",
    async (capacityPlanId: string, {rejectWithValue}) => {
      try {
        const params = new URLSearchParams();
        if(capacityPlanId) params.append("capacityPlanId", capacityPlanId);
        const token = "Bearer " + localStorage.getItem("token");
        const response = await URL.get(`/employee?${params.toString()}`, {
          headers: { "Accept-language": "en", Authorization: token },
        });
        return response.data;
      } catch (error) {
        return rejectWithValue(error);
      }
    }
  );

export const addEmployee = createAsyncThunk<ResponseData, employeeInfo>(
  "employee/add",
  async (data, { rejectWithValue }) => {
    try {
      const token = "Bearer " + localStorage.getItem("token");
      const response = await URL.post("/employee/", data, {
        headers: { "Accept-language": "en", Authorization: token },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateEmployee = createAsyncThunk<
  ResponseData,
  { data: employeeInfo | any; id: string }
>("employee/update", async (updateInfo, { rejectWithValue }) => {
  try {
    const token = "Bearer " + localStorage.getItem("token");
    const { id, data } = updateInfo;

    const response = await URL.patch(`/employee/${id}`, data, {
      headers: { "Accept-language": "en", Authorization: token },
    });

    console.log(response);
    return response.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const deleteEmployee = createAsyncThunk<ResponseData, string>(
  "employee/delete",
  async (id, { rejectWithValue }) => {
    try {
      const token = "Bearer " + localStorage.getItem("token");
      const response = await URL.delete(`/employee/${id}`, {
        headers: { "Accept-language": "en", Authorization: token },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchEmployeeInfo = createAsyncThunk<ResponseData, string>(
  "employee/getOneById",
  async (id, { rejectWithValue }) => {
    try {
      const token = "Bearer " + localStorage.getItem("token");
      const response = await URL.get(`/employee/${id}`, {
        headers: { "Accept-language": "en", Authorization: token },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const bulkCreateEmployee = createAsyncThunk<
  ResponseData,
  { data: employeeBulkProp; }
>("capacityplan/bulk-create", async (data, { rejectWithValue }) => {
  try {
    const token = "Bearer " + localStorage.getItem("token");
    const response = await URL.post("/employee/bulk-create", data, {
      headers: { "Accept-language": "en", Authorization: token },
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});