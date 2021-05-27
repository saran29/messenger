import React from "react";
import {
    Grid,
    Typography,
    Box
} from "@material-ui/core";
import CustomButton from "../CustomButton/CustomButton";
const Navigation = (props) => {
    const { onRouteChange, header, name } = props;
    return (
        <Grid container item justify="flex-end" alignItems="center">
            <Box m={1}><Typography color="textSecondary">{ header }</Typography></Box>
            <CustomButton onRouteChange={onRouteChange}>{ name }</CustomButton>
        </Grid>
    );
};

export default Navigation;