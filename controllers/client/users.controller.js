const User = require("../../model/user.model");

const usersSocket = require("../../sockets/client/users.socket");

// [GET] /users/not-friend
module.exports.notFriend = async (req, res) => {
    // SocketIO
    usersSocket(req, res);
    // End SocketIO

    const userId = res.locals.user.id;

    // $ne: not equal
    // $nin: not in

    const requestFriend = res.locals.user.requestFriends;
    const acceptFriend = res.locals.user.acceptFriends;

    const users = await User.find({
        $and: [
            { _id: { $ne: userId } },
            { _id: { $nin: requestFriend } },
            { _id: { $nin: acceptFriend } },
        ],
        status: "active",
        deleted: false,
    }).select("id avatar fullName");      

    res.render("client/pages/users/not-friend", {
        pageTitle: "Danh sách người dùng",
        users: users,
    });
}