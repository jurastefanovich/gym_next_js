"use client";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";
interface TrainerProp {
  name: string;
  lastName: string;
}
import { useRouter } from "next/navigation";
const TrainerContainer: React.FC<TrainerProp> = ({ name, lastName }) => {
  const route = useRouter();
  function redirect(path: string) {
    route.push(path);
  }
  return (
    <Card>
      <CardMedia
        component="img"
        alt="trainer image"
        height="200"
        image="/trainer.jpg"
        sx={{
          objectFit: "cover",
          objectPosition: "center 30%",
        }}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name} {lastName}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="text"
          size="small"
          onClick={() => redirect("/trainers/trainer_1")}
        >
          View More
        </Button>
      </CardActions>
    </Card>
  );
};
export default TrainerContainer;
