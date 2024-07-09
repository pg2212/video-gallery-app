const express = require('express')
const expressAsyncHandler = require('express-async-handler')
const contentApi = express.Router()
const  multerObj = require('./middlewares/addContentImage')
const checkToken = require('./middlewares/verifyToken')
const ObjectId = require("mongodb").ObjectId;

contentApi.use(express.json())

let videoCollection

contentApi.use((req,res,next)=>{
    videoCollection = req.app.get("videoCollection")
    next()
})

contentApi.post('/addcontent',multerObj.single('videoPic'), expressAsyncHandler(async(req,res) => {
    console.log('is')
    let newVideo = JSON.parse(req.body.videoObj)
    newVideo.image = req.file.path
    await videoCollection.insertOne(newVideo)
    
    
    console.log(newVideo)
        res.send({message:"New Content Created"})
    
}))

contentApi.get('/getcontent',checkToken,expressAsyncHandler(async(req,res)=>{
 let videos = await videoCollection.find().toArray()
 res.send({message:"success", payload:videos})
}))
contentApi.delete(
    "/deletecontent/:videoName",
    checkToken,
    expressAsyncHandler(async (req, res) => {
      let videoName = req.params.videoName;
      let allContent = await videoCollection.find().toArray();
      let index = allContent.findIndex((value) => value.videoName === videoName);
      await videoCollection.deleteOne({ videoName: videoName });
      res.send({ message: "deleted", index: index });
    })
  );
  
  // Edit Content
  contentApi.put(
    "/editcontent",
    checkToken,
    multerObj.single("videoPic"),
    expressAsyncHandler(async (req, res) => {
      let contentObj = JSON.parse(req.body.contentObj);
      contentObj.image = req.file.path;
      let updatedContent = { ...contentObj };
      delete contentObj._id;
      await videoCollection.updateOne(
        { _id: new ObjectId(updatedContent._id)},
        { $set: contentObj }
      );
      res.send({ message: "updated", payload: updatedContent });
    })
  );



module.exports = contentApi