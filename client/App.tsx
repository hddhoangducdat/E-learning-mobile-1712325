import React from "react";
import { Action, createStore } from "redux";
import { Provider } from "react-redux";
import HomeScreen from "./src/screens/HomeScreen";
import { Provider as GraphqlProvider, createClient } from "urql";
import {
  ReduxReducers,
  TRIGGER_MENU,
  TRIGGER_PROJECT_CARD,
  TRIGGER_TAB_BAR,
} from "./types";
import { StatusBar } from "expo-status-bar";
import Navigation from "./src/navigator";
import { createUrqlClient } from "./src/utils/createUrqlClient";

const client = createUrqlClient();

const initialState: ReduxReducers = {
  openMenu: false,
  tabBarVisible: true,
  openProject: false,
};

const reducer = (state = initialState, action: Action): ReduxReducers => {
  switch (action.type) {
    case TRIGGER_MENU:
      return { ...state, openMenu: !state.openMenu };
    case TRIGGER_TAB_BAR:
      return { ...state, tabBarVisible: !state.tabBarVisible };
    case TRIGGER_PROJECT_CARD:
      return { ...state, openProject: (action as any).payload };
    default:
      return state;
  }
};

const store = createStore(reducer);

const App = ({}) => (
  <GraphqlProvider value={client}>
    <Provider store={store}>
      <Navigation />
      <StatusBar />
    </Provider>
  </GraphqlProvider>
);

export default App;
