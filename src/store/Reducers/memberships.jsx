import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  //   status: false,
  total: 0,
  memberships: [],
  membership: null,
  //   error:   "",
};

export const membershipSlice = createSlice({
  name: "memberhsip",
  initialState,
  reducers: {
    getMemberships: (state, action) => {
      return {
        ...state,
        memberships: action.payload.data,
      };
    },
    createMembership: (state, action) => {
      console.log(action.payload);
      return {
        ...state,
        total: state.total + 1,
        membership: action.payload.data,
        memberships: [action.payload.data, ...state.memberships],
      };
    },
    deleteMembership: (state, action) => {
      console.log(action.payload);
      return {
        ...state,
        memberships: state.memberships.filter(
          (membership) => membership.id !== action.payload.data.id
        ),
      };
    },
    updateMembership: (state, action) => {
      const membershipLists = [...state.memberships];
      let index = membershipLists.findIndex(
        (membership) => membership.id === action.payload.data.id
      );
      console.log(index);
      membershipLists[index] = action.payload.data;

      return {
        //for updating the membership

        ...state,
        membership: action.payload.data,
        memberships: membershipLists,
      };
    },
  },
});

export const {
  getMemberships,
  createMembership,
  deleteMembership,
  updateMembership,
} = membershipSlice.actions;

export default membershipSlice.reducer;
