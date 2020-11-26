import React from "react";
import { Action, createStore } from "redux";
import { Provider } from "react-redux";
import HomeScreen from "./src/screens/HomeScreen";
import { ReduxReducers, TRIGGER_MENU, TRIGGER_TAB_BAR } from "./types";
import { StatusBar } from "expo-status-bar";
import Navigation from "./src/navigator";

const initialState: ReduxReducers = {
  openMenu: true,
  tabBarVisible: true,
};

const reducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case TRIGGER_MENU:
      return { ...state, openMenu: !state.openMenu };
    case TRIGGER_TAB_BAR:
      return { ...state, tabBarVisible: !state.tabBarVisible };
    default:
      return state;
  }
};

const store = createStore(reducer);

const App = ({}) => (
  <Provider store={store}>
    <Navigation />
    <StatusBar />
  </Provider>
);

export default App;
