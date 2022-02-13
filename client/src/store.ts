import { combineReducers, createStore, compose } from "redux";
import commonReducer from "./store/reducers/common";

const rootReducer = combineReducers({
  common: commonReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const defaultState: RootState = {
  common: {
    screen: {
      type: "HOME",
    },
  },
};

export default createStore(
  rootReducer,
  defaultState,
  ((window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose)()
);
