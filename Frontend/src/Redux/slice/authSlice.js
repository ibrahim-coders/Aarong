import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const userFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const initialGuestId =
  localStorage.getItem('guestId') || `guest_${new Date().getTime()}`;
localStorage.setItem('guestId', initialGuestId);

const initialState = {
  user: userFromStorage,
  guestId: initialGuestId,
  loading: false,
  error: null,
};

// ✅ Async Thunk for User Login
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/users/login`,
        userData
      );
      localStorage.setItem('userInfo', JSON.stringify(response.data.user));
      localStorage.setItem('userToken', response.data.token);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Something went wrong');
    }
  }
);

// ✅ Async Thunk for User Registration
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/users/register`,
        userData
      );
      localStorage.setItem('userInfo', JSON.stringify(response.data.user));
      localStorage.setItem('userToken', response.data.token);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Something went wrong');
    }
  }
);

// ✅ Auth Slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: state => {
      state.user = null;
      state.guestId = `guest_${new Date().getTime()}`;
      localStorage.removeItem('userInfo');
      localStorage.removeItem('userToken');
      localStorage.setItem('guestId', state.guestId);
    },
    generateNewGuestId: state => {
      state.guestId = `guest_${new Date().getTime()}`;
      localStorage.setItem('guestId', state.guestId);
    },
  },
  extraReducers: builder => {
    // Login
    builder.addCase(loginUser.pending, state => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.error = null;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // Register
    builder.addCase(registerUser.pending, state => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.error = null;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { logout, generateNewGuestId } = authSlice.actions;
export default authSlice.reducer;
