import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { AuthUser } from "types";

export interface UserSlice {
  authUser: AuthUser | null;
}

const initialState: UserSlice = {
  authUser: null,
};

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    logInUser: (state, action: PayloadAction<any>) => {
      state.authUser = action.payload;
    },
    logOutUser: (state) => {
      state.authUser = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { logInUser, logOutUser } = userSlice.actions;

export default userSlice.reducer;
