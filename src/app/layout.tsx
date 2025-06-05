"use client";
import {
  createTheme,
  ThemeProvider,
  CssBaseline,
  Box,
  SnackbarContent,
} from "@mui/material";
import localFont from "next/font/local";
import Navbar from "./_features/navbar/Navbar";
import Footer from "./_features/footer/Footer";
import React from "react";
import { Montserrat } from "next/font/google";
import { SnackbarProvider } from "./context/SnackbarContext";
import { useTokenRefresher } from "./hooks/useTokenRefresher";
// Define your custom colors
const CRIMSON_RED = "#c1121f";

// Import fonts
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// Define the MUI theme with CRIMSON_RED as the primary color
const theme = createTheme({
  palette: {
    primary: {
      main: CRIMSON_RED,
    },
    secondary: {
      main: "#007bff",
    },
  },
  typography: {
    fontFamily: "var(--font-montserrat), Arial, sans-serif",
  },
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700"], // Regular and bold
  variable: "--font-montserrat", // Optional custom CSS variable
});

export const GlobalMargin = "10rem";
export const GlobalMarginReduced = -GlobalMargin;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // useTokenRefresher();
  return (
    <html lang="en" className={montserrat.variable}>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <SnackbarProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Navbar />
            <Box
              sx={{
                minHeight: "50vh",
              }}
            >
              {children}
            </Box>
            <Footer />
          </ThemeProvider>
        </SnackbarProvider>
      </body>
    </html>
  );
}
