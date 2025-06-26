"use client";
import {
  Box,
  Button,
  Checkbox,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { StyledPaper } from "./Dashboard";
import { Email, Phone } from "@mui/icons-material";
import { useGet } from "@/app/hooks/useGet";
import { GymApi } from "@/app/_features/enums/ApiPaths";
import dayjs from "dayjs";
import { usePostAuth } from "@/app/hooks/usePost";

type GymInfo = {
  name: string;
  location: string;
  email: string;
  phone: string;
  workingHours: {
    day: string;
    startTime: string;
    endTime: string;
    working: boolean;
  }[];
};
export default function GymInfo() {
  const get = useGet<GymInfo>(GymApi.GYM);
  const [gymInfo, setGymInfo] = useState<GymInfo | null>(null);
  const post = usePostAuth();
  // Handlers
  const handleGymInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setGymInfo((prev) => (prev ? { ...prev, [name]: value } : prev));
  };

  React.useEffect(() => {
    if (get.data) {
      setGymInfo(get.data);
    }
  }, [get.data]);

  const handleWorkingHoursChange = (
    day: string,
    field: string,
    value: string | boolean
  ) => {
    setGymInfo((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        workingHours: prev.workingHours.map((wh) =>
          wh.day === day
            ? {
                ...wh,
                // Map your field keys properly here:
                ...(field === "openingTime"
                  ? { startTime: value }
                  : field === "closingTime"
                  ? { endTime: value }
                  : field === "isClosed"
                  ? { working: value }
                  : {}),
              }
            : wh
        ),
      };
    });
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const res = await post.post(GymApi.SAVE, gymInfo);

    if (res) {
      get.refetch();
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h4" gutterBottom>
        Gym Information
      </Typography>

      <StyledPaper>
        <Typography variant="h6" gutterBottom>
          General Information
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Gym Name"
              name="name"
              value={gymInfo?.name ?? ""}
              onChange={handleGymInfoChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Location"
              name="location"
              value={gymInfo?.location ?? ""}
              onChange={handleGymInfoChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Contact Email"
              name="contactEmail"
              value={gymInfo?.email ?? ""}
              onChange={handleGymInfoChange}
              InputProps={{
                startAdornment: (
                  <Email sx={{ mr: 1, color: "action.active" }} />
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Contact Phone"
              name="contactPhone"
              value={gymInfo?.phone ?? ""}
              onChange={handleGymInfoChange}
              InputProps={{
                startAdornment: (
                  <Phone sx={{ mr: 1, color: "action.active" }} />
                ),
              }}
            />
          </Grid>
        </Grid>
      </StyledPaper>

      <StyledPaper>
        <Typography variant="h6" gutterBottom>
          Working Hours
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Day</TableCell>
                <TableCell>Opening Time</TableCell>
                <TableCell>Closing Time</TableCell>
                <TableCell>Closed</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {gymInfo?.workingHours.map((day) => (
                <TableRow key={day.day}>
                  <TableCell>{day.day}</TableCell>
                  <TableCell>
                    <TextField
                      type="time"
                      value={
                        day.startTime
                          ? dayjs(day.startTime).format("HH:mm")
                          : ""
                      }
                      onChange={(e) =>
                        handleWorkingHoursChange(
                          day.day,
                          "openingTime",
                          e.target.value
                        )
                      }
                      disabled={day.working}
                      sx={{ width: 120 }}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      type="time"
                      value={
                        day.endTime ? dayjs(day.endTime).format("HH:mm") : ""
                      }
                      onChange={(e) =>
                        handleWorkingHoursChange(
                          day.day,
                          "closingTime",
                          e.target.value
                        )
                      }
                      disabled={day.working}
                      sx={{ width: 120 }}
                    />
                  </TableCell>
                  <TableCell>
                    <Checkbox
                      checked={day.working}
                      onChange={(e) =>
                        handleWorkingHoursChange(
                          day.day,
                          "isClosed",
                          e.target.checked
                        )
                      }
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
          <Button variant="contained" type="submit">
            Save Changes
          </Button>
        </Box>
      </StyledPaper>
    </form>
  );
}
