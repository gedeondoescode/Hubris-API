
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const helmet = require("helmet");
const morgan = require("morgan");
const dotenv = require("dotenv");

const testRoute = require("./routes/test");

const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts")


dotenv.config();

mongoose.connect(process.env.MONGO_ATLAS, {useNewUrlParser: true, useUnifiedTopology: true}, ()=>
{
    console.log("Connected to Atlas")
});

//Middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/test", testRoute)
app.use("/api/users", userRoute)
app.use("/api/auth", authRoute)
app.use("/api/posts", postRoute)


app.listen(process.env.PORT, () => {
    console.log("Now online")
})