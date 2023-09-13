import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link1 from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link } from "react-router-dom";
import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import {LoginModel} from '../models/Models'
import sha256 from "sha256";
import AuthService from "../services/AuthService";
import {clientActions} from '../redux/slices/clientSlice';
import {useDispatch} from "react-redux";
import {AppDispatch} from "../redux/store";

interface State {
	phone: string,
	password: string
}

export default function SignIn() {
  const [values, setValues] = useState<State>({
		phone: '',
		password: ''
	});
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();

  const onClick = () => {
		const data: LoginModel = {
			phone: values.phone,
			password: sha256(values.password)
		};
		AuthService.login(data).then((res) => {
			dispatch(res)
			if (res.type === clientActions.loginSuccess.type) {
				navigate("/");
			}
		})
	};

  const handleChange = (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
		setValues({...values, [prop]: event.target.value.trim()});
	};

  return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Вход
          </Typography>
          <Box component={"div"} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              value={values.phone} 
              onChange={handleChange('phone')}
              required
              fullWidth
              label="Телефон"
              name="phone"
              autoFocus
            />
            <TextField
              margin="normal"
              value={values.password} 
              onChange={handleChange('password')}
              required
              fullWidth
              name="password"
              label="Пароль"
              type="password"
            />
            <Button
              fullWidth
              onClick={onClick}
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Вход
            </Button>
            <Grid container>
              <Grid item xs>
              </Grid>
              <Grid item>
                <Link1 href="#" variant="body2">
                  <Link to="/signup">
                    {"Регистрация"}
                  </Link>
                </Link1>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
  );
}