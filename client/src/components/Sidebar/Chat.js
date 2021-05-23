import React, { Component } from "react";
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

class Chat extends Component {
  handleClick = async (conversation) => {
    await this.props.setActiveChat(conversation.otherUser.username);
  };

  unreadMessages = () => {
    const { user, conversation } = this.props;
    const count = conversation.messages.reduce((unread, message) => {
      if (message.senderId !== user.id && !message.read)
        unread++;
      return unread;
    }, 0)
    return count;
  }

  render() {
    const { classes } = this.props;
    const otherUser = this.props.conversation.otherUser;
    const unread = this.unreadMessages();
    return (
      <Box
        onClick={() => this.handleClick(this.props.conversation)}
        className={classes.root}
      >
        <BadgeAvatar
          photoUrl={otherUser.photoUrl}
          username={otherUser.username}
          online={otherUser.online}
          sidebar={true}
        />
        <ChatContent conversation={this.props.conversation} />
        {unread > 0 ? <SmallAvatar variant="square">{unread}</SmallAvatar> : <Box></Box>}
      </Box>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setActiveChat: (id) => {
      dispatch(setActiveChat(id));
    },
  };
};

export default connect(null, mapDispatchToProps)(withStyles(styles)(Chat));
