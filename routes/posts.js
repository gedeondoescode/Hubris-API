const router = require("express").Router()
const Post = require("../models/Post")
//create posts
router.post('/', async (req, res)=>{
    const newPost = new Post(req.body)

    try{
        const savedPost = await newPost.save();
        res.status(200).json(savedPost)
    }catch(err){
        res.status(500).json(err)
    }
})
module.exports = router