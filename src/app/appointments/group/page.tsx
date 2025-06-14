"use client";

import {
  Box,
  Button,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Stack,
  Chip,
  TablePagination,
} from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { BoxNoMargin } from "@/app/_features/components/Styled";
import { useGet } from "@/app/hooks/useGet";
import { AppointmentApi } from "@/app/_features/enums/ApiPaths";
import { GroupAppointmentTableDto } from "@/app/_features/utils/Interfaces";
import MyLoader from "@/app/components/MyLoader";
import { useState } from "react";

const GroupAppointmentsPage = () => {
  const router = useRouter();
  const get = useGet<GroupAppointmentTableDto[]>(AppointmentApi.GROUP_ALL);
  const dummyAppointments = get.data ?? [];
  // Pagination state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);

  const handleAddAppointment = () => {
    router.push("/appointments/group/new");
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (get.loading) {
    return <MyLoader />;
  }

  // Calculate paginated data
  const paginatedAppointments = dummyAppointments.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <BoxNoMargin>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h4">Sessions</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddAppointment}
        >
          New Session
        </Button>
      </Stack>

      <Paper elevation={1}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>Service</strong>
                </TableCell>
                <TableCell>
                  <strong>Date&Time</strong>
                </TableCell>
                <TableCell>
                  <strong>Duration</strong>
                </TableCell>
                <TableCell>
                  <strong>Participants</strong>
                </TableCell>
                <TableCell align="right">
                  <strong>Actions</strong>
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {paginatedAppointments.map((appt) => (
                <TableRow key={appt?.id} hover>
                  <TableCell>{appt?.serviceTitle}</TableCell>
                  <TableCell>{appt?.date}</TableCell>
                  <TableCell>{`${Math.round(
                    appt?.duration / 60
                  )} min`}</TableCell>
                  <TableCell>
                    <Chip
                      label={`${appt.currentParticipants}/${appt.maxParticipants}`}
                      size="small"
                      color={
                        appt.currentParticipants >= appt.maxParticipants
                          ? "error"
                          : "default"
                      }
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() =>
                        router.push(`/appointments/group/${appt.id}`)
                      }
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}

              {dummyAppointments.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    No sessions available.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[10, 20, 50]}
          component="div"
          count={dummyAppointments.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </BoxNoMargin>
  );
};

export default GroupAppointmentsPage;
