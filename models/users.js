const mongoose = require('mongoose');
const Posts = require('../models/posts');
const UserSchema = new mongoose.Schema({
    name: {
        type: String
    },
    posts: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Post' }
    ],
    following: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Users' }
    ],
    followers: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Users' }
    ],
    comments: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Comments' }
    ],
    email: { 
        type: String 
    }, 
    password: { 
        type: String 
    },
    likes:[
        {type:mongoose.Schema.Types.ObjectId, ref: Posts}
    ]
},
    {
        timestamps: true
    })

module.exports = mongoose.model('User', UserSchema);
