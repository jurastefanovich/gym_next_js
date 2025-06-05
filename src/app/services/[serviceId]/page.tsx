"use client";
import { notFound, useParams } from "next/navigation";
import services from "@/app/_features/dummyData/services.json";
import { Grid, Stack, Typography, Container, Button } from "@mui/material";
import TrainerContainer from "./components/TrainerContainer";
import { BoxNoMargin } from "@/app/_features/components/Styled";
import { Background } from "@/app/_features/enums/Colors";

export default const ServicePage({
  params,
}: {
  params: { serviceId: string };
}) {
  const { serviceId } = useParams();

  return (
    <BoxNoMargin sx={{ bgcolor: Background.LIGHT, pt: 10, pb: 10 }}>
      <Container maxWidth="lg">
        <Grid container>
          <Grid item xs={12} md={12 / 2}>
            <Typography variant="h3" sx={{ fontWeight: "bold", mb: 2 }}>
              {service.title}
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            display={"flex"}
            justifyContent={{ xs: "flex-start", md: "flex-end" }}
            alignItems={"center"}
          >
            <Button
              variant="contained"
              sx={{ mb: 4 }}
              href={`/services/${serviceId}/book`}
            >
              Make appointment
            </Button>
          </Grid>
        </Grid>
        <Typography variant="h5" color="text.secondary" mb={4}>
          {service.description}
        </Typography>
        <Typography variant="body1" color="text.primary" mb={6}>
          {service.details}
        </Typography>

        <Button variant="outlined" sx={{ mb: 4 }} href="/services">
          Back to Services
        </Button>

        <Stack spacing={3}>
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            Upoznajte vašeg trenera
          </Typography>

          <Grid container>
            {service.trainers.map((trainer) => (
              <Grid
                item
                sx={{ m: 1 }}
                xs={12}
                sm={6}
                md={4}
                lg={3}
                key={trainer.id}
              >
                <TrainerContainer
                  lastName={trainer.last_name}
                  name={trainer.first_name}
                />
              </Grid>
            ))}
          </Grid>
        </Stack>
      </Container>
    </BoxNoMargin>
  );
}
