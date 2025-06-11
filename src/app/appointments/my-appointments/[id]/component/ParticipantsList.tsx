"use client";

import { AppointmentApi } from "@/app/_features/enums/ApiPaths";
import { useGet } from "@/app/hooks/useGet";
import { Person } from "@mui/icons-material";
import {
  Avatar,
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useParams, useRouter } from "next/navigation";
import React from "react";

interface Participant {
  id: string;
  fullName: string;
  email: string;
}

interface ParticipantsListProps {
  maxParticipants?: number;
}

export const ParticipantsList = ({
  maxParticipants,
}: ParticipantsListProps) => {
  const theme = useTheme();
  const { id } = useParams();
  const get = useGet<Participant[]>(AppointmentApi.GET_ALL_PARTICIPANTS + id);
  const participants = get.data || [];
  const router = useRouter();

  function navigateToUser(id: number) {
    router.push("/users/user/" + id);
  }
  
  return (
    <Card
      variant="outlined"
      sx={{
        borderRadius: 3,
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.05)",
        height: "100%",
      }}
    >
      <CardContent sx={{ p: 4 }}>
        <Typography variant="h5" fontWeight={700} gutterBottom>
          Participants
        </Typography>

        {maxParticipants && (
          <Typography variant="subtitle2" color="text.secondary" mb={2}>
            {participants.length} of {maxParticipants} spots filled
          </Typography>
        )}

        <Paper variant="outlined" sx={{ borderRadius: 2, overflow: "hidden" }}>
          <List disablePadding>
            {participants.length > 0 ? (
              participants.map((participant) => (
                <React.Fragment key={participant?.id}>
                  <ListItem
                    sx={{
                      py: 2,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        backgroundColor: theme.palette.action.hover,
                        transform: "translateX(4px)",
                        boxShadow: theme.shadows[1],
                      },
                      cursor: "pointer",
                      borderRadius: 1,
                      position: "relative",
                      "&:before": {
                        content: '""',
                        position: "absolute",
                        left: 0,
                        top: 0,
                        bottom: 0,
                        width: 3,
                        backgroundColor: "transparent",
                        transition: "background-color 0.3s ease",
                      },
                      "&:hover:before": {
                        backgroundColor: theme.palette.primary.main,
                      },
                    }}
                    onClick={() => navigateToUser(Number(participant?.id))}
                  >
                    <ListItemAvatar>
                      <Avatar
                        sx={{
                          bgcolor: theme.palette.primary.light,
                          transition: "transform 0.3s ease",
                          "&:hover": {
                            transform: "scale(1.1)",
                          },
                        }}
                      >
                        <Person />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography
                          fontWeight={600}
                          sx={{
                            transition: "color 0.3s ease",
                            "&:hover": {
                              color: theme.palette.primary.main,
                            },
                          }}
                        >
                          {participant.fullName}
                        </Typography>
                      }
                      secondary={participant.email}
                      secondaryTypographyProps={{
                        variant: "body2",
                        sx: {
                          transition: "color 0.3s ease",
                          "&:hover": {
                            color: theme.palette.text.primary,
                          },
                        },
                      }}
                    />
                  </ListItem>
                  <Divider
                    component="li"
                    sx={{
                      transition: "opacity 0.3s ease",
                      "&:hover": {
                        opacity: 0.5,
                      },
                    }}
                  />
                </React.Fragment>
              ))
            ) : (
              <ListItem sx={{ py: 3 }}>
                <ListItemText
                  primary="No participants yet"
                  primaryTypographyProps={{
                    textAlign: "center",
                    color: "text.secondary",
                  }}
                />
              </ListItem>
            )}
          </List>
        </Paper>
      </CardContent>
    </Card>
  );
};
