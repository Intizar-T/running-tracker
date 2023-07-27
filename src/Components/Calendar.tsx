import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import { useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";

export default function Calendar() {
  const [completedDay, setCompletedDay] = useState<number[]>([]);
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();
  const totalDays = new Date(currentYear, currentMonth, 0).getDate();
  const weeks = Math.floor(totalDays / 7) + 1;
  const rows = [];
  for (let i = 0; i < weeks; i++) {
    const columns = [];
    let columnNumbers = 7;
    if (7 * (i + 1) > totalDays) columnNumbers = totalDays - 7 * i;
    for (let j = 0; j < columnNumbers; j++) {
      const today = i * 7 + j + 1;
      columns.push(
        <TableCell
          key={today}
          align="center"
          sx={{
            borderRight: 1,
            borderColor: "rgba(224, 224, 224, 1)",
            height: "100px",
            minWidth: "100px",
          }}
          onDoubleClick={() => {
            if (completedDay.includes(today))
              setCompletedDay(completedDay.filter((date) => date !== today));
            else setCompletedDay([...completedDay, today]);
          }}
        >
          {completedDay.includes(today) ? (
            <ClearIcon fontSize="large" color="error" />
          ) : (
            <div>
              <Typography>{today}</Typography>
              <Typography>Event</Typography>
            </div>
          )}
        </TableCell>
      );
    }
    rows.push(columns);
  }
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index}>{row.map((column) => column)}</TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
