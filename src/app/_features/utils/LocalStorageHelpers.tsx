import { LSValues } from "../enums/Ls";
import { LoginData } from "./Interfaces";

export function getToken() {
  return localStorage.getItem(LSValues.TOKEN);
}

export function removeToken() {
  localStorage.removeItem(LSValues.TOKEN);
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
  setToken(data.token);
  setFullName(data.fullName);
}
