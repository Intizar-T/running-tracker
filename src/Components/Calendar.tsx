import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";

export default function Calendar() {
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();
  const totalDays = new Date(currentYear, currentMonth, 0).getDate();
  const weeks = Math.floor(totalDays / 7) + 1;
  const rows = [];
  for (let i = 0; i < weeks; i++) {
    console.log(i);
    const columns = [];
    let columnNumbers = 7;
    if (7 * (i + 1) > totalDays) columnNumbers = totalDays - 7 * i;
    for (let j = 0; j < columnNumbers; j++) {
      columns.push(
        <TableCell
          align="center"
          sx={{
            borderRight: 1,
            borderColor: "rgba(224, 224, 224, 1)",
            height: "100px",
            minWidth: "100px",
          }}
        >
          <Typography>{i * 7 + j + 1}</Typography>
        </TableCell>
      );
    }
    rows.push(columns);
  }
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableBody>
          {rows.map((row) => (
            <TableRow>{row.map((column) => column)}</TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
