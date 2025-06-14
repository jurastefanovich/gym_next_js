import { Button, Typography, Container } from "@mui/material";
import { LockOutlined } from "@mui/icons-material";
import { Box, styled } from "@mui/system";
import { Text } from "../enums/Colors";

export const BoxNoMargin = styled(Box)({
  minHeight: "100vh",
  padding: 100,
  margin: 0,
});
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

const LoginButton = styled(Button)({
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
