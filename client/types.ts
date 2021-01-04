export interface ReduxReducers {
  openMenu: Boolean;
  tabBarVisible: Boolean;
  openProject: boolean;
  notification: boolean;
}

export interface ReduxActions {
  type: String;
  payload: ReduxReducers;
}

export const TRIGGER_MENU = "TRIGGER_MENU";
export const TRIGGER_TAB_BAR = "TRIGGER_TAB_BAR";
export const TRIGGER_NOTI = "TRIGGER_NOTI";
export const TRIGGER_PROJECT_CARD = "TRIGGER_PROJECT_CARD";
