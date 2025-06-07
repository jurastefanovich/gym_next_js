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
import { useRouter } from "next/navigation";

interface TrainerContainerProps {
  id: number;
  firstName: string;
  lastName: string;
}

const TrainerContainer: React.FC<TrainerContainerProps> = ({
  id,
  firstName,
  lastName,
}) => {
  const router = useRouter();

  function redirect(path: string) {
    router.push(path);
  }

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt={`${firstName} ${lastName}`}
        height="200"
        image="/trainer.jpg"
        sx={{
          objectFit: "cover",
          objectPosition: "center 30%",
        }}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {firstName} {lastName}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="text"
          size="small"
          onClick={() => redirect(`/trainers/${id}`)}
        >
          View More
        </Button>
      </CardActions>
    </Card>
  );
};

export default TrainerContainer;
