const Post = require('../models/posts');
const User = require('../models/users');

module.exports = {
    create : async (req, res) => {
        const user=req.user.user._id;
        const { title, description} = req.body;
        const post = await Post.create({
            title,
            description,
            user
        });
        await post.save();

        const userById = await User.findById(user);

        userById.posts.push(post);
        await userById.save();

        return res.send(post);
    },
    userByPost : async (req,res)=>{
        const { id } = req.params;
        const userByPost = await Post.findById(id).populate('user');
        res.send(userByPost);
    },
    comments: async(req, res)=>{

    },
    like: async(req,res)=>{
        const user=req.user.user
        const post=req.params.id
        
        const postById=await Post.findById(post)
        postById.likes.push(user)
        await postById.save()
        const userById=await User.findById(user)
        userById.likes.push(postById)
        await userById.save()
        res.send("Liked")
    },
    unlike: async(req,res)=>{
        const user=req.user.user
        const post=req.params.id
        
        const postById=await Post.findById(post)
        postById.likes.pop(user)
        await postById.save()
        const userById=await User.findById(user)
        userById.likes.pop(postById)
        await userById.save()
        res.send("Unliked")
    },
    delete: async(req, res)=>{
        const {id}=req.params;
        const post = await Post.findByIdAndDelete(id)
        const userById = await User.findById(post.user);
        
        userById._doc.posts.splice(userById._doc.posts.indexOf(post),1);
        await userById.save();
        

        return res.send("Post Deleted");
    },
    find: async(req,res)=>{
        const { id } = req.params;
        const post = await Post.findById(id)
        post._doc.noOfLikes=post.likes.length
        post._doc.noOfComments=post.comments.length
        res.send(post);
    }
}