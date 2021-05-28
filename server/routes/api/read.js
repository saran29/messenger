const router = require("express").Router();
const { Conversation, Message } = require("../../db/models");
const { Op } = require("sequelize");


router.put("/", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const { recipientId, senderId } = req.body;
    if (recipientId) {
      let conversation = await Conversation.findConversation(
        senderId,
        recipientId
      );

      const messages = await Message.update({ read: true }, {
        where: {
          [Op.and]: [
            { conversationId: conversation.id },
            { read: false }
          ]
        },
      })
      res.sendStatus(200);
    }

  } catch (error) {
    next(error);
  }
});

module.exports = router;
