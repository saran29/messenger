import React from "react";
import { useHistory } from "react-router-dom";
import {
  Grid,
  Hidden
} from "@material-ui/core";
import Navigation from './components/Welcome/Navigation';
import { useStyles } from "./Styles.js"
import SideBanner from "./components/Welcome/SideBanner";
import SignInForm from "./components/Welcome/SignInForm";

const Login = () => {
  const classes = useStyles();
  const history = useHistory();
  const header = "Don't have an account?";
  const name = "Register";
  const onRouteChange = () => {
    history.push("/register")
  }
  return (
    <Grid container component="main" className={classes.root}>
      <Hidden xsDown>
        <SideBanner />
      </Hidden>
      <Grid item sm={8} md={6} justify="center">
        <Navigation onRouteChange={onRouteChange} header={header} name={name} />
        <SignInForm />
      </Grid>
    </Grid>
  );
};


export default Login;
