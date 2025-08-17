import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllAppointments,
  addPatientAppointment,
  updatePatientAppointment,
  deletePatientAppointment,
  getTodayAppointment,
  getAppointmentTime,
  getAppointmentTreatment,
  getAppointmentDetails,
} from "../../config/apis";

// Fetch all appointments
export const fetchAllAppointments = createAsyncThunk(
  "appointments/list",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllAppointments();
      return response.data;
    } catch (error) {
      console.error("Error fetching appointments", error?.response?.data || error.message);
      return rejectWithValue(error?.response?.data || "An error occurred");
    }
  }
);

export const fetchAppointmentDetails = createAsyncThunk(
  "appointments/details",
  async (id, { rejectWithValue }) => {
    try {
      const response = await getAppointmentDetails(id);
      return { id, details: response.data };
    } catch (error) {
      return rejectWithValue(error?.response?.data || "Failed to fetch appointment details");
    }
  }
);

// Fetch today's appointments
export const fetchTodayAppointments = createAsyncThunk(
  "appointments/today",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getTodayAppointment();
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data || "Failed to fetch today's appointments");
    }
  }
);

// Fetch appointment expected time
export const fetchAppointmentTime = createAsyncThunk(
  "appointments/time",
  async (id, { rejectWithValue }) => {
    try {
      const response = await getAppointmentTime(id);
      return { id, time: response.data };
    } catch (error) {
      return rejectWithValue(error?.response?.data || "Failed to fetch appointment time");
    }
  }
);

// Fetch appointment treatments
export const fetchAppointmentTreatment = createAsyncThunk(
  "appointments/treatment",
  async (id, { rejectWithValue }) => {
    try {
      const response = await getAppointmentTreatment(id);
      console.log(response.data)
      return { id, treatments: response.data };
    } catch (error) {
      return rejectWithValue(error?.response?.data || "Failed to fetch appointment treatments");
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
  appointments: [],
  today: [],
  appointmentTimes: {},
  appointmentTreatments: {},
  appointmentDetails: {},
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

      // Fetch today's
      .addCase(fetchTodayAppointments.fulfilled, (state, action) => {
        state.today = action.payload;
      })

      // Fetch appointment time
      .addCase(fetchAppointmentTime.fulfilled, (state, action) => {
        state.appointmentTimes[action.payload.id] = action.payload.time;
      })

      // Fetch appointment treatments
      .addCase(fetchAppointmentTreatment.fulfilled, (state, action) => {
        state.appointmentTreatments[action.payload.id] = action.payload.treatments;
      })

      // Add
      .addCase(addNewAppointment.fulfilled, (state, action) => {
        state.appointments.push(action.payload);
      })

      // Update
      .addCase(updateExistingAppointment.fulfilled, (state, action) => {
        const index = state.appointments.findIndex(p => p.id === action.payload.id);
        if (index !== -1) {
          state.appointments[index] = action.payload.updatedData;
        }
      })

      // Delete
      .addCase(deleteAppointmentById.fulfilled, (state, action) => {
        state.appointments = state.appointments.filter(p => p.id !== action.payload);
      })

      .addCase(fetchAppointmentDetails.fulfilled, (state, action) => {
        state.appointmentDetails[action.payload.id] = action.payload.details;
      });
},
});

export default appointmentSlice.reducer;
