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
} from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { BoxNoMargin } from "@/app/_features/components/Styled";
import { useGet } from "@/app/hooks/useGet";
import { ServicesApi } from "@/app/_features/enums/ApiPaths";
import { ServiceTableDto } from "@/app/_features/utils/Interfaces";
import MyLoader from "@/app/components/MyLoader";

const AdminServicesPage = () => {
  const router = useRouter();
  const get = useGet<ServiceTableDto[]>(ServicesApi.ALL);
  const dummyServices = get.data ?? [];

  const handleAddService = () => {
    router.push("/admin/services/new");
  };

  const formatDuration = (secs: number) => {
    const mins = Math.floor(secs / 60);
    return `${mins} min${mins !== 1 ? "s" : ""}`;
  };

  if (get.loading) {
    return <MyLoader/>;
  }

  return (
    <BoxNoMargin>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h4">Manage Services</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddService}
        >
          New Service
        </Button>
      </Stack>

      <Paper elevation={2}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>Title</strong>
                </TableCell>
                <TableCell>
                  <strong>Description</strong>
                </TableCell>
                <TableCell>
                  <strong>Duration</strong>
                </TableCell>
                <TableCell>
                  <strong>Max Users</strong>
                </TableCell>
                <TableCell align="right">
                  <strong>Actions</strong>
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {(dummyServices ?? []).map((svc) => (
                <TableRow key={svc.id} hover>
                  <TableCell>{svc.title}</TableCell>
                  <TableCell
                    sx={{
                      maxWidth: 240,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {svc.description ?? "-"}
                  </TableCell>
                  <TableCell>{formatDuration(svc.duration)}</TableCell>
                  <TableCell>
                    {svc.maxUsersPerGroupSession > 0 ? (
                      <Chip label={svc.maxUsersPerGroupSession} size="small" />
                    ) : (
                      "No Limit"
                    )}
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() =>
                        router.push(`/admin/services/${svc.id}/edit`)
                      }
                    >
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}

              {dummyServices?.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    No services available.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </BoxNoMargin>
  );
};

export default AdminServicesPage;
