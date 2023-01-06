import { configureStore, createSlice, combineReducers } from "@reduxjs/toolkit";
// import storageSession from "reduxjs-toolkit-persist/lib/storage/session";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const appSlice = createSlice({
  name: "app",
  initialState: {
    user: null,
    token: null,
    session_id: null,
  },
  reducers: {
    setToken: (state, actions) => {
      state.token = actions.payload;
    },
    setCurrentUser: (state, actions) => {
      state.user = actions.payload;
    },
    setSessin_id: (state, actions) => {
      state.session_id = actions.payload;
    },
  },
});

const rootReducer = combineReducers({
  app: appSlice.reducer,
});

const persistConfig = {
  key: "root",
  storage: storage,
  whiteList: ["app"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [],
});

export const { setToken, setCurrentUser, setSessin_id } = appSlice.actions;

export const persistor = persistStore(store);
