const User = require("../../model/user.model");

module.exports = (req, res) => {
  const userIdA = res.locals.user.id;

  _io.once("connection", (socket) => {

    // CLIENT_ADD_FRIEND: Khi A gửi yêu cầu cho B
    socket.on("CLIENT_ADD_FRIEND", async (userIdB) => {
        // Thêm id của A vào acceptFriend của B
        const existUserAInB = await User.findOne({
            _id: userIdB,
            acceptFriends: userIdA
        });

        if(!existUserAInB) {
            await User.updateOne({
                _id: userIdB
            }, {
                $push: {
                    acceptFriends: userIdA
                }
            });
        }

        // Thêm id của B vào requestFriend của A
        const existUserBInA = await User.findOne({
            _id: userIdA,
            requestFriends: userIdB
        });

        if(!existUserBInA) {
            await User.updateOne({
                _id: userIdA
            }, {
                $push: {
                    requestFriends: userIdB
                }
            });
        }
    })
    // END CLIENT_ADD_FRIEND
  })
}