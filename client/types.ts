export interface ReduxReducers {
  openMenu: Boolean;
  tabBarVisible: Boolean;
}

export interface ReduxActions {
  type: String;
  payload: ReduxReducers;
}

export const TRIGGER_MENU = "TRIGGER_MENU";
export const TRIGGER_TAB_BAR = "TRIGGER_TAB_BAR";
