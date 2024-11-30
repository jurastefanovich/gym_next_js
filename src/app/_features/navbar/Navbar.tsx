"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Background, Text } from "../enums/Colors";
import { useRouter, usePathname } from "next/navigation";
const navItems = ["Usluge", "Kontakt", "O nama"];

export default function Navbar() {
  const path = usePathname();
  const rout = useRouter();
  const isLogin = path === "/login";
  const isSignUp = path === "/signUp";

  function redirect(path: string) {
    rout.push(path);
  }
  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        component="nav"
        sx={{ bgcolor: Background.SECONDARY, boxShadow: "none" }}
      >
        <Toolbar>
          <Typography
            color="primary"
            variant="h6"
            component="div"
            fontWeight={"bold"}
            sx={{
              flexGrow: 1,
              display: { xs: "none", sm: "block" },
            }}
          >
            Gym
          </Typography>
          <Box
            sx={{
              display: { xs: "none", sm: "block" },
            }}
          >
            {navItems.map((item) => (
              <Button key={item}>{item}</Button>
            ))}
            <Button onClick={() => redirect("/login")}>Login</Button>
            <Button variant="outlined" onClick={() => redirect("/signup")}>
              Sign Up
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
