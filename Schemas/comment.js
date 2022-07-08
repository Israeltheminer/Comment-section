const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new mongoose.Schema({
   content: String,
   createdAt: {
      type: Date,
      default: Date.now
   },
   score: {
      type: Number,
      default: 1
   },
   username: {
      type: String,
      lowercase: true
   },
   parent: { 
      type: Schema.Types.ObjectId,
      ref: 'comment'
   },
   replyingTo: String,
});
commentSchema.add({ replies: [commentSchema] })

commentSchema.post("save", function(doc, next){
   console.log("Info Saved Successfully")
   next()
});
commentSchema.post("updateOne", function(doc, next){
   console.log(`comment updated`)
   next()
});
commentSchema.post("deleteOne", function(doc, next){
   console.log(`comment deleted`)
   next()
});

module.exports = mongoose.model("comment", commentSchema);