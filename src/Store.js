import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import tokenReducer from "./redux_toolkit_api/TokenReducer";

const persistConfig = {
  key: 'root',
  storage: storage,
};

const persistedReducer = persistReducer(persistConfig,tokenReducer );

//  Create Store
export const store = configureStore({
      //  reducer: persistedReducer,
    // reducer:{
    //     token : tokenReducer
    // }
     reducer:{
        token : persistedReducer
     }
    }
)

export const persistor = persistStore(store);

