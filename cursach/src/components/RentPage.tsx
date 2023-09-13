import * as React from "react";
import { useState } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import AppBar1 from "./DashBoardComp/AppBar1";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import { TextField, Button, Typography } from "@mui/material";
import { Rent } from "../models/Models";
import RentService from "../services/RentService";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

interface State {
  startTime: string;
  duration: number;
  cartCount: number;
  clientID: number;
  status: string;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function RentPage() {
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
    setOpen1(false);
  };

  const user = useSelector((state: RootState) => state);
  const [dateTime, setDateTime] = React.useState<string>();
  const [values, setValues] = useState<State>({
    startTime: "",
    duration: 0,
    cartCount: 0,
    clientID: user.client.client!.id,
    status: "",
  });
  const handleChange =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value.trim() });
    };
  const onClick = (event: any) => {
    const data: Rent = {
      startTime: dateTime!,
      duration: +values.duration,
      cartCount: +values.cartCount,
      clientID: values.clientID,
      status: "Ожидает",
    };
    RentService.rentAdd(data)
      .then((res) => {
        if (res) setOpen(true);
        if (!res) setOpen1(true);
      })
      .catch((e) => {
        setOpen1(true);
      });
  };

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
              <Typography>Бронирование</Typography>
              <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                <Grid
                  item
                  direction="column"
                  xs={6}
                  justifyContent="space-between"
                >
                  <TextField
                    id="datetime-local"
                    label="Дата и время"
                    type="datetime-local"
                    helperText=" "
                    defaultValue={dateTime}
                    onChange={(e) => {
                      setDateTime(e.target.value);
                    }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  <TextField
                    fullWidth
                    name="durationField"
                    label="Продолжительность(в мин)"
                    value={values.duration}
                    onChange={handleChange("duration")}
                    helperText=" "
                  />
                  <TextField
                    fullWidth
                    name="cartCountField"
                    label="Количество человек"
                    value={values.cartCount}
                    onChange={handleChange("cartCount")}
                    helperText=" "
                  />
                  <Typography>
                    Сумма: {values.cartCount * values.duration * 6.5} липовых
                    листьев
                  </Typography>
                </Grid>
              </Paper>
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={onClick}
              >
                Забронировать
              </Button>
              <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
              >
                <Alert
                  onClose={handleClose}
                  severity="success"
                  sx={{ width: "100%" }}
                >
                  Бронирование успешно. Мы отправили Вам письмо на электронную
                  почту
                </Alert>
              </Snackbar>
              <Snackbar
                open={open1}
                autoHideDuration={6000}
                onClose={handleClose}
              >
                <Alert
                  onClose={handleClose}
                  severity="error"
                  sx={{ width: "100%" }}
                >
                  Бронирование не успешно
                </Alert>
              </Snackbar>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}
