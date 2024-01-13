import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from '../features/userInfo/userSlice';

const persistConfiguration = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfiguration, userReducer)

export const store = configureStore({
    reducer: persistedReducer,
});

export const persistor = persistStore( store );