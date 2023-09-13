import * as React from "react";
import Typography from "@mui/material/Typography";
import AchievService from "../services/AchievService";
import { Achievement } from "../models/Models";
import AppBar1 from "./DashBoardComp/AppBar1";
import { Box, CssBaseline, Toolbar, Grid, Paper, Container } from "@mui/material";

export default function AchievementPage() {
  const [achievements, setachievements] = React.useState<Achievement[]>();
  const [key, setkey] = React.useState<boolean>(false);
  React.useEffect(() => {
    if(key) return;
    AchievService.getAchiev().then((res) => {
      setachievements(res);
      console.log(res);
    });
    setkey(true);
  }, [achievements]);

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
        {achievements?.map((achievement)=>(
          <Grid item xs={12} md={4} lg={6}>
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
                Трэк: {achievement?.track}
              </Typography>
              <Typography color="text.secondary">
                Макс. скорость - {achievement?.maxSpeed} км/ч
              </Typography>
              <Typography color="text.secondary">
                Дата получения максимальной скорости - {achievement?.dateMaxSpeed}
              </Typography>
              <Typography color="text.secondary">
                Лучший круг - {achievement?.bestLap}
              </Typography>
              <Typography color="text.secondary">
                Дата получения лучшего круга - {achievement?.dateBestLap}
              </Typography>
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
