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
import AuthService from "../services/AuthService";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../redux/store";
import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import sha256 from "sha256";
import {RegistrationModel} from '../models/Models'
import {clientActions} from '../redux/slices/clientSlice';

interface State {
	lastname: string,
	firstname: string,
	phone: string,
	email: string,
	mainpassword: string,
}

export default function SignUp() {
  
  const [values, setValues] = useState<State>({
		lastname: '',
		firstname: '',
		phone: '',
		email: '',
		mainpassword: ''
	})
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();

  const handleChange = (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
		setValues({...values, [prop]: event.target.value.trim()});
	};

  const onClick = (event: any) => {
		const data: RegistrationModel = {
			password: sha256(values.mainpassword),
			lastname: values.lastname,
			firstname: values.firstname,
			phone: values.phone,
			email: values.email,
      middlename:""
		};
		AuthService.register(data).then((res) => {
			dispatch(res)
			if (res.type === clientActions.registerSuccess.type) {
				navigate("/");
			}
		});
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
            Регистрация
          </Typography>
          <Box component={"div"} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  value={values.firstname} 
                  onChange={handleChange('firstname')}
                  name="firstName"
                  required
                  fullWidth
                  label="Имя"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  value={values.lastname} 
                  onChange={handleChange('lastname')}
                  label="Фамилия"
                  name="Фамилия"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  value={values.email} 
                  onChange={handleChange('email')}
                  label="Электронная почта"
                  name="Электронная почта"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  value={values.phone} 
                  onChange={handleChange('phone')}
                  label="Телефон"
                  name="Телефон"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  value={values.mainpassword} 
                  onChange={handleChange('mainpassword')}
                  name="password"
                  label="Пароль"
                  type="password"
                />
              </Grid>
            </Grid>
            <Button
              fullWidth
              onClick={onClick}
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Зарегестрироваться
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link1 href="#" variant="body2">
                  <Link to="/signin">
                    Уже есть аккаунт? 
                  </Link>
                </Link1>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
  );
}