import { StatsApi } from "@/app/_features/enums/ApiPaths";
import { USER_ROUTES } from "@/app/_features/enums/Routes";
import { useGet } from "@/app/hooks/useGet";
import { History } from "@mui/icons-material";
import {
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Link,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
type AppointmentDTO = {
  id: number;
  status: string;
  duration: string;
  date: string;
  serviceTitle: string;
  trainerName: string;
};

export default function RecentSessions() {
  const getRecent = useGet<AppointmentDTO[]>(`${StatsApi.LAST_NUM}${3}`);
  const route = useRouter();
  function handleOnClick(id: number) {
    route.push(USER_ROUTES.APPOINTMENTS + id);
  }
  if (getRecent.loading) {
    return (
      <Wrapper>
        <CircularProgress />
      </Wrapper>
    );
  }

  if (getRecent?.data == null || getRecent?.data?.length == 0) {
    return (
      <Wrapper>
        <Typography>You currently have no previous sessions</Typography>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <Stack spacing={2}>
        {getRecent.data.map((session, index) => (
          <Paper key={index} sx={{ p: 2, borderRadius: 2 }}>
            <Stack direction="row" justifyContent="space-between">
              <Typography fontWeight="bold">{session.date}</Typography>
              <Chip
                label={Math.round(Number(session.duration) / 60)}
                size="small"
              />
            </Stack>
            <Stack direction="row" justifyContent="space-between">
              <Button onClick={() => handleOnClick(session.id)}>
                View Details
              </Button>
            </Stack>
          </Paper>
        ))}
      </Stack>
    </Wrapper>
  );
}
function Wrapper({ children }: { children: React.ReactNode }) {
  const route = useRouter();
  return (
    <Card sx={{ mb: 3, borderRadius: 3 }}>
      <CardContent>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent={"space-between"}
          sx={{ mb: 2 }}
        >
          <Stack direction="row" alignItems="center" spacing={1}>
            <History color="primary" />
            <Typography variant="h6" fontWeight="bold">
              Recent Sessions
            </Typography>
          </Stack>
          <Button
            sx={{ m: 2 }}
            onClick={() => route.push(USER_ROUTES.APPOINTMENTS)}
          >
            View All
          </Button>
        </Stack>
        {children}
      </CardContent>
    </Card>
  );
}
