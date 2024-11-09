import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./api/baseApi";
import { userPersistReducer } from "./slice/authSlice";
import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

export const store = configureStore({
  reducer: {
    auth: userPersistReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDEfaultMiddleWare) =>
    getDEfaultMiddleWare({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseApi.middleware),
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat(baseApi.middleware),
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
