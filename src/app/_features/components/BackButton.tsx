import { ArrowBack } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";

export default function BackButton() {
  const router = useRouter();
  return (
    <Button
      startIcon={<ArrowBack />}
      variant="outlined"
      onClick={() => router.back()}
      sx={{ alignSelf: { xs: "flex-start", sm: "center" } }}
    >
      Back
    </Button>
  );
}
