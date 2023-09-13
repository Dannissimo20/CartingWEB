import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import DashBoard from "./components/DashBoard";
import RentPage from "./components/RentPage";
import HistoryPage from "./components/HistoryPage";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { createTheme, ThemeProvider } from "@mui/material";
import { blueGrey, green } from "@mui/material/colors";
import ruLocale from 'date-fns/locale/ru';
import AchievementPage from "./components/AchievementPage";
import EventPage from "./components/EventPage";

const dark = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: green["500"],
      contrastText: "#ffffff",
    },
    secondary: {
      main: blueGrey["700"],
      contrastText: "#ffffff",
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={dark}>
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ruLocale}>
          <BrowserRouter>
            <Routes>
              <Route path={"signin"} element={<SignIn />} />
              <Route path={"signup"} element={<SignUp />} />
              <Route path={"rent"} element={<RentPage />} />
              <Route path={"history"} element={<HistoryPage />} />
              <Route path={"/"} element={<DashBoard />} />
              <Route path={"achiev"} element={<AchievementPage />} />
              <Route path={"event"} element={<EventPage />} />
            </Routes>
          </BrowserRouter>
        </LocalizationProvider>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
