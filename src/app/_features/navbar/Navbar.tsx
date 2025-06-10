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

const defaultItems = [
  { title: "Početak", path: "/" },
  { title: "Usluge", path: "/services" },
  { title: "Kontakt", path: "/contact" },
  { title: "O nama", path: "/about_us" },
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
  { title: "Početak", path: "/" },
  { title: "Usluge", path: "/services" },
  { title: "Narudžbe", path: "/user_appointments" },
  { title: "Kontakt", path: "/contact" },
  { title: "O nama", path: "/about_us" },
];

export default function Navbar() {
  const path = usePathname();
  const hasToken = getAccessToken();
  const navItems = getNavItems();
  const router = useRouter();
  const isLogin = path.toLowerCase() === "/login";
  const isSignUp = path.toLowerCase() === "/signup";
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const isSmallScreen = useMediaQuery((theme: any) =>
    theme.breakpoints.down("sm")
  );

  function getNavItems() {
    return hasToken ? adminItem : defaultItems;
  }

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
                <Button onClick={() => redirect("/login")}>Login</Button>
              ) : null}
              {!isSignUp ? (
                <Button variant="outlined" onClick={() => redirect("/signup")}>
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
          },
        }}
      >
        <Box sx={{ padding: 2 }}>
          {navItems.map((item) => (
            <Button
              key={item.title}
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
