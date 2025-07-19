import { configureStore } from "@reduxjs/toolkit";
import accountReducer from './slices/accounts';
import projectReducer from './slices/projects';
import languageReducer from './slices/language';

const store = configureStore({
  reducer: {
    auth: accountReducer,
    projects: projectReducer,
    language: languageReducer,
  }
});
export default store;
