import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { globalLanguageReducer } from "./globalLanguageSlice";
import logger from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

const shieldPersistConfig = {
  key: 'shield',
  storage,
};

const quizRefreshPersistConfig = {
  key: 'quiz',
  storage,
};

const globalLanguageConfig = {
  key: 'globalLanguage',
  storage,
};

const languagePersistReducer = persistReducer(globalLanguageConfig, globalLanguageReducer);

export const store = configureStore({
  reducer: { globalLanguage: languagePersistReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(logger),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
