import URL from "../../util/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAllEmployee = createAsyncThunk<ResponseData, ItemID>(
  "employee/fetchAll",
  async (Id, {rejectWithValue}) => {
    try {
      const token = "Bearer " + localStorage.getItem("token");
      const response = await URL.get(`/employee`, {
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

// export const addEmployee = createAsyncThunk<ResponseData, employeeAddProp>(
//   "employee/add",
//   async (data, { rejectWithValue }) => {
//     try {
//       const token = "Bearer " + localStorage.getItem("token");
//       const response = await URL.post("/employee-/", data, {
//         headers: { "Accept-language": "en", Authorization: token },
//       });
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error);
//     }
//   }
// );
