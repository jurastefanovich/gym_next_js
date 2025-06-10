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

interface UserBasic {
  firstName: string;
  lastName: string;
  id: number;
  email: string;
}

interface UserDto extends UserBasic {
  username: string;
  phoneNumber: string;
  initials: string;
}

export interface ProfileResponse extends UserDto {}

export interface TrainerDto extends UserDto {}

export interface TrainerIntroduction extends UserBasic {
  description: string;
  specialization: string[];
}

export interface ServiceDto {
  id: number;
  title: string;
  description: string;
  duration: number;
}

export interface ServiceDetail extends ServiceDto {
  trainer: TrainerDto;
  needsTrainer: boolean;
  individual: boolean;
}

export interface ServiceCRUD extends ServiceDetail {
  maxUsersPerGroupSession: number;
}

export interface ServiceTableDto extends ServiceDto {
  maxUsersPerGroupSession: number;
}

export interface GroupAppointmentTableDto {
  id: number;
  serviceTitle: string;
  date: string;
  duration: number;
  currentParticipants: number;
  maxParticipants: number;
}