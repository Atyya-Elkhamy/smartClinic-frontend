import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { login, logout, refresh_token, register , doctorLogin } from "../config/apis";

// Get saved tokens/user from localStorage
let token = localStorage.getItem("token") || null;

let user = null;
try {
  const userData = localStorage.getItem("user");
  user = userData ? JSON.parse(userData) : null;
} catch (error) {
  console.error("Invalid JSON in localStorage 'user':", error);
  user = null;
}

// Login
export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password, role }, { rejectWithValue }) => {
    try {
      const payload = { email, password };
      const response = role === "doctor"
        ? await doctorLogin(payload)
        : await login(payload);

      const { token, user } = response.data.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      return { token, user };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

// Logout
export const logoutUser = createAsyncThunk("auth/logout", async () => {
  try {
    await logout();
  } catch (error) {
    console.error("Logout error", error);
  } finally {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return { success: true };
  }
});

// Register
export const registerUser = createAsyncThunk(
  "auth/register",
  async (data, { rejectWithValue }) => {
    try {
      const response = await register(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Registration failed");
    }
  }
);

// Refresh (if your backend uses refresh tokens, else skip this)
export const refreshToken = createAsyncThunk(
  "auth/refresh",
  async (_, { rejectWithValue }) => {
    try {
      const refresh = localStorage.getItem("refresh");
      const response = await refresh_token({ refresh });
      localStorage.setItem("token", response.data.token);
      return response.data;
    } catch (error) {
      localStorage.removeItem("token");
      localStorage.removeItem("refresh");
      localStorage.removeItem("user");
      return rejectWithValue("Session expired");
    }
  }
);

// Slice
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: user || null,
    token: token || null,
    loading: false,
    error: null,
    isAuthenticated: !!token,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
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
        state.error = action.payload;
      })

      // Logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.token = null;
        state.user = null;
        state.isAuthenticated = false;
      })

      // Refresh
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(refreshToken.rejected, (state) => {
        state.token = null;
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export default authSlice.reducer;
