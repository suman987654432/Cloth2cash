import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Fetch all pickups
export const fetchPickups = createAsyncThunk(
  'pickups/fetchPickups',
  async () => {
    const response = await fetch('https://cloth2cash.onrender.com/api/schedule');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  }
);

// Update pickup status
export const updatePickupStatus = createAsyncThunk(
  'pickups/updatePickupStatus',
  async ({ pickupId, status }) => {
    const response = await fetch(`https://cloth2cash.onrender.com/api/schedule/${pickupId}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status} - ${await response.text()}`);
    }
    return await response.json();
  }
);

const pickupsSlice = createSlice({
  name: 'pickups',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch pickups
      .addCase(fetchPickups.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPickups.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchPickups.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      
      // Update pickup status
      .addCase(updatePickupStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePickupStatus.fulfilled, (state, action) => {
        state.loading = false;
        // Update the specific pickup in the array
        const index = state.data.findIndex(pickup => pickup._id === action.payload._id);
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(updatePickupStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default pickupsSlice.reducer;
       