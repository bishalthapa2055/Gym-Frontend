import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  //   status: false,
  total: 0,
  users: [],
  user: null,
  //   error:   "",
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    getUsers: (state, action) => {
      // console.log("action", action.payload);
      return {
        ...state,
        users: action.payload.data,
        result: action.payload.result,
        countType: action.payload.countType,
        total: action.payload.total,
      };
    },
    //   ({
    //   ...state,
    //   users: action.payload.data,
    //   total: action.payload.total,
    // }),
    deleteUser: (state, action) => {
      // console.log(action.payload);
      return {
        ...state,
        users: state.users.filter(
          (users) => users.id !== action.payload.data.id
        ),
      };
    },
    updateUser: (state, action) => {
      //update code for reducer
      // console.log(action.payload);
      const userLists = [...state.users];
      let index = userLists.findIndex(
        (user) => user.id === action.payload.data.id
      );
      // console.log("index,", index);
      userLists[index] = action.payload.data;
      return {
        users: userLists,
        user: action.payload.data,
      };
    },
    createUser: (state, action) => {
      console.log(action.payload);
      return {
        ...state,
        user: action.payload.data,
        users: [action.payload.data, ...state.users],
      };
    },
  },
});

export const { getUsers, deleteUser, updateUser, createUser } =
  usersSlice.actions;

export default usersSlice.reducer;
