# Hubris API

Backend for Hubris social network

[![Main](https://github.com/gedeondoescode/Hubris-API/actions/workflows/main.yml/badge.svg)](https://github.com/gedeondoescode/Hubris-API/actions/workflows/main.yml)
## MongoDB Schema 

`User`
```
-Username: String
-Email: String
-Password: String
-ProfilePic: String
-CoverPic: String
-followers/Following: Array
-isAdmin: boolean, default: false
-Desc: String
-badges: Number (NOT INTEGRATED)
```
---

`Post`
```
-Username: String
-Desc: String
-img: String
-likes: Array
```
---
This API is a bare framework for what is to come later in the near future. This only includes basic functionality for various requests such as registering, logging in, following and unfollowing users, creating and updating posts and various more features.

## Installing dependencies
This application was built using Yarn. 

***

-To get started, run `yarn install` to install the necessary dependencies from ``yarn.lock``.
-Create a `.env` file and connect the MongoDB database to the application.
-Reference the `.env` file in `index.js` using mongoose:

```
dotenv.config();

mongoose.connect(process.env.<MONGODB_SRV>, {useNewUrlParser: true, useUnifiedTopology: true}, ()=>
{
    console.log("Connected to Atlas")
});
```
-With Express, open up a server and have it listen to port: 1010:
```
const port = 1010

app.listen(port, () => {
    console.log(`Running on port ${port}`)
})
```
 -Run `nodemon` and it should immediately start up the app.

