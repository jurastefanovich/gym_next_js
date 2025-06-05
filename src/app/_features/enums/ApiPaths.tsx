const BASE_URL = "http://localhost:8080";
const USER_CONTROLLER = `${BASE_URL}/users`;
const AUTH_CONTROLLER = `${BASE_URL}/auth`;

export enum UserApi {
  PROFILE = `${USER_CONTROLLER}/loggedIn/user/profile`,
  DELETE_BY_ID = `${USER_CONTROLLER}`,
  UPDATE_BY_ID = `${USER_CONTROLLER}`,
  GET_BY_ID = `${USER_CONTROLLER}`,
  NEW_USER = `${USER_CONTROLLER}`,
  GET_ALL = `${USER_CONTROLLER}`,
}

export enum AuthApi {
  LOGIN = `${AUTH_CONTROLLER}/login`,
  REGISTER = `${AUTH_CONTROLLER}/register`,
}
