
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const helmet = require("helmet");
const morgan = require("morgan");
const dotenv = require("dotenv");

// Public
const userRoute = require("./routes/public/usersRoute");
const authRoute = require("./routes/public/authRoute");
const postRoute = require("./routes/public/postsRoute")

dotenv.config();

mongoose.connect(process.env.MONGO_ATLAS, {useNewUrlParser: true, useUnifiedTopology: true}, ()=>
{
    console.log("Connected to Atlas")
});

//Middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

// Public routes
app.use("/v1/api/users", userRoute)
app.use("/v1/api/auth", authRoute)
app.use("/v1/api/posts", postRoute)

app.listen(process.env.PORT || 1010, () => {
    console.log("Now online")
})