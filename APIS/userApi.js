// create mini express app

const express = require('express')
const userApi = express.Router()
const expressAsyncHandler = require('express-async-handler')
const bcryptjs = require('bcryptjs') 
const jwt = require('jsonwebtoken')
const multerObj = require('./middlewares/addProfilePic')
const checkToken = require("./middlewares/verifyToken")
const { decrypt, encrypt } = require("./EncryptingData");
const ObjectId = require("mongodb").ObjectId;

// body parser middleware
userApi.use(express.json())

let userCollection

userApi.use((req,res,next)=>{
    userCollection = req.app.get("userCollection")
    
    next()
})

// user registration
userApi.post('/register',multerObj.single('photo'), expressAsyncHandler(async(req,res) => {
    console.log('is')
    let newUser = JSON.parse(req.body.userObj)
    newUser.image = req.file.path
    newUser.userType = "user"
    console.log('good')
    // check for duplicate user
    // if user existed send res user existed
    // else hash password
    // replace plain password with hash password
    // insert userObj to usercollection
    let user = await userCollection.findOne({email:newUser.email })
    console.log(user)
    if(user !== null)
    {
        res.send({message:"user exists"})
    }

    else{
        let hashedPassword = await bcryptjs.hash(newUser.password, 6 )
        newUser.password = hashedPassword
        await userCollection.insertOne(newUser)
        res.send({message:"user created"})
    }
}))

userApi.post('/login', expressAsyncHandler(async(req,res)=>{
   let userCredentialsObj = req.body
   console.log(userCredentialsObj)
   let user = await userCollection.findOne({email: userCredentialsObj.email})
   if(user === undefined)
   {
       res.send({message:"Invalid username"})
   }
   else{
       let status = await bcryptjs.compare(userCredentialsObj.password,user.password)
       if(status === false){
           res.send({message: "Invalid password"})
       }
       else{
           let signedToken = await jwt.sign({email: user.email},process.env.SECRET)
           res.send({message: "success", token:signedToken, user:user})
           console.log('login success')
       }
   }
}))

userApi.put(
    "/editprofilepic",
    checkToken,
    multerObj.single("photo"),
    expressAsyncHandler(async (req, res) => {
      let encryptedUser = req.body.userObj;
      let user = decrypt(encryptedUser);
      user.image = req.file.path;
      let updatedUser = { ...user };
      delete user._id;
      await userCollection.updateOne(
        { _id: new ObjectId(updatedUser._id) },
        { $set: user }
      );
      let newEncryptedUser = encrypt(updatedUser);
      res.send({ message: "updated", payload: newEncryptedUser });
    })
  );

  userApi.put(
    "/edituserprofile",
    checkToken,
    expressAsyncHandler(async (req, res) => {
      let { encryptedUser } = req.body;
      let user = decrypt(encryptedUser);
      let id = user._id;
      let oldUser = await userCollection.findOne({ _id: ObjectId(user._id) });
      let status = await bcryptjs.compare(user.password, oldUser.password);
      if (status === true) {
        let hashedPassword = await bcryptjs.hash(user.npassword, 6);
        user.password = hashedPassword;
        delete user._id;
        delete user.npassword;
        await userCollection.updateOne({ _id: new ObjectId(id) }, { $set: user });
        user._id = id;
        let encUser = encrypt(user);
        res.send({ message: "updated", payload: encUser });
      } else {
        res.send({ message: "Invalid Password" });
      }
    })
  );


module.exports = userApi