const Chat = require("../../model/chat.model");
const User = require("../../model/user.model");

const chatSocket = require("../../sockets/client/chat.socket");

// [GET] /chat/
module.exports.index = async (req, res) => {
  // Socket IO
  chatSocket(req, res);
  // End Socket IO

  const chats = await Chat.find({});

  for (const chat of chats) {
    const infoUser = await User.findOne({
      _id: chat.userId
    });

    chat.fullName = infoUser.fullName;
  }

  res.render("client/pages/chat/index", {
    pageTitle: "Chat",
    chats: chats,
  });
};