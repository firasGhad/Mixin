import {createStore, combineReducers} from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer , persistCombineReducers} from 'redux-persist';

import wishlistReducer from './reducers/wishlistReducer';
import navigatorReducer from './reducers/navigatorReducer';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['navigatorReducer', 'wishlistReducer']
  };

const rootReducer = combineReducers({
  wishlistReducer,
  navigatorReducer
});

const persistenedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistenedReducer);
const persistor = persistStore(store);

export default {store, persistor};
