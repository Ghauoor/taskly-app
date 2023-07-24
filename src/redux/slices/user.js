import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  user: null,
  userLoading: false,
  userAuthId: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Create your own reducer
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setUserLoading: (state, action) => {
      state.userLoading = action.payload;
    },
    setUserAuthId: (state, action) => {
      state.userAuthId = action.payload;
    },
  },
});

export const {setUser, setUserLoading, setUserAuthId} = userSlice.actions;

export default userSlice.reducer;
