import React from "react";
import { Action, createStore } from "redux";
import { Provider, useDispatch } from "react-redux";
import HomeScreen from "./src/screens/HomeScreen";
import { Provider as GraphqlProvider, createClient } from "urql";
import { registerRootComponent } from "expo";
import {
  ReduxReducers,
  TRIGGER_MENU,
  TRIGGER_NOTI,
  TRIGGER_PROJECT_CARD,
  TRIGGER_TAB_BAR,
} from "./types";
import { StatusBar } from "expo-status-bar";
import Navigation from "./src/navigator";
import { createUrqlClient } from "./src/utils/createUrqlClient";

console.disableYellowBox = true;

const client = createUrqlClient();

const initialState: ReduxReducers = {
  openMenu: false,
  tabBarVisible: true,
  openProject: false,
  notification: false,
};

const reducer = (state = initialState, action: Action): ReduxReducers => {
  switch (action.type) {
    case TRIGGER_MENU:
      return { ...state, openMenu: action.payload };
    case TRIGGER_TAB_BAR:
      return { ...state, tabBarVisible: action.payload };
    case TRIGGER_PROJECT_CARD:
      return { ...state, openProject: action.payload };
    case TRIGGER_NOTI:
      return { ...state, notification: action.payload };
    default:
      return state;
  }
};

const store = createStore(reducer);

const App = ({}) => {
  return (
    <GraphqlProvider value={client}>
      <Provider store={store}>
        <Navigation />
        <StatusBar />
      </Provider>
    </GraphqlProvider>
  );
};

export default App;
