const RoomChat = require("../../model/rooms-chat.model");
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

        // Trả về cho B độ dài của acceptFriends
        const infoB = await User.findOne({
            _id: userIdB
        });

        socket.broadcast.emit("SERVER_RETURN_LENGTH_ACCEPT_FRIEND", {
            length: infoB.acceptFriends.length,
            userId: userIdB
        });

        // Lấy thông tin của A để trả về cho B
        const infoA = await User.findOne({
            _id: userIdA
        }).select("id fullName avatar");

        socket.broadcast.emit("SERVER_RETURN_INFO_ACCEPT_FRIEND", {
            userIdB: userIdB,
            infoA: infoA
        });

        // Lấy id của A để trả về cho B
        socket.broadcast.emit("SERVER_RETURN_ID_ACCEPT_FRIEND", {
            userIdA: userIdA,
            userIdB: userIdB
        });
    })
    // END CLIENT_ADD_FRIEND

    // CLIENT_CANCEL_FRIEND: Khi A hủy gửi yêu cầu cho B
    socket.on("CLIENT_CANCEL_FRIEND", async (userIdB) => {
        // Xóa id của A vào acceptFriend của B
        const existUserAInB = await User.findOne({
            _id: userIdB,
            acceptFriends: userIdA
        });

        if(existUserAInB) {
            await User.updateOne({
                _id: userIdB
            }, {
                $pull: {
                    acceptFriends: userIdA
                }
            });
        }

        // Xóa id của B trong requestFriend của A
        const existUserBInA = await User.findOne({
            _id: userIdA,
            requestFriends: userIdB
        });

        if(existUserBInA) {
            await User.updateOne({
                _id: userIdA
            }, {
                $pull: {
                    requestFriends: userIdB
                }
            });
        }

        // Trả về cho B độ dài của acceptFriends
        const infoB = await User.findOne({
            _id: userIdB
        });

        socket.broadcast.emit("SERVER_RETURN_LENGTH_ACCEPT_FRIEND", {
            length: infoB.acceptFriends.length,
            userId: userIdB
        });

        // Trả về cho B ID của A
        socket.broadcast.emit("SERVER_RETURN_ID_CANCEL_FRIEND", {
            userIdA: userIdA,
            userIdB: userIdB
        });
    })
    // END CLIENT_CANCEL_FRIEND

    // CLIENT_REFUSE_FRIEND: Khi A từ chối yêu cầu của B
    socket.on("CLIENT_REFUSE_FRIEND", async (userIdB) => {
        // Xóa id của B khỏi acceptFriend của A
        const existUserBInA = await User.findOne({
            _id: userIdA,
            acceptFriends: userIdB
        });

        if(existUserBInA) {
            await User.updateOne({
                _id: userIdA
            }, {
                $pull: {
                    acceptFriends: userIdB
                }
            });
        }

        // Xóa id của A trong requestFriend của B
        const existUserAInB = await User.findOne({
            _id: userIdB,
            requestFriends: userIdA
        });

        if(existUserAInB) {
            await User.updateOne({
                _id: userIdB
            }, {
                $pull: {
                    requestFriends: userIdA
                }
            });
        }
    })
    // END CLIENT_REFUSE_FRIEND

    // CLIENT_ACCEPT_FRIEND: Khi A chấp nhận yêu cầu của B
    socket.on("CLIENT_ACCEPT_FRIEND", async (userIdB) => {
        try {
            // Tạo phòng chat chung
            const roomChat = new RoomChat({
            typeRoom: "friend",
            users: [
                {
                    userId: userIdA,
                    role: "superAdmin"
                },
                {
                    userId: userIdB,
                    role: "superAdmin"
                }
            ],
            deleted: false
            });

            await roomChat.save();

            // Thêm {userId, roomChatId} của B vào friendList của A
            // Xóa id của B khỏi acceptFriend của A
            const existUserBInA = await User.findOne({
                _id: userIdA,
                acceptFriends: userIdB
            });

            if(existUserBInA) {
                await User.updateOne({
                    _id: userIdA
                }, {
                    $push: {
                        friendList: {
                            userId: userIdB,
                            roomChatId: roomChat.id
                        }
                    },
                    $pull: {
                        acceptFriends: userIdB
                    }
                });
            }

            // Thêm {userId, roomChatId} của B vào friendList của A
            // Xóa id của A trong requestFriend của B
            const existUserAInB = await User.findOne({
                _id: userIdB,
                requestFriends: userIdA
            });

            if(existUserBInA) {
                await User.updateOne({
                    _id: userIdB
                }, {
                    $push: {
                        friendList: {
                            userId: userIdA,
                            roomChatId: roomChat.id
                        }
                    },
                    $pull: {
                        requestFriends: userIdA
                    }
                });
            }
        } catch (error) {
            console.log(error);
        }
    });
    // END CLIENT_ACCEPTED_FRIEND
  });
}