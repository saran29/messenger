import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  Box,
  Typography,
  Button,
  FormControl,
  TextField,
  InputAdornment,
  Link,
} from "@material-ui/core";
import { login } from "../../store/utils/thunkCreators";
import { useStyles } from "../../Styles.js"


const SignInForm = (props) => {
    const classes = useStyles();
    const { user, login } = props;
    const handleLogin = async (event) => {
        event.preventDefault();
        const username = event.target.username.value;
        const password = event.target.password.value;
    
        await login({ username, password });
      };

      if (user.id) {
        return <Redirect to="/home" />;
      }

    return (
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
  
  export default connect(mapStateToProps, mapDispatchToProps)(SignInForm);