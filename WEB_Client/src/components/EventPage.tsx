import * as React from "react";
import Typography from "@mui/material/Typography";
import EventGetService from "../services/EventGetService";
import EventAddService from "../services/EventAddService";
import { Event } from "../models/Models";
import AppBar1 from "./DashBoardComp/AppBar1";
import { Box, CssBaseline, Toolbar, Grid, Paper, Container, Button } from "@mui/material";

export default function EventPage() {
  const [events, setevents] = React.useState<Event[]>();
  const [key, setkey] = React.useState<boolean>(false);
  React.useEffect(() => {
    if(key) return;
    EventGetService.getEvents().then((res) => {
      setevents(res);
      console.log(res);
    });
    setkey(true);
  }, [events]);

  

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
          <Grid container spacing={4}>
        {events?.map((event)=>(
          <Grid item xs={12} md={4} lg={12}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 240,
            }}
          >
            <React.Fragment>
              <Typography component="p" variant="h6">
                Соревнование: {event?.name}
              </Typography>
              <Typography color="text.secondary">
                Описание: {event?.description}
              </Typography>
              <Typography color="text.secondary">
                Начало соревнования: {event?.startDate}
              </Typography>
              <Typography color="text.secondary">
                Окончание соревнования: {event?.endDate}
              </Typography>
              <Typography color="text.secondary">
                Трасса: {event?.track}
              </Typography>
              
              <Button
              fullWidth
              variant="contained"
              sx={{ mt: 6, mb: 0 }}
              onClick={e => {
              EventAddService.eventAdd(event);

              }}
              >
                Записаться
              </Button>
            </React.Fragment>
          </Paper>
        </Grid>
        ))}
        
        </Grid>
        </Container>
      </Box>
    </Box>
  );
}