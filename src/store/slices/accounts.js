import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { login, logout, refresh_token, register } from "../config/apis";

const access = localStorage.getItem("access");
const refresh = localStorage.getItem("refresh");
export const loginUser = createAsyncThunk(
  "auth/login",
  async (userdata, { rejectWithValue }) => {
    try {
      const response = await login(userdata);
      const { access, refresh } = response.data;
      localStorage.setItem("access", access);
      localStorage.setItem("refresh", refresh);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Login failed");
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Loged out", error);
    } finally {
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      localStorage.removeItem("user");
      return { success: true };
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/register",
  async (data, { rejectWithValue }) => {
    try {
      const response = await register(data);
      return response.data;
    } catch (error) {
      console.error(error.response?.data || "Registration error");
      return rejectWithValue(error.response?.data || "Registration failed");
    }
  }
);

export const refreshToken = createAsyncThunk(
  "auth/refresh",
  async (_, { rejectWithValue }) => {
    try {
      const refresh = localStorage.getItem("refresh");
      const response = await refresh_token({ refresh });
      localStorage.setItem("access", response.data.access);
      return response.data;
    } catch (error) {
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      return rejectWithValue("Refresh failed", error.response?.data || "Session expired");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: JSON.parse(localStorage.getItem("user")) || null,
    access: access || null,
    refresh: refresh || null,
    loading: false,
    error: null,
    formError: null,
    isAuthenticated: !!access,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.access = action.payload.access;
        state.refresh = action.payload.refresh;
        state.isAuthenticated = true;
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.loginError = action.payload;
        state.isAuthenticated = false;
      })
      // Register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.formError = action.payload;
      })
      // Refresh Token
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.access = action.payload.access;
        state.isAuthenticated = true;
      })
      .addCase(refreshToken.rejected, (state) => {
        state.access = null;
        state.refresh = null;
        state.user = null;
        state.isAuthenticated = false;
      })
      // Logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.access = null;
        state.refresh = null;
        state.isAuthenticated = false;
      });
  },
});

export default authSlice.reducer;
