"use client";
import { Box, Typography, Button } from "@mui/material";
import { Stack, styled } from "@mui/system";
import Link from "next/link";
import { Names } from "../enums/Text";
import { getAccessToken } from "../utils/LocalStorageHelpers";
import { ArrowForward } from "@mui/icons-material";

const HeroSection = styled(Box)(({ theme }) => ({
  position: "relative",
  backgroundImage: "url('/hero.jpg')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  height: "100vh",
  margin: 0,
  color: "#fff",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
}));

const HeroTitle = styled(Typography)({
  fontSize: "4rem",
  fontWeight: "bold",
  textTransform: "uppercase",
  marginBottom: "16px",
});

const HeroSubtitle = styled(Typography)({
  fontSize: "1.5rem",
  marginBottom: "24px",
});

const HeroButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(2, 4),
  fontSize: "1rem",
  fontWeight: "bold",
  backgroundColor: "#c1121f",
  color: "#fff",
  "&:hover": {
    backgroundColor: "#a10f1b",
  },
}));

export default function Hero() {
  return (
    <HeroSection>
      <HeroTitle variant="h1">{Names.GYM}</HeroTitle>
      <HeroSubtitle variant="h6" letterSpacing={15}>
        See the better you
      </HeroSubtitle>
      <AuthButton />
    </HeroSection>
  );
}

function AuthButton() {
  const hasToken = getAccessToken();
  if (hasToken) {
    return null;
  } else {
    return (
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        justifyContent="center"
      >
        <Button
          variant="outlined"
          size="large"
          color="inherit"
          endIcon={<ArrowForward />}
          href="/services"
        >
          Explore Services
        </Button>
        <Button
          variant="contained"
          size="large"
          endIcon={<ArrowForward />}
          href="/signup"
        >
          Join Now
        </Button>
      </Stack>
    );
  }
}
