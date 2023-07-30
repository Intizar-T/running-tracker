import {
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import RedXImage from "../assets/redX.jpeg";
import type { User } from "../Components/App";

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

interface CalendarProps {
  user: User | undefined;
  showLoginModal: (show: boolean) => void;
}

export default function Calendar({ showLoginModal, user }: CalendarProps) {
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();
  const currentMonthDays = new Date(currentYear, currentMonth, 0).getDate();
  let offsetDays = new Date(`${currentMonth}.01.${currentYear}`).getDay();
  if (offsetDays === 0) offsetDays = 7;
  offsetDays -= 1;
  const todaysDate = new Date().getDate();
  const totalDays = currentMonthDays + offsetDays;
  const weeks = Math.floor(totalDays / 7) + 1;
  const rows = [];
  const [events, setEvents] = useState<any>();
  useEffect(() => {
    const schedule = localStorage.getItem("schedule");
    if (schedule == null) return;
    setEvents(JSON.parse(schedule)[currentMonth]);
  }, []);

  if (events != null)
    for (let i = 0; i < weeks; i++) {
      const columns = [];
      let columnNumbers = 7;
      if (7 * (i + 1) > totalDays) columnNumbers = totalDays - 7 * i;
      for (let j = 0; j < columnNumbers; j++) {
        const today = i * 7 + j + 1 - offsetDays;
        columns.push(
          <TableCell
            key={today}
            align="center"
            sx={{
              borderRight: 1,
              borderColor: "rgba(224, 224, 224, 1)",
              backgroundImage:
                events[today] && events[today][1]
                  ? `url(${RedXImage})`
                  : undefined,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              height: "10vh",
              minWidth: "25vw",
            }}
            onDoubleClick={() => {
              if (user == null) {
                showLoginModal(true);
                return;
              }
              if (events[today]) {
                const schedule = JSON.parse(
                  localStorage.getItem("schedule") as string
                );
                const updatedEvent: any = {};
                const newCurrentMonth: any = {};
                updatedEvent[today] = [events[today][0], !events[today][1]];
                newCurrentMonth[currentMonth] = {
                  ...events,
                  ...updatedEvent,
                };
                setEvents({
                  ...events,
                  ...updatedEvent,
                });
                localStorage.setItem(
                  "schedule",
                  JSON.stringify({
                    ...schedule,
                    ...newCurrentMonth,
                  })
                );
              }
            }}
          >
            <Grid
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                p: 0,
                m: 0,
              }}
            >
              <Typography
                sx={{
                  width: "30px",
                  border: todaysDate === today ? 2 : undefined,
                  borderRadius: 50,
                  borderColor: "blue",
                }}
              >
                {today <= 0 ? "" : today}
              </Typography>
              <Typography
                sx={{
                  p: 0,
                  m: 0,
                }}
              >
                {events[today] && events[today][0]}
              </Typography>
            </Grid>
          </TableCell>
        );
      }
      rows.push(columns);
    }
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {weekDays.map((weekDay) => (
              <TableCell
                align="center"
                key={weekDay}
                sx={{
                  borderRight: 1,
                  borderColor: "rgba(224, 224, 224, 1)",
                  height: "1vh",
                  minWidth: "1vw",
                }}
              >
                <Typography>
                  <b>{weekDay}</b>
                </Typography>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {events != null &&
            rows.map((row, index) => (
              <TableRow key={index}>{row.map((column) => column)}</TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
