const User = require('../models/users');
const jwt = require('jsonwebtoken')
module.exports = {
    create : async (req, res) =>{
        const  name  = req.body.name;
        const  email  = req.body.email;
        const  password  = req.body.password;
        const user = await User.create({
            name,email,password
        })
        console.log(user)
        return res.send(jwt.sign({user},'secretKey'))
    },

    find : async (req, res) => {
        const user = await User.find()
        return res.send(user)
    },
    postsByUser : async (req, res) => {
       const  id  = req.user.user;
       const user = await User.findById(id).populate({
        path:'posts',
        options: { sort: { createdAt: -1 }}
    })
       res.send(user.posts);
    },
    follow: async(req, res) => {
        const user=req.user.user
        const { id } = req.params;
        const userToFollow = await User.findById(id)

        const userById=await User.findById(user)

        userById.following.push(userToFollow);
        userToFollow.followers.push(userById)
        await userToFollow.save();
        await userById.save()
        res.send("Followed")
    },
    unfollow: async(req, res) => {
        const user=req.user.user
        const { id } = req.params;
        const userToFollow = await User.findById(id)

        const userById=await User.findById(user)

        userById.following.pop(userToFollow);
        userToFollow.followers.pop(userById)
        await userToFollow.save();
        await userById.save()
        res.send("Unfollowed")

    }
}
