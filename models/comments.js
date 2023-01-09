const mongoose = require('mongoose');
const CommentSchema = new mongoose.Schema({
    comment: {
        type: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Posts'
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Comment', CommentSchema);