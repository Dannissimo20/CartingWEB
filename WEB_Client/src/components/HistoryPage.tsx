import React from 'react';
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import AppBar1 from "./DashBoardComp/AppBar1";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import { Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import {Order} from "../models/Models";
import HistService from "../services/HistService";

export default function HistoryPage() {
    const [orders, setOrders] = React.useState<Order[]>([]);

  React.useEffect(() => {
    if (orders.length !== 0) return;
    HistService.getHist().then((response) => {
      setOrders(response);
    })
  }, [orders])
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar1 />
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Toolbar />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3}>
            {/* Recent Orders */}
            <Grid item xs={12}>
              <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
              <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Дата начала</TableCell>
            <TableCell>Время начала</TableCell>
            <TableCell>Продолжительность</TableCell>
            <TableCell>Трэк</TableCell>
            <TableCell align="center">Максимальная скорость</TableCell>
            <TableCell align="right">Лучший круг</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow>
              <TableCell>{order.date}</TableCell>
              <TableCell>{order.time}</TableCell>
              <TableCell>{order.duration} мин</TableCell>
              <TableCell>{order.trackID}</TableCell>
              <TableCell align="center">{order.maxSpeed} км/ч</TableCell>
              <TableCell align="right">{order.bestLap}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}