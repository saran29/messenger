const router = require("express").Router();
const { Conversation, Message } = require("../../db/models");
const { Op } = require("sequelize");

// expects {recipientId, text, conversationId } in body (conversationId will be null if no conversation exists yet)
router.put("/", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
      const { recipientId, senderId } = req.body;
      if(recipientId){
    // if we don't have conversation id, find a conversation to make sure it doesn't already exist
    let conversation = await Conversation.findConversation(
      senderId,
      recipientId
    );

    const messages = await Message.update({read : true},{
        where: {
            [Op.and]: [
              { conversationId: conversation.id },
              { read: false }
            ]
          },
    })
    res.sendStatus(200);
    }
    //const senderId = req.user.id;
    
  } catch (error) {
    next(error);
  }
});

module.exports = router;
