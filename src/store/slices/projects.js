import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  listAllUserProjects,
  addProject,
  updateProject,
  deleteProject,
} from "../config/apis";

// Fetch all projects
export const fetchAllProjects = createAsyncThunk(
  "projects/list",
  async (id, { rejectWithValue }) => {
    try {
      const response = await listAllUserProjects(id);
      return response.data;
    } catch (error) {
      console.error("Error fetching projects", error?.response?.data || error.message);
      return rejectWithValue(error?.response?.data || "An error occurred");
    }
  }
);

// Add a new project
export const addNewProject = createAsyncThunk(
  "projects/add",
  async (data, { rejectWithValue }) => {
    try {
      const response = await addProject(data);
      return response.data;
    } catch (error) {
      console.error("Error adding project", error?.response?.data || error.message);
      return rejectWithValue(error?.response?.data || "Failed to add project");
    }
  }
);

// Update a project
export const updateExistingProject = createAsyncThunk(
  "projects/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await updateProject(id, data);
      return { id, updatedData: response.data };
    } catch (error) {
      console.error("Error updating project", error?.response?.data || error.message);
      return rejectWithValue(error?.response?.data || "Failed to update project");
    }
  }
);

// Delete a project
export const deleteProjectById = createAsyncThunk(
  "projects/delete",
  async (id, { rejectWithValue }) => {
    try {
      await deleteProject(id);
      return id;
    } catch (error) {
      console.error("Error deleting project", error?.response?.data || error.message);
      return rejectWithValue(error?.response?.data || "Failed to delete project");
    }
  }
);

const initialState = {
  projects: [],
  loading: false,
  error: null,
};

const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all
      .addCase(fetchAllProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload;
      })
      .addCase(fetchAllProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add
      .addCase(addNewProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addNewProject.fulfilled, (state, action) => {
        state.loading = false;
        state.projects.push(action.payload);
      })
      .addCase(addNewProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update
      .addCase(updateExistingProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateExistingProject.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.projects.findIndex(p => p.id === action.payload.id);
        if (index !== -1) {
          state.projects[index] = action.payload.updatedData;
        }
      })
      .addCase(updateExistingProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete
      .addCase(deleteProjectById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProjectById.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = state.projects.filter(p => p.id !== action.payload);
      })
      .addCase(deleteProjectById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default projectSlice.reducer;
