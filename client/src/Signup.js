import React from "react";
import { useHistory } from "react-router-dom";
import {
  Grid,
  Hidden
} from "@material-ui/core";
import { useStyles } from "./Styles.js"
import SideBanner from "./components/Welcome/SideBanner";
import Navigation from "./components/Welcome/Navigation";
import SignUpForm from "./components/Welcome/SignUpForm";


const Login = () => {
  const classes = useStyles();
  const history = useHistory();
  const header = "Already have an account?";
  const name = "Login"
  const onRouteChange = () => {
    history.push("/login")
  }

  return (
    <Grid container component="main" className={classes.root}>
      <Hidden xsDown>
        <SideBanner />
      </Hidden>
      <Grid item xs={12} sm={8} md={6} justify="center">
        <Navigation header={header} name={name} onRouteChange={onRouteChange} />
        <SignUpForm />
      </Grid>
    </Grid>
  );
};


export default Login;
