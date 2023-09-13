import * as React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Typography, Grid, Paper, Button, TextField } from "@mui/material";
import { Email } from "../../models/Models";
import EmailService from "../../services/EmailService";
import { useState } from "react";

interface State {
  Email: string;
  clientID: number;
}

export default function Deposits() {
  const user = useSelector((state: RootState) => state);
  const [values, setValues] = useState<State>({
    Email: "",
    clientID: user.client.client!.id,
  });
  const handleChange =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value.trim() });
    };

  const [email, setemail] = React.useState<string>(user.client.client!.email);
  const onClick = (event: any) => {
    setemail(values.Email);
    const data: Email = {
      Email: values.Email,
      clientID: values.clientID,
    };
    EmailService.emailChange(data);

    values.Email = " ";
  };
  return (
    <React.Fragment>
      <Typography component="p" variant="h6">
        {user.client.client?.lastName} {user.client.client?.firstName}
      </Typography>
      <Typography color="text.secondary">
        {user.client.client?.phone}
      </Typography>
      <Typography color="text.secondary">{email}</Typography>
      <Grid item xs={12} md={4} lg={12}>
        <Paper
          sx={{
            p: 2,
            mt: 5,
            display: "flex",
            flexDirection: "column",
            height: 180,
          }}
        >
          <Typography>Изменение почты</Typography>
          <TextField
            sx={{ mt: 2 }}
            value={values.Email}
            onChange={handleChange("Email")}
          ></TextField>
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 2, mb: 2 }}
            onClick={onClick}
          >
            Изменить
          </Button>
        </Paper>
      </Grid>
    </React.Fragment>
  );
}
