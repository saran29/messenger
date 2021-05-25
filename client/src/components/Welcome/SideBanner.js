import React from 'react';
import {
    Grid,
    Typography,
  } from "@material-ui/core";
import { ReactComponent as Logo } from "../../static/bubble.svg";
import { useStyles } from "../../Styles";


const SideBanner = () => {
    const classes = useStyles();
    return (
        <Grid item xs={false} sm={4} md={5}>
        <Grid className={classes.image}>
          <Grid container direction="column" className={classes.layer}>
            <Logo />
            <Typography variant="h4" className={classes.text}>Converse with anyone with any language</Typography>
          </Grid>
        </Grid>
      </Grid>
    );
};

export default SideBanner;