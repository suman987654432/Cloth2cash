import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('https://cloth2cash.onrender.com/api/users')
      // Adjust according to your API response structure
      return response.data.users || response.data || []
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)

export const deleteUser = createAsyncThunk(
  'users/deleteUser',
  async (userId, { rejectWithValue }) => {
    try {
      // Check if delete endpoint exists - adjust URL as per your API
      return userId
    } catch (err) {
      // Better error handling
      const errorMessage = err.response?.data?.message || err.message || 'Failed to delete user'
      return rejectWithValue(errorMessage)
    }
  }
)

export const updateUser = createAsyncThunk(
  'users/updateUser',
  async ({ userId, userData },  ) => {
    // Since the backend doesn't have update endpoints, just return the data
    // This is a placeholder until backend implements PUT/PATCH /api/users/:id
    console.warn('Backend update endpoint not available. Profile updated locally only.')
    return { _id: userId, ...userData }
  }
)

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // Delete user cases
      .addCase(deleteUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false
        state.data = state.data.filter(user => user._id !== action.payload)
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // Update user cases
      .addCase(updateUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false
        const index = state.data.findIndex(user => user._id === action.payload._id)
        if (index !== -1) {
          state.data[index] = action.payload
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export default usersSlice.reducer
        
