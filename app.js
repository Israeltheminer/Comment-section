require('dotenv').config()
const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const port = process.env.PORT || 7070
const path = require('path');
const mongoose = require("mongoose")
const COMMENT = require("./Schemas/comment")
const expressLayouts = require("express-ejs-layouts")
const cookieParser = require('cookie-parser');

connect()
async function connect() {
   try {
      await mongoose.connect(process.env.COMMENT_DATABASE_URI)
      console.log("Connection Successful")
   } catch (error) {
      console.log("Connection Unsuccessful")
      console.log(error)
   }
}


const app = express()
const DIST = path.join(__dirname , "dist")

// Set View engine
app.use(expressLayouts)
app.set('layout', './layouts/general')
app.set('view engine', 'ejs');

app.use(cors())
app.use('/dist', express.static(DIST))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser());


function fetchComment(array, result){
   for(let i = 0; i < array.length; i++){
      result.push(array[i])
   }
   for(let i = 0; i < array.length; i++){
      let allReplies = array[i].replies
      if(allReplies.length!==0){
         fetchComment(allReplies, result)
      }
   }
   return result
}

function fetchField(array, result, ...keys){
   for(let i = 0; i < array.length; i++){
      let item = array[i]
      let obj = {}
      for (let i = 0; i < keys.length; i++) {
         const key = keys[i];
         obj[key] = item[key]
      }
      result.push(obj)
   }
   return result
}

app.get("/", (req, res)=> {
   fetch()
   async function fetch() {
      try {
         let mainComments = await COMMENT.find()
         let allCommentArray = []
         let allCommentInfo = fetchComment(mainComments, allCommentArray)
         let fetchFieldArray = []
         let allFieldInfo = fetchField(allCommentInfo, fetchFieldArray, "_id", "username")
         res.render("home", {
            path: "home",
            user_info: allFieldInfo
         })
      } catch (error) {
         console.log(error)
      }
   }
})
app.post("/", (req, res)=> {
   let currentUserInfo = req.body
   let currentUserCookies = JSON.stringify(currentUserInfo)
   res.cookie('userInfo', currentUserCookies)
   res.redirect("/comment")
});


app.get('/comment', (req, res) => {
   fetch()
   async function fetch() {
      try {
         let mainComments = await COMMENT.find()
         let userInfoCookies = req.cookies.userInfo
         let userInfo = JSON.parse(userInfoCookies)
         res.render("comment", {
            path: "comment",
            userInfo: userInfo,
            comments: mainComments
         })
      } catch (error) {
         console.log(error)
      }
   }
})

app.get('/data', (req, res) => {
   fetch()
   async function fetch() {
      try {
         let mainComments = await COMMENT.find()
         res.json(mainComments)
      } catch (error) {
         console.log(error)
      }
   }
})


app.listen(port, () => console.log(`Server listening on port ${port}`) );


// async function update() {
//    try {
//       await COMMENT.updateOne({_id: "62c55c5083d38615692cfcc0"}, {$push: {replies: 
//          {
//             content: "I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.",
//             score: 2,
//             username: 'juliusomo',
//             parent: "62c55c5083d38615692cfcc0",
//             replyingTo: 'ramsesmiron',
//          }
//       }})
//    } catch (error) {
//       console.log(error)
//    }
// }