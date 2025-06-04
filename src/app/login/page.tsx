"use client";

import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Link,
  Container,
  CircularProgress,
} from "@mui/material";
import { LockOpenOutlined, LockOutlined, LockReset } from "@mui/icons-material";
import { styled } from "@mui/system";
import { usePost } from "../hooks/usePost"; // Adjust path based on actual file location
import { useRouter } from "next/navigation";
import { Text } from "../_features/enums/Colors";
import { useRedirectIfAuthenticated } from "../hooks/useRedirectIfAuthenticated";
import { setLoginData } from "../_features/utils/LocalStorageHelpers";
import { LoginData } from "../_features/utils/Interfaces";
const Icon = styled(LockOutlined)({
  fontSize: "4rem",
  color: Text.SECONDARY,
  marginBottom: "16px",
  textAlign: "center",
});
//Styles
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

const Title = styled(Typography)({
  textAlign: "center",
  marginBottom: "16px",
});

export default function LoginForm() {
  useRedirectIfAuthenticated();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { post, loading } = usePost<LoginData>();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const obj = {
      email: String(email),
      password: String(password),
    };

    const response = await post("http://localhost:8080/auth/login", obj);

    if (response) {
      setLoginData(response);
      router.push("/"); // redirect after login
    }
  };

  return (
    <Root>
      <FormContainer>
        <Icon />
        <Title variant="h5">Log In</Title>
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            margin="normal"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            margin="normal"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={loading}
            sx={{ mt: 2 }}
          >
            {loading ? <CircularProgress size={24} /> : "Login"}
          </Button>
          <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            Don't have an account? <Link href="/signup">Register</Link>
          </Typography>
        </form>
      </FormContainer>
    </Root>
  );
}
