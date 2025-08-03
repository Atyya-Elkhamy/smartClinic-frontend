import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getPatientAppointments,
  addPatientAppointment,
  updatePatientAppointment,
  deletePatientAppointment,
} from "../../config/apis";

// Fetch all appointments
export const fetchAllAppointments = createAsyncThunk(
  "appointments/list",
  async (id, { rejectWithValue }) => {
    try {
      const response = await getPatientAppointments(id);
      return response.data;
    } catch (error) {
      console.error("Error fetching appointments", error?.response?.data || error.message);
      return rejectWithValue(error?.response?.data || "An error occurred");
    }
  }
);

// Add a new appointment
export const addNewAppointment = createAsyncThunk(
  "appointments/add",
  async (data, { rejectWithValue }) => {
    try {
      const response = await addPatientAppointment(data);
      return response.data;
    } catch (error) {
      console.error("Error adding appointment", error?.response?.data || error.message);
      return rejectWithValue(error?.response?.data || "Failed to add appointment");
    }
  }
);

// Update an appointment
export const updateExistingAppointment = createAsyncThunk(
  "appointments/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await updatePatientAppointment(id, data);
      return { id, updatedData: response.data };
    } catch (error) {
      console.error("Error updating appointment", error?.response?.data || error.message);
      return rejectWithValue(error?.response?.data || "Failed to update appointment");
    }
  }
);

// Delete an appointment
export const deleteAppointmentById = createAsyncThunk(
  "appointments/delete",
  async (id, { rejectWithValue }) => {
    try {
      await deletePatientAppointment(id);
      return id;
    } catch (error) {
      console.error("Error deleting appointment", error?.response?.data || error.message);
      return rejectWithValue(error?.response?.data || "Failed to delete appointment");
    }
  }
);

const initialState = {
  projects: [],
  loading: false,
  error: null,
};

const appointmentSlice = createSlice({
  name: "appointments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all
      .addCase(fetchAllAppointments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllAppointments.fulfilled, (state, action) => {
        state.loading = false;
        state.appointments = action.payload;
      })
      .addCase(fetchAllAppointments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add
      .addCase(addNewAppointment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addNewAppointment.fulfilled, (state, action) => {
        state.loading = false;
        state.appointments.push(action.payload);
      })
      .addCase(addNewAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update
      .addCase(updateExistingAppointment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateExistingAppointment.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.appointments.findIndex(p => p.id === action.payload.id);
        if (index !== -1) {
          state.appointments[index] = action.payload.updatedData;
        }
      })
      .addCase(updateExistingAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete
      .addCase(deleteAppointmentById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAppointmentById.fulfilled, (state, action) => {
        state.loading = false;
        state.appointments = state.appointments.filter(p => p.id !== action.payload);
      })
      .addCase(deleteAppointmentById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default appointmentSlice.reducer;
