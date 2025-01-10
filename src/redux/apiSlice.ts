import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define API base URL (replace with your own API URL)
const API_URL = 'https://your-api-endpoint.com';

// Async function to fetch data using Axios
export const fetchDashboardData = createAsyncThunk(
  'api/fetchDashboardData',
  async () => {
    const response = await axios.get(`${API_URL}/dashboard`);
    return response.data;
  }
);

const apiSlice = createSlice({
  name: 'api',
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDashboardData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchDashboardData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default apiSlice.reducer;
