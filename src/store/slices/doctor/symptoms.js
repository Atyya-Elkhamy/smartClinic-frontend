// src/slices/doctorSymptomsSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addsymptom,
  getSymptoms,
  deleteSymptom,
  updateSymptom,
} from "../../config/apis";

// Thunks
export const fetchSymptoms = createAsyncThunk(
  "doctorSymptoms/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getSymptoms();
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch symptoms");
    }
  }
);

export const createSymptom = createAsyncThunk(
  "doctorSymptoms/create",
  async (data, { rejectWithValue }) => {
    try {
      const res = await addsymptom(data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to add symptom");
    }
  }
);

export const removeSymptom = createAsyncThunk(
  "doctorSymptoms/delete",
  async (id, { rejectWithValue }) => {
    try {
      await deleteSymptom(id);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to delete symptom");
    }
  }
);

export const editSymptom = createAsyncThunk(
  "doctorSymptoms/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await updateSymptom(id, data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to update symptom");
    }
  }
);

// Initial State
const initialState = {
  list: [],
  loading: false,
  error: null,
  successMessage: null,
};

// Slice
const doctorSymptomsSlice = createSlice({
  name: "doctorSymptoms",
  initialState,
  reducers: {
    clearSymptomMessages: (state) => {
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchSymptoms.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSymptoms.fulfilled, (state, action) => {
        state.loading = false;
        // Ensure we're always working with an array
        state.list = Array.isArray(action.payload) ? action.payload : [action.payload];
      })
      .addCase(fetchSymptoms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create
      .addCase(createSymptom.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createSymptom.fulfilled, (state, action) => {
        state.loading = false;
        // Create a new array instead of using push
        state.list = [
          ...state.list,
          ...(Array.isArray(action.payload) ? action.payload : [action.payload])
        ];
        state.successMessage = "Symptom added successfully";
      })
      .addCase(createSymptom.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete
      .addCase(removeSymptom.fulfilled, (state, action) => {
        state.list = state.list.filter((s) => s.id !== action.payload);
        state.successMessage = "Symptom deleted successfully";
      })
      .addCase(removeSymptom.rejected, (state, action) => {
        state.error = action.payload;
      })

      // Update
      .addCase(editSymptom.fulfilled, (state, action) => {
        state.list = state.list.map((s) =>
          s.id === action.payload.id ? action.payload : s
        );
        state.successMessage = "Symptom updated successfully";
      })
      .addCase(editSymptom.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

// Exports
export const { clearSymptomMessages } = doctorSymptomsSlice.actions;
export default doctorSymptomsSlice.reducer;
