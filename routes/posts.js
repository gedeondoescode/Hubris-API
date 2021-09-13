const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");

//create posts
router.post('/', '/upload', async (req, res, next)=>{
    const newPost = new Post(req.body)

    try{
        const savedPost = await newPost.save();
        res.status(200).json(savedPost)
    }catch(err){
        res.status(500).json(err)
    }
});

//update posts
router.put("/:id", async (req, res)=>{ 
    try{
        const post = await Post.findById(req.params.id);
        if(post.userId === req.body.userId){
            await post.updateOne({$set:req.body});
            res.status(200).json('Your post has been successfully edited')
    
        }else {
            res.status(403).json("You can only update your post")
        }

    }catch(err){
        res.status(500).json(err)
    }
});

//delete posts
router.delete("/:id", async (req, res)=>{ 
    try{
        const post = await Post.findById(req.params.id);
        if(post.userId === req.body.userId){
            await post.deleteOne();
            res.status(200).json('Your post has been successfully deleted')
    
        }else {
            res.status(403).json("You can only delete your post")
        }

    }catch(err){
        res.status(500).json(err)
    }
});

//like/dislike posts
router.put('/:id/like', async (req, res) => {
    try{
        const post = await Post.findById(req.params.id);
        if(!post.likes.includes(req.body.userId)){
            await post.updateOne({ $push: { likes: req.body.userId } });
            res.status(200).json("Post liked!");
        } else {
            await post.updateOne({ $pull: { likes:req.body.userId } });
            res.status(200).json("Post unliked")
        }
    }catch(err){
        res.status(500).json(err)
    }
});

// fetch posts
router.get("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    } catch(err) {
        res.status(500).json(err)
    }
});

// get timeline posts
router.get("/timeline/all", async (req, res) => {
    try {
        const currentUser = await User.findById(req.body.userId);
        const userPosts = await Post.find({ userId: currentUser._id });
        const authorPosts = await Promise.all(
            currentUser.following.map((authorId) =>{
                return Post.find({ userId: authorId });
            })
        );
        res.json(userPosts.concat(...authorPosts))
    } catch(err) {
        res.status(500).json(err)
    }
});
module.exports = router