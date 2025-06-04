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
  token: string;
  fullName: string;
}

export interface Message {
  value: string;
}

export interface RegResponse extends Message {}

export interface AuthInput extends Message {}
