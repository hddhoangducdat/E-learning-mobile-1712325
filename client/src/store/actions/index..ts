import { Action } from "redux";
import {
  ReduxReducers,
  TRIGGER_MENU,
  TRIGGER_TAB_BAR,
  TRIGGER_PROJECT_CARD,
  TRIGGER_NOTI,
} from "../../../types";
import { initialState } from "../reducers";

export const reducer = (
  state = initialState,
  action: Action
): ReduxReducers => {
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
