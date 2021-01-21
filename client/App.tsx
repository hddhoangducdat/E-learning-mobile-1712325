import React from "react";
import { Action, createStore } from "redux";
import { Provider, useDispatch } from "react-redux";
import { Provider as GraphqlProvider, createClient } from "urql";
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
import { reducer } from "./src/store/actions/index.";

console.disableYellowBox = true;

const client = createUrqlClient();

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
