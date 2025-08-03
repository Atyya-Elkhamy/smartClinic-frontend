import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getPatientProfile,
  updatePatientProfile,
  changePatientPassword,
} from "../../config/apis";

// Thunks

export const fetchPatientProfile = createAsyncThunk(
  "patientProfile/fetch",
  async (id, { rejectWithValue }) => {
    try {
      const res = await getPatientProfile(id);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch patient profile");
    }
  }
);

export const updateProfile = createAsyncThunk(
  "patientProfile/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await updatePatientProfile(id, data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to update patient profile");
    }
  }
);

export const changePassword = createAsyncThunk(
  "patientProfile/changePassword",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await changePatientPassword(id, data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to change password");
    }
  }
);

// Slice

const patientProfileSlice = createSlice({
  name: "patientProfile",
  initialState: {
    profile: null,
    loading: false,
    error: null,
    successMessage: null,
  },
  reducers: {
    clearSuccess(state) {
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchPatientProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPatientProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchPatientProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
        state.successMessage = "Profile updated successfully";
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Change Password
      .addCase(changePassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.loading = false;
        state.successMessage = "Password changed successfully";
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSuccess } = patientProfileSlice.actions;
export default patientProfileSlice.reducer;
