import React from "react";
import { Action, createStore } from "redux";
import { Provider } from "react-redux";
import HomeScreen from "./src/screens/HomeScreen";
import { ReduxReducers } from "./types";
import { StatusBar } from "expo-status-bar";
import Navigation from "./src/navigator";

const initialState: ReduxReducers = {
  openMenu: true,
};

const reducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case "TRIGGER_MENU":
      return { openMenu: !state.openMenu };
  }

  return state;
};

const store = createStore(reducer);

const App = ({}) => (
  <Provider store={store}>
    <Navigation />
    <StatusBar />
  </Provider>
);

export default App;
