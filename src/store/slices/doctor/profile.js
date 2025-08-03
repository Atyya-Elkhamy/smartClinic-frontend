// src/slices/doctorProfileSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  doctorProfile,
  updateProfile,
  updatePassword,
} from "../../config/apis";

// Fetch Doctor Profile
export const fetchDoctorProfile = createAsyncThunk(
  "doctorProfile/fetchProfile",
  async (id, { rejectWithValue }) => {
    try {
      const res = await doctorProfile(id);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to load profile");
    }
  }
);

// Update Doctor Profile
export const editDoctorProfile = createAsyncThunk(
  "doctorProfile/updateProfile",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await updateProfile(id, data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to update profile");
    }
  }
);

// Update Doctor Password
export const changeDoctorPassword = createAsyncThunk(
  "doctorProfile/updatePassword",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await updatePassword(id, data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to update password");
    }
  }
);

// Initial State
const initialState = {
  profile: null,
  loading: false,
  error: null,
  successMessage: null,
};

// Slice
const doctorProfileSlice = createSlice({
  name: "doctorProfile",
  initialState,
  reducers: {
    clearProfileMessages: (state) => {
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Profile
      .addCase(fetchDoctorProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDoctorProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchDoctorProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Profile
      .addCase(editDoctorProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(editDoctorProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
        state.successMessage = "Profile updated successfully";
      })
      .addCase(editDoctorProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Change Password
      .addCase(changeDoctorPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(changeDoctorPassword.fulfilled, (state) => {
        state.loading = false;
        state.successMessage = "Password updated successfully";
      })
      .addCase(changeDoctorPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Exports
export const { clearProfileMessages } = doctorProfileSlice.actions;
export default doctorProfileSlice.reducer;
