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
  useMediaQuery,
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { useRouter, usePathname } from "next/navigation";
import { Background } from "../enums/Colors";
import AvatarMenu from "../components/AvatarMenu";
import { getAccessToken } from "../utils/LocalStorageHelpers";
import { useAuth } from "@/app/context/AuthContext";

const defaultItems = [
  { title: "Home", path: "/" },
  { title: "Services", path: "/services" },
  { title: "Contact", path: "/contact" },
  { title: "About us", path: "/about_us" },
];
const adminItem = [
  { title: "Home", path: "/" },
  { title: "Services", path: "/admin/services" },
  { title: "Sessions", path: "/appointments/group" },
  { title: "My Appointments", path: "/appointments/my-appointments" },
  { title: "Contact", path: "/contact" },
  { title: "About Us", path: "/about_us" },
];
const userItems = [
  { title: "Home", path: "/" },
  { title: "Services", path: "/services" },
  { title: "Appointments", path: "/user_appointments" },
  { title: "Contact", path: "/contact" },
  { title: "About Us", path: "/about_us" },
];

export default function Navbar() {
  const path = usePathname();
  const hasToken = getAccessToken();
  const user = useAuth();

  const router = useRouter();
  const isLogin = path.toLowerCase() === "/login";
  const isSignUp = path.toLowerCase() === "/signup";
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const isSmallScreen = useMediaQuery((theme: any) =>
    theme.breakpoints.down("sm")
  );

  const navItems = React.useMemo(() => {
    if (!hasToken) return defaultItems;
    if (user?.data?.role === "ADMIN" || user?.data?.role === "TRAINER")
      return adminItem;
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
        anchor="left"
        open={openDrawer}
        onClose={handleDrawerToggle}
        sx={{
          width: 250,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 250,
            boxSizing: "border-box",
            bgcolor: Background.PRIMARY,
          },
        }}
      >
        <Box sx={{ padding: 2 }}>
          {navItems.map((item) => (
            <Button
              key={item.title}
              color="secondary"
              onClick={() => {
                redirect(item.path);
                setOpenDrawer(false); // Close the drawer after navigation
              }}
              sx={{ width: "100%", padding: "10px 0" }}
            >
              {item.title}
            </Button>
          ))}
        </Box>
      </Drawer>
    </Box>
  );
}
