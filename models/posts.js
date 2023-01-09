const mongoose = require('mongoose');
const PostSchema = new mongoose.Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    comments: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Comments' }
    ],
    likes: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Users' }
    ]
}, {
    timestamps: true
})

module.exports = mongoose.model('Post', PostSchema);