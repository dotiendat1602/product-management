const RoomChat = require("../../model/rooms-chat.model");

module.exports.isAccess = async (req, res, next) => {
    try {
        const roomChatId = req.params.roomChatId;
        const userId = res.locals.user.id;

        const roomChat = await RoomChat.findOne({
            _id: roomChatId,
            "users.userId": userId
        });

        if(roomChat) {
            next();
        } 
        else {
            res.redirect("/users/friends");
        } 

    } catch (error) {
        res.redirect("/users/friends");
    }
}