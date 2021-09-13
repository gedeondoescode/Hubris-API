const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

const upload = multer({ dest: 'uploads/'})

//update user info
router.put("/:id", async(req, res)=> {
    if(req.body.userId === req.params.id || req.body.isAdmin) {
        if(req.body.password){
            try{
                const salt = await bcrypt.genSalt(15);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            } catch(err){
                return res.status(500).json(err)
            }
        }
        try {
            const user = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body, 
            });
            res.status(200).json("Account has been updated")
        }catch(err){
            return res.status(500).json(err);
        }
    } else {
        return res.status(403).json("You cannot update an account that isn't yours")
    }
});

//Delete User
router.delete("/:id", async(req, res)=> {
    if(req.body.userId === req.params.id) {
        try {
            const user = await User.findByIdAndDelete(req.params.id,);
            res.status(200).json("Account has been deleted")
        }catch(err){
            return res.status(500).json(err);
        }
    } else {
        return res.status(403).json("You cannot delete an account that isn't yours")
    }
});

//get user
router.get("/:id", async (req, res) => {
    try{
        const user = await User.findById(req.params.id);
        const {password, updatedAt, ...other} = user._doc
        res.status(200).json(other)
    }catch(err){
        res.status(500).json(err)
    }
});

//follow uuser
router.put("/:id/follow", async (req, res)=> {
    if(req.body.userId !== req.params.id){
        try{
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if(!user.followers.includes(req.body.userId)){
                await user.updateOne({$push:{followers: req.body.userId}});
                await currentUser.updateOne({$push:{following: req.params.id}});
                res.status(200).json("You're now following this account")
            }else {
                res.status(403).json("You're already following this account")
            }
        }catch(err){
            res.status(500).json(err)
        }
    }else{
        res.status(401).json("You can't follow yourself!")
    }
});

//unfollow users
router.put("/:id/unfollow", async (req, res)=> {
    if(req.body.userId !== req.params.id){
        try{
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if(user.followers.includes(req.body.userId)){
                await user.updateOne({$pull:{followers: req.body.userId}});
                await currentUser.updateOne({$pull:{following: req.params.id}});
                res.status(200).json("Unfollowed")
            }else {
                res.status(403).json("You aren't following this account")
            }
        }catch(err){
            res.status(500).json(err)
        }
    }else{
        res.status(401).json("You can't unfollow yourself!")
    }
});


module.exports = router