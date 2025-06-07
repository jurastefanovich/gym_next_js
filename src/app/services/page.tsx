"use client";
import React from "react";
import services from "@/app/_features/dummyData/services.json";
import ServiceRow from "./components/ServiceRow";
import { Background } from "../_features/enums/Colors";
import { BoxNoMargin } from "../_features/components/Styled";
import { Grid, Container, Typography } from "@mui/material";
import { useGet } from "../hooks/useGet";
import { ServiceDto } from "../_features/utils/Interfaces";
import { ServicesApi } from "../_features/enums/ApiPaths";

export default function Page() {
  const get = useGet<ServiceDto[]>(ServicesApi.ALL);

  return (
    <BoxNoMargin sx={{ bgcolor: Background.DARK }}>
      <Container maxWidth="xl">
        <Typography
          variant="h3"
          color="primary"
          textAlign="left"
          gutterBottom
          fontWeight={"bold"}
        >
          Naše usluge
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {get?.data?.map((service) => (
            <Grid item xs={12} sm={6} md={4} key={service.id}>
              <ServiceRow
                duration={service.duration}
                id={service.id}
                description={service.description}
                title={service.title}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </BoxNoMargin>
  );
}
