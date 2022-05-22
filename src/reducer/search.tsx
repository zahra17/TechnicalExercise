import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import {ISearch} from '../interface'


const initialState: ISearch = {
  bikePoints: [],
  loading: false,
  error:false,

}

export const fetchSearchResult = createAsyncThunk(
  'home/search',
  async (searchTerm: string, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.get(`https://api.tfl.gov.uk/BikePoint/Search?query=regent`)
      return response.data
    } catch (err: any) {
      if (!err.response) {
        throw err
      }
      return rejectWithValue(err.response)
    }
  }
)

const searchDataSlice = createSlice(
  {
    name: 'home/search',
    initialState,
    reducers: {
    },
    extraReducers: {
      [fetchSearchResult.pending as any]: (state: any) => {
        return { ...state, loading: true } as any;
      },
      [fetchSearchResult.rejected as any]: (state: any, action: any) => {
        return { ...state, error: action.error.message, loading: false } as any;
      },
      [fetchSearchResult.fulfilled as any]: (state: any, action: any) => {
        const { arg } = action.meta
        const result = action.payload.filter((value: any) => {
          return value.id.includes(arg);

        })
        return { ...state, loading: false, bikePoints: result };
      },
    },


  }
)


export default searchDataSlice.reducer;
