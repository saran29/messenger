import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  Box,
  Typography,
  Button,
  FormControl,
  TextField,
  FormHelperText,
  Paper,
  Hidden
} from "@material-ui/core";
import CustomButton from './components/CustomButton/CustomButton';
import { ReactComponent as Logo } from "./static/bubble.svg";
import { register } from "./store/utils/thunkCreators";
import { useStyles } from "./Styles.js"



const Login = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const { user, register } = props;
  const [formErrorMessage, setFormErrorMessage] = useState({});

  const handleRegister = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;

    if (password !== confirmPassword) {
      setFormErrorMessage({ confirmPassword: "Passwords must match" });
      return;
    }

    await register({ username, email, password });
  };
  const onRouteChange = (route) => {
    history.push("/login")
  }
  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <Grid container component="main" className={classes.root}>
      <Hidden xsDown>
        <Grid item xs={false} sm={4} md={5}>
          <Grid className={classes.image}>
            <Grid container direction="column" className={classes.layer}>
              <Logo />
              <Typography variant="h4" className={classes.text}>Converse with anyone with any language</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Hidden>
      <Grid item xs={12} sm={8} md={7} justify="center" component={Paper} elevation={6}>
        <div className={classes.paper}>
          <Grid container item justify="flex-end" alignItems="center">
            <Typography color="textSecondary">Already have an account?</Typography>
            <CustomButton buttonCaption={'Login'} onRouteChange={onRouteChange}>Login</CustomButton>
          </Grid>
          <Grid container item >
            <Box ml={15}><Typography variant="h4">Create an account.</Typography></Box>
            <Grid container item justify="center">
              <form onSubmit={handleRegister} className={classes.form}>
                <FormControl>
                  <TextField
                    className={classes.input}
                    aria-label="username"
                    label="Username"
                    name="username"
                    type="text"
                    required
                  />
                </FormControl>

                <FormControl>
                  <TextField
                    className={classes.input}
                    label="E-mail address"
                    aria-label="e-mail address"
                    type="email"
                    name="email"
                    required
                  />
                </FormControl>
                <FormControl error={!!formErrorMessage.confirmPassword}>
                  <TextField
                    className={classes.input}
                    aria-label="password"
                    label="Password"
                    type="password"
                    inputProps={{ minLength: 6 }}
                    name="password"
                    required
                  />
                  <FormHelperText>
                    {formErrorMessage.confirmPassword}
                  </FormHelperText>
                </FormControl>
                <FormControl error={!!formErrorMessage.confirmPassword}>
                  <TextField
                    className={classes.input}
                    label="Confirm Password"
                    aria-label="confirm password"
                    type="password"
                    inputProps={{ minLength: 6 }}
                    name="confirmPassword"
                    required
                  />
                  <FormHelperText>
                    {formErrorMessage.confirmPassword}
                  </FormHelperText>
                </FormControl>
                <Button type="submit" variant="contained" size="large" color="primary" className={classes.submit}>
                  Create
                </Button>
              </form>
            </Grid>
          </Grid>
        </div>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    register: (credentials) => {
      dispatch(register(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
