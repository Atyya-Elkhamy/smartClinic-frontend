// src/slices/doctorDiseasesSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addDesisease,
  getDiseases,
  deleteDisease,
  updateDisease,
} from "../../config/apis";

// Thunks
export const fetchDiseases = createAsyncThunk(
  "doctorDiseases/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getDiseases();
      console.log("fetched data is ",res.data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch diseases");
    }
  }
);

export const createDisease = createAsyncThunk(
  "doctorDiseases/create",
  async (data, { rejectWithValue }) => {
    try {
      const res = await addDesisease(data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to add disease");
    }
  }
);

export const removeDisease = createAsyncThunk(
  "doctorDiseases/delete",
  async (id, { rejectWithValue }) => {
    try {
      await deleteDisease(id);
      return id; // Return only the ID to remove it from state
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to delete disease");
    }
  }
);

export const editDisease = createAsyncThunk(
  "doctorDiseases/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await updateDisease(id, data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to update disease");
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
const doctorDiseasesSlice = createSlice({
  name: "doctorDiseases",
  initialState,
  reducers: {
    clearDiseaseMessages: (state) => {
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDiseases.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDiseases.fulfilled, (state, action) => {
        state.loading = false;
        state.list = Array.isArray(action.payload) ? action.payload : [action.payload];
      })
      .addCase(fetchDiseases.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create
      .addCase(createDisease.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createDisease.fulfilled, (state, action) => {
        state.loading = false;
        if (!Array.isArray(state.list)) {
          state.list = [];
        }
        const newDisease = Array.isArray(action.payload) ? action.payload : [action.payload];
        state.list = [...state.list, ...newDisease];
        state.successMessage = "Disease added successfully";
      })
      .addCase(createDisease.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete
      .addCase(removeDisease.fulfilled, (state, action) => {
        state.list = state.list.filter((disease) => disease.id !== action.payload);
        state.successMessage = "Disease deleted successfully";
      })
      .addCase(removeDisease.rejected, (state, action) => {
        state.error = action.payload;
      })

      // Update
      .addCase(editDisease.fulfilled, (state, action) => {
        state.list = state.list.map((disease) =>
          disease.id === action.payload.id ? action.payload : disease
        );
        state.successMessage = "Disease updated successfully";
      })
      .addCase(editDisease.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

// Exports
export const { clearDiseaseMessages } = doctorDiseasesSlice.actions;
export default doctorDiseasesSlice.reducer;
