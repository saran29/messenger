import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  Box,
  Typography,
  Button,
  FormControl,
  TextField,
  Paper,
  InputAdornment,
  Link,
  Hidden
} from "@material-ui/core";
import { login } from "./store/utils/thunkCreators";
import CustomButton from './components/CustomButton/CustomButton';
import { ReactComponent as Logo } from "./static/bubble.svg";
import { useStyles } from "./Styles.js"


const Login = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const { user, login } = props;

  const handleLogin = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    await login({ username, password });
  };

  const onRouteChange = () => {
    history.push("/register")
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
            <Typography color="textSecondary">Don't have an account?</Typography>
            <CustomButton onRouteChange={onRouteChange}>Register</CustomButton>
          </Grid>
          <Grid container item >
            <Box ml={15}><Typography variant="h4">Welcome Back!</Typography></Box>
            <Grid container item justify="center">
              <form onSubmit={handleLogin} className={classes.form}>
                <FormControl margin="normal" required>
                  <TextField
                    className={classes.input}
                    aria-label="username"
                    label="Username"
                    name="username"
                    type="text"
                  />
                </FormControl>
                <FormControl margin="normal" required>
                  <TextField
                    className={classes.input}
                    label="Password"
                    aria-label="password"
                    type="password"
                    name="password"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment component={Link} position="start">
                          <Link href="#" color="primary">
                            {"Forgot?"}
                          </Link>
                        </InputAdornment>
                      ),
                    }}
                  />
                </FormControl>
                <Button type="submit" variant="contained" size="large" color="primary" className={classes.submit}>
                  Login
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
    login: (credentials) => {
      dispatch(login(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
