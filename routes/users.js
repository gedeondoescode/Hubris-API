const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

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
    if(req.body.userId === req.params.id || req.body.isAdmin) {
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

module.exports = router