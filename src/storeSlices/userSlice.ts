import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface UserSlice {
  authUser: any;
}

const initialState: UserSlice = {
  authUser: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logInUser: (state, action: PayloadAction<any>) => {
      state.authUser = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { logInUser } = userSlice.actions;

export default userSlice.reducer;
