export interface ReduxReducers {
  openMenu: Boolean;
}

export interface ReduxActions {
  type: String;
  payload: ReduxReducers;
}

export const TRIGGER_MENU = "TRIGGER_MENU";
