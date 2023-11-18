import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "./userService";

export const getUsers = createAsyncThunk(
  "user/get-users",
  async (thunkAPI) => {
    try {
      return await userService.getUsers();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
const initialState = {
  users: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};
export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.users = action.payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      });
  },
});
export default userSlice.reducer;
