"use client";
import { Box, Typography, Button } from "@mui/material";
import { styled } from "@mui/system";
import Link from "next/link";

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
      <HeroTitle variant="h1">Gym</HeroTitle>
      <HeroSubtitle variant="h6" letterSpacing={15}>
        See the better you
      </HeroSubtitle>
      <Link href="/login" passHref legacyBehavior>
        <HeroButton variant="contained">Start training</HeroButton>
      </Link>
    </HeroSection>
  );
}
