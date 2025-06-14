import React from "react";
import { Box, Typography, Link, Grid, Stack } from "@mui/material"; // MUI components for typography and links
import { Background, Text } from "../enums/Colors";
import Image from "next/image";
import { GymValues } from "../enums/GymData";

const Footer = () => {
  return (
    <Stack
      sx={{
        width: "100%",
        minHeight: "50vh",
        maxHeight: "auto",
        backgroundColor: Background.PRIMARY,
        color: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        p: 5,
        fontWeight: "bold",
      }}
      spacing={5}
    >
      {/* Navigation Links */}
      <Grid container alignItems={"center"}>
        <Grid item xs={12} md={12 / 3}>
          <Image
            height={200}
            width={300}
            src={"/vet5logoDark.svg"}
            alt="logo"
          />
        </Grid>
        <Grid item xs={12} md={12 / 3}>
          <Stack spacing={2}>
            <Typography
              variant="body1"
              color={Text.PRIMARY}
              fontWeight={"bold"}
            >
              Contact Us:
            </Typography>
            <Typography
              variant="body2"
              color={Text.PRIMARY}
              fontWeight={"bold"}
            >
              Email: {GymValues.supportMail}
            </Typography>
            <Typography
              variant="body2"
              color={Text.PRIMARY}
              fontWeight={"bold"}
            >
              Phone: {GymValues.phoneNumber}
            </Typography>
          </Stack>
        </Grid>

        <Grid item xs={12} md={12 / 3}>
          <Typography variant="h6" m={2} color={Text.PRIMARY}>
            Links
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              gap: 5,
            }}
          >
            <Link href="/" color={Text.PRIMARY}>
              Home
            </Link>
            <Link href="/about" color={Text.PRIMARY}>
              About
            </Link>
            <Link href="/contact" color={Text.PRIMARY}>
              Contact
            </Link>
          </Box>
        </Grid>
      </Grid>

      {/* Copyright */}
      <Typography
        variant="body2"
        fontWeight={"bold"}
        sx={{ mt: 2 }}
        color={Text.PRIMARY}
      >
        © {new Date().getFullYear()} Jura Štefanović
      </Typography>
    </Stack>
  );
};

export default Footer;
