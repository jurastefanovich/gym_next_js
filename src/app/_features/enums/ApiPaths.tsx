const BASE_URL = "http://localhost:8080";
const USER_CONTROLLER = `${BASE_URL}/users`;
const AUTH_CONTROLLER = `${BASE_URL}/auth`;
const SERVICES_CONTROLLER = `${BASE_URL}/gym-services`;
const APPOINTMENT_CONTROLLER = `${BASE_URL}/appointments`;
const TRAINER_CONTROLLER = `${BASE_URL}/trainers`;

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

export enum ServicesApi {
  ALL = `${SERVICES_CONTROLLER}`,
  GET_BY_ID = `${SERVICES_CONTROLLER}/`,
  UPDATE_BY_ID = `${SERVICES_CONTROLLER}`,
  POST_NEW = `${SERVICES_CONTROLLER}`,
}

export enum AppointmentApi {
  SERVICE_BOOK = `${APPOINTMENT_CONTROLLER}`,
  GET_ALL = `${APPOINTMENT_CONTROLLER}`,
  GET_BY_ID = `${APPOINTMENT_CONTROLLER}/`,
  CANCEL_BY_ID = `${APPOINTMENT_CONTROLLER}/cancel/`,
  UPDATE_BY_ID = `${APPOINTMENT_CONTROLLER}/`,
}

export enum TrainerApi {
  INTRO = `${TRAINER_CONTROLLER}/introduction/`,
}
