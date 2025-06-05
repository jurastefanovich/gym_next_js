"use client";
import { ServiceDto, ServiceProps } from "@/app/_features/utils/Interfaces";
import { Button, Typography, Card, CardContent } from "@mui/material";
import React from "react";
import { useRouter } from "next/navigation";
import { Background } from "@/app/_features/enums/Colors";

const ServiceRow: React.FC<ServiceDto> = ({
  description,
  durationSeconds,
  title,
  id,
}) => {
  const navigate = useRouter();

  function redirect(path: string) {
    navigate.push(path);
  }

  return (
    <Card
      sx={{
        borderRadius: 2,
        boxShadow: "none",
        minHeight: 250,
        bgcolor: Background.PRIMARY,
        color: "whitesmoke",
      }}
    >
      <CardContent sx={{ padding: 3 }}>
        <Typography
          variant="h5"
          fontWeight="bold"
          mb={2}
          sx={{
            fontSize: { xs: "1.2rem", sm: "1.75rem" }, // Responsive title size
            textAlign: "center",
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="body1"
          color="whitesmoke"
          mb={3}
          sx={{
            fontSize: { xs: "0.9rem", sm: "1rem" }, // Responsive description size
            textAlign: "center",
          }}
        >
          {description}
        </Typography>

        <Button
          variant="text"
          sx={{ color: "whitesmoke" }}
          fullWidth
          onClick={() => redirect("/services/" + id)}
        >
          Learn More
        </Button>
      </CardContent>
    </Card>
  );
};

export default ServiceRow;
