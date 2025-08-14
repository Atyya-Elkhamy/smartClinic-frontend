import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  todayAppointments,
  getPatientHistory,
  changeStatus,
  createTreatment,
  allPatients,
  getAppointments,
} from "../../config/apis";

export const fetchAllAppointments = createAsyncThunk(
  "doctorAppointments/fetchAllAppointments",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getAppointments();
      console.log("Fetched all appointments:", res.data);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch all appointments"
      );
    }
  }
);

// Fetch today's appointments for doctor
export const fetchTodayAppointments = createAsyncThunk(
  "doctorAppointments/fetchToday",
  async (_, { rejectWithValue }) => {
    try {
      const res = await todayAppointments();
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch today's appointments");
    }
  }
);

// Fetch patient history
export const fetchPatientHistory = createAsyncThunk(
  "doctorAppointments/fetchHistory",
  async (id, { rejectWithValue }) => {
    try {
      const res = await getPatientHistory(id);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch patient history");
    }
  }
);

// Change appointment status
export const changeAppointmentStatus = createAsyncThunk(
  "doctorAppointments/changeStatus",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await changeStatus(id, data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to change status");
    }
  }
);

// Create treatment for appointment
export const createAppointmentTreatment = createAsyncThunk(
  "doctorAppointments/createTreatment",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await createTreatment(id, data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to create treatment");
    }
  }
);

// Fetch all patients
export const fetchAllPatients = createAsyncThunk(
  "doctorAppointments/fetchAllPatients",
  async (_, { rejectWithValue }) => {
    try {
      const res = await allPatients();
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch all patients");
    }
  }
);

const initialState = {
  today: [],
  history: [],
  patients: [],
  allAppointments: [],
  detail: null,
  loading: false,
  error: null,
};

const doctorAppointmentsSlice = createSlice({
  name: "doctorAppointments",
  initialState,
  reducers: {
    clearAppointmentDetails: (state) => {
      state.detail = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Today's appointments
      .addCase(fetchTodayAppointments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodayAppointments.fulfilled, (state, action) => {
        state.loading = false;
        state.today = action.payload;
      })
      .addCase(fetchTodayAppointments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Patient history
      .addCase(fetchPatientHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPatientHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.history = action.payload;
      })
      .addCase(fetchPatientHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Change appointment status
      .addCase(changeAppointmentStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changeAppointmentStatus.fulfilled, (state, action) => {
        state.loading = false;
        const updated = action.payload;
        state.today = state.today.map((appt) =>
          appt.id === updated.id ? updated : appt
        );
      })
      .addCase(changeAppointmentStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create treatment
      .addCase(createAppointmentTreatment.fulfilled, (state, action) => {
        const updated = action.payload;
        state.today = state.today.map((appt) =>
          appt.id === updated.id ? updated : appt
        );
      })

      // All patients
      .addCase(fetchAllPatients.fulfilled, (state, action) => {
        state.patients = action.payload;
      })

      .addCase(fetchAllAppointments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllAppointments.fulfilled, (state, action) => {
        state.loading = false;
        state.allAppointments = action.payload;
      })
      .addCase(fetchAllAppointments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

  },
});

export const { clearAppointmentDetails } = doctorAppointmentsSlice.actions;
export default doctorAppointmentsSlice.reducer;
