// project imports
import config from 'config';

// action - state management
import * as actionTypes from './actions';

export const initialState = {
  isOpen: [], // for active default menu
  defaultId: 'default',
  fontFamily: config.fontFamily,
  borderRadius: config.borderRadius,
  opened: true,
  users: [],
  roles: [],
  selectedUser: '',
  selectedRole: '',
  selectedFunction: '',
  openPopup: false,
  openSubPopup: false,
  showAlert: false,
  alertId: null,
  alertType: '',
  alertContent: '',
  reloadData: false,
  menu: [],
  selectedLanguage: 'vi',
  user: [1, 2, 3]
};

// ==============================|| CUSTOMIZATION REDUCER ||============================== //

const customizationReducer = (state = initialState, action) => {
  let id;
  switch (action.type) {
    case actionTypes.MENU_OPEN:
      id = action.id;
      return {
        ...state,
        isOpen: [id]
      };
    case actionTypes.SET_MENU:
      return {
        ...state,
        opened: action.opened
      };
    case actionTypes.SET_FONT_FAMILY:
      return {
        ...state,
        fontFamily: action.fontFamily
      };
    case actionTypes.SET_BORDER_RADIUS:
      return {
        ...state,
        borderRadius: action.borderRadius
      };
    // User
    case actionTypes.SET_USERS:
      return {
        ...state,
        users: action.users
      };
    // Role
    case actionTypes.SET_ROLES:
      return {
        ...state,
        roles: action.roles
      };
    case actionTypes.ADD_USER:
      return {
        ...state,
        users: [...state.users, action.user]
      };
    case actionTypes.ADD_ROLE:
      return {
        ...state,
        roles: [...state.roles, action.role]
      };
    case actionTypes.UPDATE_USER: {
      const updatedUser = action.user;
      const updatedUsers = state.users.map((user) => (user.id === updatedUser.id ? updatedUser : user));
      return {
        ...state,
        users: updatedUsers
      };
    }
    case actionTypes.UPDATE_ROLE: {
      const updatedRole = action.role;
      const updatedRoles = state.roles.map((role) => (role.roleId === updatedRole.roleId ? updatedRole : role));
      return {
        ...state,
        roles: updatedRoles
      };
    }
    case actionTypes.DELETE_USER: {
      const userIdToDelete = action.userId;
      const updatedUsers = state.users.filter((user) => user.id !== userIdToDelete);
      return {
        ...state,
        users: updatedUsers
      };
    }
    case actionTypes.DELETE_ROLE: {
      const roleIdToDelete = action.roleId;
      const updatedRoles = state.roles.filter((role) => role.roleId !== roleIdToDelete);
      return {
        ...state,
        roles: updatedRoles
      };
    }
    case actionTypes.SELECTED_USER:
      return {
        ...state,
        selectedUser: action.selectedUser
      };
    // Functions
    case actionTypes.SELECTED_FUNCTION:
      return {
        ...state,
        selectedFunction: action.selectedFunction
      };
    case actionTypes.SELECTED_LANGUAGE:
      return {
        ...state,
        selectedLanguage: action.selectedLanguage
      };
    case actionTypes.SELECTED_ROLE:
      return {
        ...state,
        selectedRole: action.selectedRole
      };
    case actionTypes.POPUP_OPEN:
      return {
        ...state,
        openPopup: action.openPopup
      };
    case actionTypes.SUB_POPUP_OPEN:
      return {
        ...state,
        openSubPopup: action.openSubPopup
      };
    case actionTypes.RELOAD_DATA:
      return {
        ...state,
        reloadData: action.reloadData
      };
    case actionTypes.SELECTED_ACTION:
      return {
        ...state,
        selectedAction: action.selectedAction
      };
    case actionTypes.SHOW_ALERT:
      return {
        ...state,
        showAlert: true,
        alertId: action.payload.alertId,
        alertType: action.payload.alertType,
        alertContent: action.payload.alertContent
      };
    case actionTypes.SET_MENU_CUSTOM:
      return {
        ...state,
        menu: action.menu
      };

    case actionTypes.USER_LOGIN:
      return {
        ...state,
        user: action.user
      };
    // Default
    default:
      return state;
  }
};

export default customizationReducer;
