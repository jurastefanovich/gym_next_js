import { LSValues } from "../enums/Ls";
import { LoginData } from "./Interfaces";

export function getToken() {
  return localStorage.getItem(LSValues.TOKEN);
}

export function removeToken() {
  localStorage.removeItem(LSValues.TOKEN);
}

export function logout() {
  removeToken();
  removeAccessToken();
  removeRefreshToken();
}

function removeAccessToken() {
  localStorage.removeItem(LSValues.ACCESS_TOKEN);
}

function removeRefreshToken() {
  localStorage.removeItem(LSValues.REFRESH_TOKEN);
}

export function setToken(val: string) {
  localStorage.setItem(LSValues.TOKEN, val);
}

export function setFullName(val: string) {
  localStorage.setItem(LSValues.NAME, val);
}

export function getFullname() {
  return localStorage.getItem(LSValues.NAME);
}

export function setLoginData(data: LoginData) {
  setAccessToken(data.accessToken);
  setRefreshToken(data.refreshToken);
  setFullName(data.fullName);
}

export function isLoggedIn() {
  return getToken();
}

export function getRefreshToken() {
  return localStorage.getItem(LSValues.REFRESH_TOKEN);
}

export function setRefreshToken(val: string) {
  localStorage.setItem(LSValues.REFRESH_TOKEN, val);
}

export function setAccessToken(val: string) {
  localStorage.setItem(LSValues.ACCESS_TOKEN, val);
}

export function getAccessToken() {
  return localStorage.getItem(LSValues.ACCESS_TOKEN);
}
