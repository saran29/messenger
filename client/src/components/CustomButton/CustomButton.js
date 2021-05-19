import React from 'react';
import {
    Button,
    withStyles
} from "@material-ui/core";

const ColorButton = withStyles((theme) => ({
    root: {
        color: '#3A8DFF',
        backgroundColor: '#ffffff',
        '&:hover': {
            backgroundColor: '#eeee',
        },
        boxShadow: `0px 2px 12px rgba(74,106,149,0.2)`,
        height: `5vh`,
        width: `20vh`,
        margin: `5vh`
    },
}))(Button);

const CustomButton = ({ onRouteChange, buttonCaption }) => {
    return (
        <ColorButton onClick={() => onRouteChange('login')}>{buttonCaption}</ColorButton>
    )
}

export default CustomButton;