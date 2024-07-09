const express = require('express')
const expressAsyncHandler = require('express-async-handler')
const adminApi = express.Router()
const jwt = require('jsonwebtoken')
let bcryptjs = require('bcryptjs')
const multerObj = require('./middlewares/addProfilePic')
const checkToken = require("./middlewares/verifyToken")
const { decrypt, encrypt } = require("./EncryptingData");
const ObjectId = require("mongodb").ObjectId;


adminApi.use(express.json())

let adminCollection

adminApi.use((req,res,next)=>{
    adminCollection = req.app.get('adminCollection')
    next()
})

adminApi.post('/login', expressAsyncHandler(async(req,res)=>{
    let adminCredentialsObj = req.body
 
    let admin = await adminCollection.findOne({email: adminCredentialsObj.email})
    if(admin === undefined)
    {
        res.send({message:"Invalid username"})
    }
    else{
        let status = await bcryptjs.compare(adminCredentialsObj.password,admin.password)
        if(status === false){
            res.send({message: "Invalid password"})
        }
        else{
            let signedToken = await jwt.sign({email: admin.email},process.env.SECRET)
            res.send({message: "success", token:signedToken, user: admin})
        }
    }
 }))

 adminApi.put(
    "/editprofilepic",
    checkToken,
    multerObj.single("photo"),
    expressAsyncHandler(async (req, res) => {
      let encryptedUser = req.body.userObj;
      let user = decrypt(encryptedUser);
      user.image = req.file.path;
      let updatedUser = { ...user };
      delete user._id;
      await adminCollection.updateOne(
        { _id: new ObjectId(updatedUser._id) },
        { $set: user }
      );
      let newEncryptedUser = encrypt(updatedUser);
      res.send({ message: "updated", payload: newEncryptedUser });
    })
  );
  // Edit Admin Profile
  adminApi.put(
    "/edituserprofile",
    checkToken,
    expressAsyncHandler(async (req, res) => {
      let { encryptedUser } = req.body;
      let user = decrypt(encryptedUser);
      let id = user._id;
      let oldUser = await adminCollection.findOne({ _id: ObjectId(user._id) });
      let status = await bcryptjs.compare(user.password, oldUser.password);
      if (status === true) {
        let hashedPassword = await bcryptjs.hash(user.npassword, 6);
        user.password = hashedPassword;
        delete user._id;
        delete user.npassword;
        await adminCollection.updateOne(
          { _id: new ObjectId(id) },
          { $set: user }
        );
        user._id = id;
        let encUser = encrypt(user);
        res.send({ message: "updated", payload: encUser });
      } else {
        res.send({ message: "Invalid Password" });
      }
    })
  );
 module.exports = adminApi