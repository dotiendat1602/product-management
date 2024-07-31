const { default: mongoose } = require("mongoose");

const accountSchema = new mongoose.Schema({
    fullName: String,
    email: String,
    phone: String,
    password: String,
    token: String,
    avatar: String,
    role_id: String,
    status: String,
    deleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true 
    // Tự động thêm trường createdAt và updatedAt (https://mongoosejs.com/docs/timestamps.html)
});

const Account = mongoose.model('Account', roleSchema, "accounts");

module.exports = Account;