import { createSlice } from "@reduxjs/toolkit";

const middlewareActions = {
  performUserLogin: () => {},
  performUserLogOut: () => {},
  performUserRegister: () => {},
};

const userSlice = createSlice({
  name: "users",
  initialState: {
    user: null,
    error: "",
  },

  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.error = null;
    },
    userRegisterFailure: (state, action) => {
      state.user = null;
      state.error = action.payload;
    },
    ...middlewareActions,
  },
});

export const {
  performUserLogin,
  performUserLogOut,
  performUserRegister,
  setUser,
  userRegisterFailure,
} = userSlice.actions;

export default userSlice.reducer;
