import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ISearch } from "../interface";
import { BikePoints } from "../types";

const initialState: ISearch = {
  bikePoints: [],
  loading: false,
  error: false,
};

export const fetchSearchResult = createAsyncThunk(
  "home/search",
  async (searchTerm: string, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://api.tfl.gov.uk/BikePoint/Search?query=regent`
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

const searchDataSlice = createSlice({
  name: "home/search",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchSearchResult.pending as any]: (state) => {
      return { ...state, loading: true };
    },
    [fetchSearchResult.rejected as any]: (state, action) => {
      return { ...state, error: action.error.message, loading: false };
    },
    [fetchSearchResult.fulfilled as any]: (state, action) => {
      const { arg } = action.meta;
      const result = action.payload.filter((value: BikePoints) => {
        return value.id.includes(arg);
      });
      localStorage.setItem(arg, JSON.stringify(result));
      return { ...state, loading: false, bikePoints: result };
    },
  },
});

export default searchDataSlice.reducer;
