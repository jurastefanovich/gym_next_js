const ADMIN_ROOT = "/admin/";
const APPOINTMENTS_ROOT = "/appointments/";
const SESSIONS_ROOT = `${APPOINTMENTS_ROOT}group/`;
import {
  Home as HomeIcon,
  MiscellaneousServices as ServicesIcon,
  ContactMail as ContactIcon,
  Info as AboutIcon,
  Event as AppointmentsIcon,
  Dashboard as DashboardIcon,
  Groups as SessionsIcon,
} from "@mui/icons-material";

export enum GENERAL {
  HOME = "/",
  LOGIN = "/login",
  SIGNUP = "/signup",
  ABOUT_US = "/about_us",
  CONTACT = "/contact",
  PROFILE = "/profile",
  SETTINGS = "/settings",
  TRAINER_ID = "/trainers/",
}

export enum ADMIN_ROUTES {
  SERVICES = `${ADMIN_ROOT}services`,
  DASH = `${ADMIN_ROOT}dashboard`,
  SESSIONS = `${SESSIONS_ROOT}`,
  MY_APPOINTMENTS = `${APPOINTMENTS_ROOT}my-appointments/`,
  ADD_SERVICE = `${ADMIN_ROOT}services/new`,
  ADD_SESSION = `${SESSIONS_ROOT}new`,
  EDIT_SESSION = `${SESSIONS_ROOT}edit/`,
  FINISH_SESSION = `${SESSIONS_ROOT}finish/`,
  USER = "/users/user/",
}

export enum USER_ROUTES {
  SERVICES = "/services",
  APPOINTMENTS = "/user_appointments/",
}

const BASE_ITEMS = {
  HOME: { title: "Home", path: GENERAL.HOME, icon: <HomeIcon /> },
  SERVICES_USER: {
    title: "Services",
    path: USER_ROUTES.SERVICES,
    icon: <ServicesIcon />,
  },
  SERVICES_ADMIN: {
    title: "Services",
    path: ADMIN_ROUTES.SERVICES,
    icon: <ServicesIcon />,
  },
  CONTACT: { title: "Contact", path: GENERAL.CONTACT, icon: <ContactIcon /> },
  ABOUT: { title: "About Us", path: GENERAL.ABOUT_US, icon: <AboutIcon /> },
  DASHBOARD: {
    title: "Dashboard",
    path: ADMIN_ROUTES.DASH,
    icon: <DashboardIcon />,
  },
  SESSIONS: {
    title: "Sessions",
    path: ADMIN_ROUTES.SESSIONS,
    icon: <SessionsIcon />,
  },
  APPOINTMENTS: {
    title: "Appointments",
    path: USER_ROUTES.APPOINTMENTS,
    icon: <AppointmentsIcon />,
  },
};

// Menus per role
export const DEFAULT_NAV = [
  BASE_ITEMS.HOME,
  BASE_ITEMS.SERVICES_USER,
  BASE_ITEMS.CONTACT,
  BASE_ITEMS.ABOUT,
];

export const ADMIN_NAV = [
  BASE_ITEMS.HOME,
  BASE_ITEMS.SERVICES_ADMIN,
  BASE_ITEMS.DASHBOARD,
  BASE_ITEMS.ABOUT,
];

export const TRAINER_NAV = [
  BASE_ITEMS.HOME,
  BASE_ITEMS.SERVICES_ADMIN,
  BASE_ITEMS.SESSIONS,
  BASE_ITEMS.ABOUT,
];

export const USER_NAV = [
  BASE_ITEMS.HOME,
  BASE_ITEMS.SERVICES_USER,
  BASE_ITEMS.APPOINTMENTS,
  BASE_ITEMS.CONTACT,
  BASE_ITEMS.ABOUT,
];
