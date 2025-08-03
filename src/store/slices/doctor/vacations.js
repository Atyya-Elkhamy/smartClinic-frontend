import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getVacations,
  addVacation,
  updateVacation,
  deleteVacation,
} from "../../config/apis";

// Get vacations
export const fetchVacations = createAsyncThunk(
  "doctorVacations/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getVacations();
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch vacations");
    }
  }
);

// Add vacation
export const createVacation = createAsyncThunk(
  "doctorVacations/create",
  async (data, { rejectWithValue }) => {
    try {
      const res = await addVacation(data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to add vacation");
    }
  }
);

// Update vacation
export const editVacation = createAsyncThunk(
  "doctorVacations/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await updateVacation(id, data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to update vacation");
    }
  }
);

// Delete vacation
export const removeVacation = createAsyncThunk(
  "doctorVacations/delete",
  async (id, { rejectWithValue }) => {
    try {
      await deleteVacation(id);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to delete vacation");
    }
  }
);

// Slice
const doctorVacationsSlice = createSlice({
  name: "doctorVacations",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchVacations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVacations.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchVacations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create
      .addCase(createVacation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createVacation.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(createVacation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update
      .addCase(editVacation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editVacation.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.items.findIndex((v) => v.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(editVacation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete
      .addCase(removeVacation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeVacation.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter((v) => v.id !== action.payload);
      })
      .addCase(removeVacation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default doctorVacationsSlice.reducer;
