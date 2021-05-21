import React from "react";
import { Avatar, Box, makeStyles } from "@material-ui/core";
import { SenderBubble, OtherUserBubble } from "../ActiveChat";
import moment from "moment";

const styles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    margin: theme.spacing(1),
  }
}))
const Messages = (props) => {
  const { messages, otherUser, userId } = props;
  const classes = styles();
  const size = messages.length;
  return (
    <Box>
      {
        messages.map((message, index) => {
        const time = moment(message.createdAt).format("h:mm");
        return message.senderId === userId ? (
          <Box key={message.id}>
            <SenderBubble text={message.text} time={time} />
            { index === size -1 ? (
              <Box className={classes.root}>
              <Avatar
                alt={otherUser.username}
                src={otherUser.photoUrl}
                className={classes.small} />
            </Box>
            ) : <Box></Box>}
          </Box>
        ) : (
          <OtherUserBubble key={message.id} text={message.text} time={time} otherUser={otherUser} />
        );
      })}
    </Box>
  );
};

export default Messages;
