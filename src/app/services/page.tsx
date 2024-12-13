"use client";
import React from "react";
import services from "@/app/_features/dummyData/services.json";
import ServiceRow from "./components/ServiceRow";
import { Background } from "../_features/enums/Colors";
import { BoxNoMargin } from "../_features/components/Styled";
import { Grid, Container, Typography } from "@mui/material";

export default function Page() {
  return (
    <BoxNoMargin sx={{ bgcolor: Background.DARK, pt: 10, pb: 10 }}>
      <Container maxWidth="xl">
        <Typography
          variant="h3"
          color="primary"
          textAlign="center"
          gutterBottom
          fontWeight={"bold"}
        >
          Naše usluge
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {services.map((service) => (
            <Grid item xs={12} sm={6} md={4} key={service.id}>
              <ServiceRow
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
