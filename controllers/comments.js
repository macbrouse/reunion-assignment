const Comment = require('../models/comments');
const User = require('../models/users');
const Post = require('../models/posts');

module.exports = {
    create : async (req, res) =>{
        const user=req.user.user._id
        const post = req.params.id
        const comment=req.body.comment
        const comments = await Comment.create({
            comment,user,post
        })
        comments.save()

        const userById= await User.findById(user)
        userById.comments.push(comments)
        await userById.save()
        
        const postById = await Post.findById(post)
        postById.comments.push(comments)
        await postById.save()

        return res.send(comments)
    }
}