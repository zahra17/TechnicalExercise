import { createSlice, createAsyncThunk, EntityState } from "@reduxjs/toolkit";
import axios from "axios";
import { IServicedata } from "../interface";

const initialState: IServicedata = {
  serviceDatas: [],
  loading: false,
  error: false,
};

export const fetchServiceStatus = createAsyncThunk(
  "home/fetchServices",
  async (payload, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.get(
        "https://api.tfl.gov.uk/Line/Mode/tube,overground,dlr/Status?detail=true"
      );
      return response.data;
    } catch (err: any) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response);
    }
  }
);

const servicDataSlice = createSlice({
  name: "home/fetchServices",
  initialState,
  extraReducers: {
    [fetchServiceStatus.pending as any]: (state) => {
      return { ...state, loading: true };
    },
    [fetchServiceStatus.rejected as any]: (state, action) => {
      return { ...state, error: action.error.message, loading: false };
    },
    [fetchServiceStatus.fulfilled as any]: (state, action) => {
      return { ...state, loading: false, serviceDatas: action.payload };
    },
  },

  reducers: {},
});

export default servicDataSlice.reducer;
