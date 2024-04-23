import { configureStore } from '@reduxjs/toolkit';
import { useSelector as rawUseSelector, TypedUseSelectorHook } from 'react-redux';

import userInfoReducer from './userInfoSlice';

import inputReducer from './inputSlice';
import outputReducer from './outputSlice';
import tarTurnReducer from './tarTurnSlice';
import playingFlagReducer from './playingFlagSlice';
import displayConditionReducer from './displayConditionSlice';
import statisticsInfoReducer from './statisticsInfoSlice';

export const store = configureStore({
  reducer: {
    user: userInfoReducer,
    input: inputReducer,
    output: outputReducer,
    tarTurn: tarTurnReducer,
    playingFlag: playingFlagReducer,
    displayCondition: displayConditionReducer,
    statistics: statisticsInfoReducer,
  },
});

export type Appdispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useSelector: TypedUseSelectorHook<RootState> = rawUseSelector;