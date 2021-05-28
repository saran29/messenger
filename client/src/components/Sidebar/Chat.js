import React, { useEffect, useState } from "react";
import { Box, Avatar } from "@material-ui/core";
import { BadgeAvatar, ChatContent } from "../Sidebar";
import { withStyles } from "@material-ui/core/styles";
import { setActiveChat } from "../../store/activeConversation";
import { connect } from "react-redux";

const styles = {
  root: {
    borderRadius: 8,
    height: 80,
    boxShadow: "0 2px 10px 0 rgba(88,133,196,0.05)",
    marginBottom: 10,
    display: "flex",
    alignItems: "center",
    "&:hover": {
      cursor: "grab",
    },
  },
};

const SmallAvatar = withStyles((theme) => ({
  square: {
    background: theme.palette.primary.main,
    width: 'auto',
    height: theme.spacing(3),
    borderRadius: "3vh",
    fontSize: theme.spacing(1.5),
    fontWeight: "bold",
    textAlign: "center",
    padding: "1vh"
  }
}))(Avatar);

function Chat(props) {
  const { user, conversation, classes } = props;
  const otherUser = props.conversation.otherUser;
  const [count, setCount] = useState(0);  
  const handleClick = async (conversation) => {
    await props.setActiveChat(conversation.otherUser.username);
  };
  useEffect(() => {
    const count = conversation.messages.reduce((unread, message) => {
      if (message.senderId !== user.id && !message.read)
        unread++;
      return unread;
    }, 0);
    setCount(count);
  },[conversation, user]);

    return (
      <Box
        onClick={() => handleClick(props.conversation)}
        className={classes.root}
      >
        <BadgeAvatar
          photoUrl={otherUser.photoUrl}
          username={otherUser.username}
          online={otherUser.online}
          sidebar={true}
        />
        <ChatContent conversation={props.conversation} />
        {count > 0 ? <SmallAvatar variant="square">{count}</SmallAvatar> : <Box></Box>}
      </Box>
    );
  }

const mapDispatchToProps = (dispatch) => {
  return {
    setActiveChat: (id) => {
      dispatch(setActiveChat(id));
    },
  };
};

export default connect(null, mapDispatchToProps)(withStyles(styles)(Chat));
