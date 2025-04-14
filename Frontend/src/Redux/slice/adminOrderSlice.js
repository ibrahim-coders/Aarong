import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// ✅ Fetch all orders
export const fetchAllOrders = createAsyncThunk(
  'adminOrder/fetchAllOrders',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/admin/orders`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

// ✅ Update order status
export const updateOrdersStatus = createAsyncThunk(
  'adminOrder/updateOrdersStatus',
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/admin/orders/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

// ✅ Delete an order
export const deleteOrder = createAsyncThunk(
  'adminOrder/deleteOrder',
  async ({ id }, { rejectWithValue }) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/admin/orders/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
          },
        }
      );
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

// ✅ Initial state
const initialState = {
  orders: [],
  totalOrders: 0,
  totalSale: 0,
  loading: false,
  error: null,
};

// ✅ Create slice
const adminOrderSlice = createSlice({
  name: 'adminOrder',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      // fetchAllOrders
      .addCase(fetchAllOrders.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
        state.totalOrders = action.payload.length;
        state.totalSale = action.payload.reduce(
          (acc, order) => acc + order.totalPrice,
          0
        );
      })
      .addCase(fetchAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch orders';
      })

      // updateOrdersStatus
      .addCase(updateOrdersStatus.fulfilled, (state, action) => {
        const updatedOrder = action.payload;
        const orderIndex = state.orders.findIndex(
          order => order._id === updatedOrder._id
        );
        if (orderIndex !== -1) {
          state.orders[orderIndex] = updatedOrder;
        }
      })

      // deleteOrder

      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = state.orders.filter(
          order => order._id !== action.payload
        );
      });
  },
});

export default adminOrderSlice.reducer;
