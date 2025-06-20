"use client";

import { Calendar, Event as CalendarEvent, Views } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Box, Typography, LinearProgress } from "@mui/material";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import dayjsLocalizer from "../lib/dayjsLocalizer";
import { useGet } from "../hooks/useGet";
import { AppointmentApi } from "../_features/enums/ApiPaths";
import { BoxNoMargin } from "../_features/components/Styled";
import customParseFormat from "dayjs/plugin/customParseFormat"; // 👈 add this
import { useAuth } from "../context/AuthContext";
import { ADMIN_ROUTES, USER_ROUTES } from "../_features/enums/Routes";
dayjs.extend(customParseFormat);
// Extend dayjs with duration plugin
dayjs.extend(duration);

// Type definitions
interface Appointment {
  id: number;
  serviceTitle: string;
  date: string; // ISO string
  duration: number; // duration in minutes
}

interface Event extends CalendarEvent {
  id: number;
  title: string;
  start: Date;
  end: Date;
}

const calendarStyles = {
  height: "calc(100vh - 64px)",
  minHeight: "600px",
  marginTop: "20px",
  "& .rbc-event": {
    backgroundColor: "#1976d2",
    borderRadius: "4px",
    padding: "2px 5px",
  },
  "& .rbc-today": {
    backgroundColor: "#f5f5f5",
  },
};

export default function CalendarPage() {
  const router = useRouter();
  const [events, setEvents] = useState<Event[]>([]);
  const [date, setDate] = useState(new Date()); // <-- Current view date
  const [view, setView] = useState(Views.WEEK); // <-- Current view
  const get = useGet<Appointment[]>(AppointmentApi.GET_FOR_CALENDAR);
  const auth = useAuth();
  const handleSelectEvent = (event: Event) => {
    if (auth.data?.role == "USER") {
      router.push(`${USER_ROUTES.APPOINTMENTS}${event.id}`);
    } else {
      router.push(`${ADMIN_ROUTES.SESSIONS}${event.id}`);
    }
  };

  useEffect(() => {
    if (get.data) {
      const mapped = get.data
        .map((appt) => {
          const start = dayjs(appt.date, "DD/MM/YYYY, HH:mm");

          if (!start.isValid()) {
            console.warn("Invalid date:", appt.date);
            return null;
          }

          const end = start.add(appt.duration / 60, "minute");

          return {
            id: appt.id,
            title: appt.serviceTitle,
            start: start.toDate(),
            end: end.toDate(),
          };
        })
        .filter((e): e is Event => e !== null);

      setEvents(mapped);
    }
  }, [get.data]);

  if (get.loading) {
    return (
      <BoxNoMargin>
        <LinearProgress />
      </BoxNoMargin>
    );
  }

  return (
    <BoxNoMargin sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 3 }}>
        Appointment Calendar
      </Typography>

      <Box sx={calendarStyles}>
        <Calendar
          localizer={dayjsLocalizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          views={[Views.MONTH, Views.WEEK, Views.DAY]}
          view={view} // <-- controlled view
          date={date} // <-- controlled date
          onView={setView} // <-- update view on user action
          onNavigate={setDate} // <-- update date on user action
          defaultView={Views.WEEK} // can keep or remove, as view is controlled
          onSelectEvent={handleSelectEvent}
          popup
          selectable
          eventPropGetter={(event) => ({
            style: {
              backgroundColor: event.id % 2 === 0 ? "#1976d2" : "#4caf50",
            },
          })}
        />
      </Box>
    </BoxNoMargin>
  );
}
