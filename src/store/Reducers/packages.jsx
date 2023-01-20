import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  //   status: false,
  total: 0,
  packages: [],
  package: null,
  //   error:   "",
};

export const packagesSlice = createSlice({
  name: "packages",
  initialState,
  reducers: {
    getPackages: (state, action) => {
      // console.log("action get", action.payload.data);
      return {
        ...state,
        packages: action.payload.data,
      };
    },
    deletePackage: (state, action) => {
      console.log("action", action.payload);
      return {
        ...state,
        packages: state.packages.filter(
          (packagess) => packagess.id !== action.payload
        ),
      };
    },
    updatePackage: (state, action) => {
      console.log("actipn paylload", action.payload);

      const packagesList = [...state.packages];
      let index = packagesList.findIndex(
        (packagess) => packagess.id === action.payload.data.id
      );
      console.log(index);
      packagesList[index] = action.payload.data;

      return {
        ...state,
        // package: action.payload.data,
        package: action.payload.data,
        packages: packagesList,
      };
    },
    createPackage: (state, action) => {
      console.log(action.payload.data);
      return {
        ...state,
        total: state.total + 1,
        package: action.payload.data,
        packages: [action.payload.data, ...state.packages],
      };
    },
    updateStatuss: (state, action) => {
      console.log("action", action.payload);
      const packagesList = [...state.packages];
      let index = packagesList.findIndex(
        (packagess) => packagess.id === action.payload.data.id
      );
      packagesList[index] = action.payload.data;

      return {
        ...state,
        package: action.payload.data,
        packages: packagesList,
      };
    },
  },
});

export const {
  getPackages,
  deletePackage,
  updateStatuss,
  updatePackage,
  createPackage,
} = packagesSlice.actions;

export default packagesSlice.reducer;
