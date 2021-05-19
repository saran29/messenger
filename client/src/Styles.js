import { makeStyles } from "@material-ui/core";
import BackgroundImage from "./static/bg-img.png";

export const useStyles = makeStyles((theme) => ({
    text: {
        color: '#fff',
        padding: '10vh'
    },
    image: {
        backgroundImage: `url(${BackgroundImage})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
    },
    layer: {
        background: `linear-gradient(180deg,#3A8DFF, #86B9FF)`,
        opacity: 0.8,
        height: '100vh',
        display : 'flex',
        justifyContent : 'center',
        alignItems: 'center',
    },
    form: {
      width: '75%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
  },
  submit: {
      margin: theme.spacing(3, 0, 2),
      width: '20vh',
      height: '5vh',
      alignSelf: 'center'
  },
  input: {
      marginTop: '5vh'
  }
  }));