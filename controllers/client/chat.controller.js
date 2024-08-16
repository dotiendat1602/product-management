// [GET] /chat/
module.exports.index = async (req, res) => {
  // Socket IO
  _io.on("connection", (socket) => {
    console.log("Có 1 người dùng kết nối", socket.id);
  });
  // End Socket IO

  res.render("client/pages/chat/index", {
    pageTitle: "Chat",
  });
};