import { configureStore } from "@reduxjs/toolkit";
import ReduxThunk from "redux-thunk";

import {
  usersSlice,
  packagesSlice,
  membershipSlice,
  loginSlice,
} from "./Reducers/index";

export const middlewares = [ReduxThunk];

export const store = configureStore({
  reducer: {
    // admin: authencationReducer,
    user: usersSlice.reducer,
    packages: packagesSlice.reducer,
    memberships: membershipSlice.reducer,
    login: loginSlice.reducer,
  },
  middleware: middlewares,
});

// below only for  typescript
// // Infer the `RootState` and `AppDispatch` types from the store itself
// export const  RootState = ReturnType<typeof store.getState()>;

// // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// export const   AppDispatch = typeof store.dispatch;
