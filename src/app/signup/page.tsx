"use client";
import { LockOpenOutlined } from "@mui/icons-material";
import {
  Button,
  CircularProgress,
  Container,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { Stack, styled } from "@mui/system";
import { useRouter } from "next/navigation";
import React from "react";
import { Text } from "../_features/enums/Colors";
import { AuthInput, RegResponse } from "../_features/utils/Interfaces";
import { usePost } from "../hooks/usePost";
import { useRedirectIfAuthenticated } from "../hooks/useRedirectIfAuthenticated";

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

const Icon = styled(LockOpenOutlined)({
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

type AuthFormFields = {
  firstName?: AuthInput;
  lastName?: AuthInput;
  username?: AuthInput;
  birthdate?: AuthInput;
  email?: AuthInput;
  password?: AuthInput;
  confirmPassword?: AuthInput;
};

export default function SignUp() {
  useRedirectIfAuthenticated();
  const { post, loading } = usePost<RegResponse>();
  const router = useRouter();

  const [formFields, setFormFields] = React.useState<AuthFormFields>({});
  const updateField = (field: keyof AuthFormFields, value: AuthInput) => {
    setFormFields((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const {
      firstName,
      lastName,
      username,
      birthdate,
      password,
      confirmPassword,
      email,
    } = formFields;

    const obj = {
      firstName: firstName?.value,
      lastName: lastName?.value,
      username: username?.value,
      birthdate: birthdate?.value,
      password: password?.value,
      confirmPassword: confirmPassword?.value,
      email: email?.value,
    };

    const res = await post("http://localhost:8080/auth/register", obj);

    if (res) {
      router.push("/login");
    }
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
            size="small"
            value={formFields.firstName?.value || ""}
            onChange={(e) =>
              updateField("firstName", { value: e.target.value })
            }
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Last Name"
            size="small"
            variant="outlined"
            value={formFields.lastName?.value || ""}
            onChange={(e) => updateField("lastName", { value: e.target.value })}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Username"
            size="small"
            variant="outlined"
            value={formFields.username?.value || ""}
            onChange={(e) => updateField("username", { value: e.target.value })}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Birthdate"
            size="small"
            variant="outlined"
            value={formFields.birthdate?.value || ""}
            onChange={(e) =>
              updateField("birthdate", { value: e.target.value })
            }
            margin="normal"
            required
          />
          <TextField
            fullWidth
            size="small"
            label="Email"
            variant="outlined"
            value={formFields.email?.value || ""}
            onChange={(e) => updateField("email", { value: e.target.value })}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            size="small"
            label="Password"
            variant="outlined"
            type="password"
            value={formFields.password?.value || ""}
            onChange={(e) => updateField("password", { value: e.target.value })}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            size="small"
            label="Confirm Password"
            variant="outlined"
            type="password"
            value={formFields.confirmPassword?.value || ""}
            onChange={(e) =>
              updateField("confirmPassword", { value: e.target.value })
            }
            margin="normal"
            required
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={loading}
            sx={{ mt: 2 }}
          >
            {loading ? <CircularProgress size={24} /> : "Sign Up"}
          </Button>
          <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            Already have an account? <Link href="/login">Login</Link>
          </Typography>
        </form>
      </FormContainer>
    </Root>
  );
}
