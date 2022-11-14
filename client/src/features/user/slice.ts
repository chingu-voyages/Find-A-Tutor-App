import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { getUser, createUser } from './service';
import { User } from './types';

interface UserState {
  entity: User | null;
  status: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState = {
  entity: null,
  status: 'idle',
  error: null,
} as UserState;

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    // builder.addCase(getUser.pending, (state) => {
    //   state.status = 'pending';
    //   state.error = null;
    // });

    // builder.addCase(getUser.fulfilled, (state, action) => {
    //   state.entity = action.payload;
    //   state.status = 'succeeded';
    // });

    // builder.addCase(getUser.rejected, (state, action) => {
    //   if (action.payload) {
    //     state.error = action.payload.message;
    //   }
    //   state.status = 'failed';
    // });

    builder.addCase(createUser.pending, (state) => {
      state.status = 'pending';
      state.error = null;
    });

    builder.addCase(createUser.fulfilled, (state, action) => {
      state.entity = action.payload;
      state.status = 'succeeded';
    });

    builder.addCase(createUser.rejected, (state, action) => {
      if (action.payload) {
        state.error = action.payload.message;
      }
      state.status = 'failed';
    });
  },
});

//export const {} = userSlice.actions;

export const selectStatus = (state: RootState) => state.user.status;
export const selectUser = (state: RootState) => state.user.entity;

export default userSlice.reducer;
