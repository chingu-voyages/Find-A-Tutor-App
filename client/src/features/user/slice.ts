import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { getUsers } from './service';
import { User } from './types';

interface UsersState {
  entities: User[];
  status: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState = {
  entities: [],
  status: 'idle',
  error: null,
} as UsersState;

const userSlice = createSlice({
  name: 'users',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUsers.pending, (state) => {
      state.status = 'pending';
      state.error = null;
    });

    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.entities = action.payload;
      state.status = 'succeeded';
    });

    builder.addCase(getUsers.rejected, (state, action) => {
      if (action.payload) {
        state.error = action.payload.message;
      }
      state.status = 'failed';
    });
  },
});

//export const {} = userSlice.actions;

export const selectStatus = (state: RootState) => state.users.status;
export const selectUsers = (state: RootState) => state.users.entities;

export default userSlice.reducer;
