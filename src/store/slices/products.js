import { createAsyncThunk } from "@reduxjs/toolkit";
import { searchProduct } from "../config/apis";

export const productSearch = createAsyncThunk(
    "products/search",
    async (query, { rejectWithValue }) => {
        try {
            const response = await searchProduct(query);
            return response;
        } catch (error) {
            return rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
)