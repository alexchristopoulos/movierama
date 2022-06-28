import { configureStore } from '@reduxjs/toolkit';
import appSlice from './reducers/app';
import {combineReducers} from 'redux';
import rootSaga from './sagas';
import createSagaMiddleware from 'redux-saga';

const sagaMiddleware = createSagaMiddleware();

const reducer = combineReducers({
    app: appSlice.reducer
});

const store = configureStore({
    reducer: reducer,
    devTools: true,
    middleware: [ sagaMiddleware ]
})

sagaMiddleware.run(rootSaga);

export default store;