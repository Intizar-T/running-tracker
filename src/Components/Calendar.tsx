import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
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

type CalculatedDataType = {
  currentMonth: number;
  currentYear: number;
  currentMonthDays: number;
  offsetDays: number;
  todaysDate: number;
  totalDays: number;
  weeks: number;
};

const monthConversion: { [key: number]: string } = {
  7: "July",
  8: "August",
  9: "September",
  10: "October",
};

export default function Calendar({ showLoginModal, user }: CalendarProps) {
  const [calculatedData, setCalculatedData] = useState<CalculatedDataType>();
  const [events, setEvents] = useState<any>();
  const [selectedMonth, setSelectedMonth] = useState("");
  useEffect(() => {
    if (calculatedData != null) return;
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();
    const currentMonthDays = new Date(currentYear, currentMonth, 0).getDate();
    let offsetDays = new Date(`${currentMonth}.01.${currentYear}`).getDay();
    if (offsetDays === 0) offsetDays = 7;
    offsetDays -= 1;
    const totalDays = currentMonthDays + offsetDays;
    setCalculatedData({
      currentMonth,
      currentYear,
      currentMonthDays,
      offsetDays: offsetDays,
      todaysDate: new Date().getDate(),
      totalDays,
      weeks: Math.floor(totalDays / 7) + 1,
    });
    setSelectedMonth(monthConversion[currentMonth]);
  }, []);

  useEffect(() => {
    if (calculatedData == null) return;
    const schedule = localStorage.getItem("schedule");
    if (schedule == null) return;
    setEvents(JSON.parse(schedule)[calculatedData.currentMonth]);
  }, [calculatedData]);

  const rows = [];
  if (events != null && calculatedData != null) {
    for (let i = 0; i < calculatedData.weeks; i++) {
      const columns = [];
      let columnNumbers = 7;
      if (7 * (i + 1) > calculatedData.totalDays)
        columnNumbers = calculatedData.totalDays - 7 * i;
      for (let j = 0; j < columnNumbers; j++) {
        const today = i * 7 + j + 1 - calculatedData.offsetDays;
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
              // height: "1vh",
              // minWidth: "1vw",
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
                newCurrentMonth[calculatedData.currentMonth] = {
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
                  border: calculatedData.todaysDate === today ? 2 : undefined,
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
  }
  return (
    <Grid>
      <Grid
        sx={{ width: "100", p: 1, display: "flex", justifyContent: "center" }}
      >
        <FormControl
          sx={{
            width: "250px",
          }}
        >
          <InputLabel>Month</InputLabel>
          <Select
            label="Month"
            value={selectedMonth}
            onChange={(event: SelectChangeEvent) => {
              setSelectedMonth(event.target.value);
              const selectedMonthNumber = parseInt(
                Object.keys(monthConversion).filter(
                  (key) => monthConversion[parseInt(key)] === event.target.value
                )[0]
              );
              setCalculatedData({
                ...calculatedData,
                currentMonth: selectedMonthNumber,
              } as CalculatedDataType);
            }}
          >
            <MenuItem value="July">July</MenuItem>
            <MenuItem value="August">August</MenuItem>
            <MenuItem value="September">September</MenuItem>
            <MenuItem value="October">October</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <TableContainer
        component={Paper}
        sx={{
          marginTop: 1,
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              {weekDays.map((weekDay) => (
                <TableCell
                  align="center"
                  key={weekDay}
                  sx={{
                    border: 1,
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
              calculatedData != null &&
              rows.map((row, index) => (
                <TableRow key={index}>{row.map((column) => column)}</TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
}
