import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import FIO from "./DashBoardComp/FIO";
import AppBar1 from "./DashBoardComp/AppBar1";

function DashboardContent() {

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
        <Container maxWidth="lg" sx={{ mt: 8, mb: 4, ml: 24 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4} lg={8}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  height: 120,
                }}
              >
                <FIO />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
    // </ThemeProvider>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}
