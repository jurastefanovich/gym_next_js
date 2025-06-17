"use client";

import * as React from "react";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { useRouter, usePathname } from "next/navigation";
import { Background } from "../enums/Colors";
import AvatarMenu from "../components/AvatarMenu";
import { getAccessToken } from "../utils/LocalStorageHelpers";
import { useAuth } from "@/app/context/AuthContext";
import {
  Home as HomeIcon,
  MiscellaneousServices as ServicesIcon,
  ContactMail as ContactIcon,
  Info as AboutIcon,
  Event as AppointmentsIcon,
  Dashboard as DashboardIcon,
  Groups as SessionsIcon,
} from "@mui/icons-material";

const defaultItems = [
  { title: "Home", path: "/", icon: <HomeIcon /> },
  { title: "Services", path: "/services", icon: <ServicesIcon /> },
  { title: "Contact", path: "/contact", icon: <ContactIcon /> },
  { title: "About us", path: "/about_us", icon: <AboutIcon /> },
];

const adminItem = [
  { title: "Home", path: "/", icon: <HomeIcon /> },
  { title: "Services", path: "/admin/services", icon: <ServicesIcon /> },
  // {
  //   title: "My Appointments",
  //   path: "/appointments/my-appointments",
  //   icon: <AppointmentsIcon />,
  // },
  { title: "Dashboard", path: "/admin/dashboard", icon: <DashboardIcon /> },
];
const trainerItem = [
  { title: "Home", path: "/", icon: <HomeIcon /> },
  { title: "Services", path: "/admin/services", icon: <ServicesIcon /> },
  { title: "Sessions", path: "/appointments/group", icon: <SessionsIcon /> },
  // {
  //   title: "My Appointments",
  //   path: "/appointments/my-appointments",
  //   icon: <AppointmentsIcon />,
  // },
];

const userItems = [
  { title: "Home", path: "/", icon: <HomeIcon /> },
  { title: "Services", path: "/services", icon: <ServicesIcon /> },
  {
    title: "Appointments",
    path: "/user_appointments",
    icon: <AppointmentsIcon />,
  },
  { title: "Contact", path: "/contact", icon: <ContactIcon /> },
  { title: "About Us", path: "/about_us", icon: <AboutIcon /> },
];

export default function Navbar() {
  const path = usePathname();
  const hasToken = getAccessToken();
  const user = useAuth();

  const router = useRouter();
  const isLogin = path.toLowerCase() === "/login";
  const isSignUp = path.toLowerCase() === "/signup";
  const [openDrawer, setOpenDrawer] = React.useState(false);

  const navItems = React.useMemo(() => {
    if (!hasToken) return defaultItems;
    if (user?.data?.role === "ADMIN") return adminItem;
    if (user?.data?.role === "TRAINER") {
      return trainerItem;
    }
    if (user?.data?.role === "USER") return userItems;
    return defaultItems;
  }, [user?.data?.role, hasToken, user?.loading]);

  function redirect(path: string) {
    router.push(path);
  }

  const handleDrawerToggle = () => {
    setOpenDrawer(!openDrawer);
  };

  return (
    <Box sx={{ display: "block", boxShadow: "none" }}>
      <AppBar
        sx={{
          boxShadow: "none",
          bgcolor: Background.PRIMARY, // Make the navbar transparent
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            bgcolor: "transparent", // Make the navbar transparent
          }}
        >
          <IconButton
            edge="start"
            aria-label="menu"
            sx={{ display: { xs: "flex" }, color: "white" }}
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
          {hasToken ? (
            <AvatarMenu />
          ) : (
            <Box>
              {!isLogin ? (
                <Button
                  sx={{ color: "white" }}
                  onClick={() => redirect("/login")}
                >
                  Login
                </Button>
              ) : null}
              {!isSignUp ? (
                <Button
                  variant="outlined"
                  sx={{ color: "white" }}
                  onClick={() => redirect("/signup")}
                >
                  Sign Up
                </Button>
              ) : null}
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* Drawer (Hamburger Menu) */}
      <Drawer
        variant="temporary"
        anchor="left"
        open={openDrawer}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better for mobile performance
        }}
        sx={{
          "& .MuiDrawer-paper": {
            width: 280,
            boxSizing: "border-box",
            bgcolor: "background.paper",
            borderRight: "1px solid",
            borderColor: "divider",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            padding: "8px 0",
          }}
        >
          {/* Logo/Header Section */}
          <Box
            sx={{
              padding: "16px 24px",
              borderBottom: "1px solid",
              borderColor: "divider",
              mb: 2,
            }}
          >
            <Typography variant="h6" fontWeight="bold" color="primary">
              Gym Admin
            </Typography>
          </Box>

          {/* Navigation Items */}
          <Box sx={{ flex: 1, overflow: "auto" }}>
            {navItems.map((item) => (
              <Button
                key={item.title}
                color={location.pathname === item.path ? "primary" : "inherit"}
                onClick={() => {
                  redirect(item.path);
                  setOpenDrawer(false);
                }}
                startIcon={item.icon}
                sx={{
                  width: "calc(100% - 16px)",
                  mx: "8px",
                  mb: "4px",
                  justifyContent: "flex-start",
                  borderRadius: "6px",
                  padding: "10px 16px",
                  transition: "all 0.2s",
                  ...(location.pathname === item.path && {
                    bgcolor: "primary.lighter",
                    "&:hover": {
                      bgcolor: "primary.light",
                    },
                  }),
                  "&:hover": {
                    bgcolor: "action.hover",
                  },
                }}
              >
                <Typography
                  variant="body1"
                  fontWeight={location.pathname === item.path ? 600 : 400}
                  sx={{ flexGrow: 1, textAlign: "left" }}
                >
                  {item.title}
                </Typography>
                {location.pathname === item.path && (
                  <Box
                    sx={{
                      width: 4,
                      height: 24,
                      bgcolor: "primary.main",
                      borderRadius: "4px 0 0 4px",
                      position: "absolute",
                      right: 0,
                    }}
                  />
                )}
              </Button>
            ))}
          </Box>

          {/* Footer Section */}
          <Box
            sx={{
              padding: "16px",
              borderTop: "1px solid",
              borderColor: "divider",
              textAlign: "center",
            }}
          >
            <Typography variant="caption" color="text.secondary">
              v1.0.0
            </Typography>
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
}
