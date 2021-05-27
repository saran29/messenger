import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  Box,
  Typography,
  Button,
  FormControl,
  TextField,
  FormHelperText,
} from "@material-ui/core";
import { register } from "../../store/utils/thunkCreators";
import { useStyles } from "../../Styles";

const SignUpForm = (props) => {
  const classes = useStyles();
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
  }
  if (user.id) {
    return <Redirect to="/home" />;
  }
  return (
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

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);