import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import TourIcon from '@mui/icons-material/Tour';
import {useNavigate} from "react-router-dom";


export default function ListItems(){
  const navigate = useNavigate();
  const onClick = (key:string) =>{
    switch (key){
      case "dashboard":
        navigate('/');
        break;
      case "rent":
        navigate('/rent');
        break;
      case "history":
        navigate('/history');
        break;
      case "achiev":
        navigate('/achiev');
        break;
      case "event":
        navigate('/event');
        break;
    }
  }

  return(
    <React.Fragment>
    <ListItemButton onClick={()=> onClick("dashboard")}>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Мой профиль" />
    </ListItemButton>
    <ListItemButton onClick={()=> onClick("rent")}>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Бронирование" />
    </ListItemButton>
    <ListItemButton onClick={()=> onClick("history")}>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="История заездов" />
    </ListItemButton>
    <ListItemButton onClick={()=> onClick("achiev")}>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Достижения" />
    </ListItemButton>
    <ListItemButton onClick={()=> onClick("event")}>
      <ListItemIcon>
        <TourIcon />
      </ListItemIcon>
      <ListItemText primary="Соревнования" />
    </ListItemButton>
  </React.Fragment>
  );
}