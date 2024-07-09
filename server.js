const express= require("express")
const app = express()

// configure dotenv
require("dotenv").config() 

const userApi = require("./APIS/userApi")
const adminApi = require("./APIS/adminApi")
const contentApi = require("./APIS/contentApi")
const watchlistApi = require("./APIS/watchlistApi")

// import path module
const path = require("path")

app.use("/users", userApi)
app.use("/admin", adminApi)
app.use("/content", contentApi)
app.use("/watchlist", watchlistApi)
// connect build of react-app
app.use(express.static(path.join(__dirname,'./build')))

// dealing with refresh of page
app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,'./build', 'index.html'))
})

// import mongodb module
const mongoClient = require("mongodb").MongoClient


// get database url
const dbUrl  = process.env.DATABASE_URL

// database connection
mongoClient.connect(dbUrl,(err,client)=>{
    if(err){
        console.log("error in db connect")
    }
    else{
        let databaseObj = client.db('videogallerydatabase')
        let userCollection = databaseObj.collection('usercollection')
        let adminCollection = databaseObj.collection('admincollection')
        let videoCollection = databaseObj.collection('videocollection')
        let watchlistCollection = databaseObj.collection('watchlistcollection')

        // set collection to app object
        app.set("userCollection",userCollection)
        app.set("adminCollection",adminCollection)
        app.set("videoCollection",videoCollection)
        app.set("watchlistCollection", watchlistCollection)
        console.log('connected to db')
    }
})

// error handling
app.use((err,req,res,next)=>{
    res.send({mesage:"error message", reason:err.message})
})


// assign port
const PORT = process.env.PORT
app.listen(PORT,()=>console.log(`server listening on port ${PORT}`))