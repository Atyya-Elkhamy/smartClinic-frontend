import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getDaysOff,
  addDayOff,
  updateDayOff,
  deleteDayOff,
} from "../../config/apis";

// Thunks

export const fetchDaysOff = createAsyncThunk(
  "doctorDaysOff/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getDaysOff();
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch days off");
    }
  }
);

export const createDayOff = createAsyncThunk(
  "doctorDaysOff/create",
  async (data, { rejectWithValue }) => {
    try {
      const res = await addDayOff(data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to add day off");
    }
  }
);

export const editDayOff = createAsyncThunk(
  "doctorDaysOff/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await updateDayOff(id, data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to update day off");
    }
  }
);

export const removeDayOff = createAsyncThunk(
  "doctorDaysOff/delete",
  async (id, { rejectWithValue }) => {
    try {
      await deleteDayOff(id);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to delete day off");
    }
  }
);

// Slice

const doctorDaysOffSlice = createSlice({
  name: "doctorDaysOff",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchDaysOff.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDaysOff.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchDaysOff.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create
      .addCase(createDayOff.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createDayOff.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(createDayOff.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update
      .addCase(editDayOff.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editDayOff.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.items.findIndex((d) => d.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(editDayOff.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete
      .addCase(removeDayOff.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeDayOff.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter((d) => d.id !== action.payload);
      })
      .addCase(removeDayOff.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default doctorDaysOffSlice.reducer;
