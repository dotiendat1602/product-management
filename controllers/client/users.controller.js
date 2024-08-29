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
    const friendList = res.locals.user.friendList;
    const friendListId = friendList.map(item => item.userId);

    const users = await User.find({
        $and: [
            { _id: { $ne: userId } },
            { _id: { $nin: requestFriend } },
            { _id: { $nin: acceptFriend } },
            { _id: { $nin: friendListId } },
        ],
        status: "active",
        deleted: false,
    }).select("id avatar fullName");      

    res.render("client/pages/users/not-friend", {
        pageTitle: "Danh sách người dùng",
        users: users,
    });
}

// [GET] /users/request
module.exports.request = async (req, res) => {
    // SocketIO
    usersSocket(req, res);
    // End SocketIO

    // $in: in

    const requestFriend = res.locals.user.requestFriends;

    const users = await User.find({
        _id: { $in: requestFriend},
        status: "active",
        deleted: false,
    }).select("id avatar fullName");      

    res.render("client/pages/users/request", {
        pageTitle: "Lời mời đã gửi",
        users: users,
    });
}

// [GET] /users/accept
module.exports.accept = async (req, res) => {
    // SocketIO
    usersSocket(req, res);
    // End SocketIO

    // $in: in

    const acceptFriend = res.locals.user.acceptFriends;

    const users = await User.find({
        _id: { $in: acceptFriend},
        status: "active",
        deleted: false,
    }).select("id avatar fullName");      

    res.render("client/pages/users/accept", {
        pageTitle: "Lời mời đã nhận",
        users: users,
    });
}

// [GET] /users/friends
module.exports.friends = async (req, res) => {
    // SocketIO
    usersSocket(req, res);
    // End SocketIO

    // $in: in

    const friendList = res.locals.user.friendList;
    const friendListId = friendList.map(item => item.userId);

    const users = await User.find({
        _id: { $in: friendListId},
        status: "active",
        deleted: false,
    }).select("id avatar fullName statusOnline");
    
    users.forEach(user => {
        const infoUser = friendList.find(friend => friend.userId == user.id);
        user.roomChatId = infoUser.roomChatId;
      })


    res.render("client/pages/users/friends", {
        pageTitle: "Danh sách bạn bè",
        users: users,
    });
}