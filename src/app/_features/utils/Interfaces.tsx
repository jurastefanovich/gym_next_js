import { CSSProperties, ReactNode } from "react";

export interface TextDecoration {
  textAlign:
    | CSSProperties["textAlign"]
    | { [key: string]: CSSProperties["textAlign"] };
}

export interface Children {
  children: ReactNode;
}

export interface TitleAndDesc {
  title: string;
  description: string;
}

export interface ContainerProps extends TitleAndDesc, TextDecoration, Children {
  img: string;
  body: string;
}

export interface ServiceProps extends TitleAndDesc {
  id: string;
}

export interface SingleService extends ServiceProps {}

export interface LoginData {
  fullName: string;
  accessToken: string;
  refreshToken: string;
}

export interface Message {
  value: string;
}

export interface RegResponse extends Message {}

export interface AuthInput extends Message {}

export interface ContactResponse extends Message {}

interface UserDto {
  username: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  id: number;
  email: string;
  initials: string;
}

export interface ProfileResponse extends UserDto {}
