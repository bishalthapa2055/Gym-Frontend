import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  //   status: false,

  isAdmin: "",
  data: [],
  //   error:   "",
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    getDetails: (state, action) => {
      return {
        ...state,
        isAdmin: action.payload.isAdmin,
        data: action.payload.data,
      };
    },
  },
});

export const { getDetails } = loginSlice.actions;

export default loginSlice.reducer;
