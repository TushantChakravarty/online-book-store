const mongoose=require('mongoose');
const path=require('path')
const coverimagebasepath='uploads/bookCovers'

const bookschema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required: true
    },
    created:{
        type:Date,
        required:true,
        default:Date.now
    },
    coverimage:{
        type:String
    },
    author:{
        type:String,
        required:true
    }
})
bookschema.virtual('coverImagePath').get(function(){
    if(this.coverimage!= null){
        return path.join('/',coverimagebasepath,this.coverimage)
    }
})
module.exports=mongoose.model("Book",bookschema);
module.exports.coverimagebasepath=coverimagebasepath