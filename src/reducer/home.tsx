import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { IServiceData } from '../interface'

export const fetchServiceStatus = createAsyncThunk(
  'home/fetchServices',
  async (payload, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.get('https://api.tfl.gov.uk/Line/Mode/tube,overground,dlr/Status?detail=true')
      return response.data
    } catch (err: any) {
      if (!err.response) {
        throw err
      }
      return rejectWithValue(err.response)
    }
  }
);


const servicDataSlice = createSlice(
  {
    name: 'home/fetchServices',
    initialState: {
      serviceDatas: [] as Array<IServiceData>,
      loading: false,
      error: false,
    } as any,
    extraReducers: {
      [fetchServiceStatus.pending as any]: (state: any) => {
        return { ...state, loading: true } as any;
      },
      [fetchServiceStatus.rejected as any]: (state: any, action: any) => {
        return { ...state, error: action.error.message, loading: false } as any;
      },
      [fetchServiceStatus.fulfilled as any]: (state: any, action: any) => {
        return { ...state, loading: false, serviceDatas: action.payload };
      },
    },

    reducers: {}
  }
)

export default servicDataSlice.reducer;
