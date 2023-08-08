import { configureStore } from "@reduxjs/toolkit";

import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from "redux-persist";
import userReduser from './UserSlice/UserSlice'
import adminReduser from './AdminSlice/AdminSlice'
const persistConfig={
    key:'root',
    storage
}
const persistedReducer=persistReducer(persistConfig,userReduser )
const persistedAdminReducer=persistReducer(persistConfig,adminReduser)

export const Store=configureStore({
    reducer:{
        user:persistedReducer,
        admin:persistedAdminReducer
    },

})
export const persistor = persistStore(Store)