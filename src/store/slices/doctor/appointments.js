
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  listAllAppointments,
  waitingAppointments,
  checkedAppointments,
  latedAppointment,
  patientAppointments,
  appointmentDetails,
  changeStatus,
} from "../../config/apis";

// Async thunks
export const fetchAllAppointments = createAsyncThunk(
  "doctorAppointments/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await listAllAppointments();
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch all appointments");
    }
  }
);

export const changeAppointmentStatus = createAsyncThunk(
  "doctorAppointments/changeStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const res = await changeStatus(id, status);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to change appointment status");
    }
  }
);

export const fetchWaitingAppointments = createAsyncThunk(
  "doctorAppointments/fetchWaiting",
  async (_, { rejectWithValue }) => {
    try {
      const res = await waitingAppointments();
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch waiting appointments");
    }
  }
);

export const fetchCheckedAppointments = createAsyncThunk(
  "doctorAppointments/fetchChecked",
  async (_, { rejectWithValue }) => {
    try {
      const res = await checkedAppointments();
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch checked appointments");
    }
  }
);

export const fetchLatedAppointment = createAsyncThunk(
  "doctorAppointments/fetchLated",
  async (_, { rejectWithValue }) => {
    try {
      const res = await latedAppointment();
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch lated appointment");
    }
  }
);

export const fetchPatientAppointments = createAsyncThunk(
  "doctorAppointments/fetchPatient",
  async (id, { rejectWithValue }) => {
    try {
      const res = await patientAppointments(id);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch patient appointments");
    }
  }
);

export const fetchAppointmentDetails = createAsyncThunk(
  "doctorAppointments/fetchDetails",
  async (id, { rejectWithValue }) => {
    try {
      const res = await appointmentDetails(id);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch appointment details");
    }
  }
);

// Initial state
const initialState = {
  all: [],
  waiting: [],
  checked: [],
  lated: [],
  patient: {},
  detail: null,
  loading: false,
  error: null,
};

// Slice
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
      // All appointments
      .addCase(fetchAllAppointments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllAppointments.fulfilled, (state, action) => {
        state.loading = false;
        state.all = action.payload;
      })
      .addCase(fetchAllAppointments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Waiting appointments
      .addCase(fetchWaitingAppointments.fulfilled, (state, action) => {
        state.waiting = action.payload;
      })

      // Checked appointments
      .addCase(fetchCheckedAppointments.fulfilled, (state, action) => {
        state.checked = action.payload;
      })

      // Lated appointment
      .addCase(fetchLatedAppointment.fulfilled, (state, action) => {
        state.lated = action.payload;
      })

      // Patient appointments
      .addCase(fetchPatientAppointments.fulfilled, (state, action) => {
        state.patient = action.payload;
      })

      // Appointment details
      .addCase(fetchAppointmentDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAppointmentDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.detail = action.payload;
      })
      .addCase(fetchAppointmentDetails.rejected, (state, action) => {
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
        state.all = state.all.map((a) => (a.id === updated.id ? updated : a));
      })
      .addCase(changeAppointmentStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Exports
export const { clearAppointmentDetails } = doctorAppointmentsSlice.actions;
export default doctorAppointmentsSlice.reducer;
