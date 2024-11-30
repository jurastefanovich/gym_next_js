"use client";
import React from "react";
import { TextField, Button, Typography, Link, Container } from "@mui/material";
import { LockOutlined } from "@mui/icons-material";
import { styled } from "@mui/system";
import { Text } from "../_features/enums/Colors";

const Root = styled("div")({
  display: "flex",
  height: "100vh",
  backgroundImage: "url('/login.jpg')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundAttachment: "fixed",
  ["@media (min-width: 1200px)"]: {
    flexDirection: "row",
  },
  ["@media (max-width: 900px)"]: {
    flexDirection: "column",
  },
});

const FormContainer = styled(Container)(({ theme }) => ({
  padding: theme.spacing(4),
  backgroundColor: "#fff",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  width: "100%",
  maxWidth: "400px",
  height: "100vh",
  position: "relative",
  justifyContent: "center",
  alignItems: "center",
  display: "flex",
  flexDirection: "column",
  zIndex: 2,
  [theme.breakpoints.up("lg")]: {
    position: "absolute",
    top: "50%",
    right: "0",
    transform: "translateY(-50%)",
    maxWidth: "400px",
    width: "auto",
  },
  [theme.breakpoints.down("md")]: {
    width: "100%",
    maxWidth: "none",
    margin: "auto",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
}));

const Icon = styled(LockOutlined)({
  fontSize: "4rem",
  color: Text.SECONDARY,
  marginBottom: "16px",
  textAlign: "center",
});

const Title = styled(Typography)({
  textAlign: "center",
  marginBottom: "16px",
});

const SignUpButton = styled(Button)({
  marginTop: "16px",
  width: "100%",
  boxShadow: "none",
  "&:hover": {
    backgroundColor: "transparent",
    boxShadow: "none",
    color: Text.SECONDARY,
  },
});

const LinkContainer = styled("div")({
  textAlign: "center",
  marginTop: "16px",
});

export default function SignUp() {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [birthdate, setBirthdate] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      firstName,
      lastName,
      username,
      birthdate,
      password,
      confirmPassword,
    });
  };

  return (
    <Root>
      <FormContainer>
        <Icon />
        <Title variant="h5">Sign Up</Title>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="First Name"
            variant="outlined"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Last Name"
            variant="outlined"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Username"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Birthdate"
            type="date"
            variant="outlined"
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            required
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Confirm Password"
            type="password"
            variant="outlined"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            margin="normal"
            required
          />
          <SignUpButton type="submit" variant="contained">
            Sign Up
          </SignUpButton>
        </form>
        <LinkContainer>
          <Link href="/login" variant="body2">
            Already have an account? Log In
          </Link>
        </LinkContainer>
      </FormContainer>
    </Root>
  );
}
