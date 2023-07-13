// action - customization reducer
export const SET_MENU = '@customization/SET_MENU';
export const MENU_TOGGLE = '@customization/MENU_TOGGLE';
export const MENU_OPEN = '@customization/MENU_OPEN';
export const SET_FONT_FAMILY = '@customization/SET_FONT_FAMILY';
export const SET_BORDER_RADIUS = '@customization/SET_BORDER_RADIUS';
export const SET_USERS = '@customization/SET_USERS';
export const SET_ROLES = '@customization/SET_ROLES';
export const ADD_USER = '@customization/ADD_USER';
export const ADD_ROLE = '@customization/ADD_ROLE';
export const UPDATE_USER = '@customization/UPDATE_USER';
export const UPDATE_ROLE = '@customization/UPDATE_ROLE';
export const DELETE_USER = '@customization/DELETE_USER';
export const DELETE_ROLE = '@customization/DELETE_ROLE';
export const SELECTED_USER = '@customization/SELECTED_USER';
export const SELECTED_ROLE = '@customization/SELECTED_ROLE';
export const POPUP_OPEN = '@customization/POPUP_OPEN';
export const SHOW_ALERT = '@customization/SHOW_ALERT';
export const RELOAD_DATA = '@customization/RELOAD_DATA';
export const SET_MENU_CUSTOM = '@customization/SET_MENU_CUSTOME';
export const SELECTED_FUNCTION = '@customization/SELECTED_FUNCTION';

// actions.js
export const setUsers = (data) => ({ type: SET_USERS, users: data });
export const setRoles = (data) => ({ type: SET_ROLES, roles: data });
export const addUser = (user) => ({ type: ADD_USER, user: user });
export const addRole = (role) => ({ type: ADD_ROLE, role: role });
export const updatedUser = (user) => ({ type: UPDATE_USER, user: user });
export const updatedRole = (role) => ({ type: UPDATE_ROLE, role: role });
export const deletedUser = (userId) => ({ type: DELETE_USER, userId: userId });
export const deletedRole = (roleId) => ({ type: DELETE_ROLE, roleId: roleId });
export const selectedUser = (user) => ({ type: SELECTED_USER, selectedUser: user });
export const selectedRole = (role) => ({ type: SELECTED_ROLE, selectedRole: role });
export const setOpenPopup = (status) => ({ type: POPUP_OPEN, openPopup: status });
export const setReloadData = (status) => ({ type: RELOAD_DATA, reloadData: status });
export const selectedFunction = (functions) => ({ type: SELECTED_FUNCTION, selectedFunction: functions });
export const showAlert = (alertId, alertType, alertContent) => ({
    type: SHOW_ALERT,
    payload: { alertId, alertType, alertContent },
});
export const setMenuCustom = (menu) => ({
    type: SET_MENU_CUSTOM,
    menu: menu
});
