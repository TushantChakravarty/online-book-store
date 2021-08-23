const express=require('express');
const router=express.Router();
const multer=require('multer')
const path =require('path');
const fs=require('fs');

const Book=require("../models/book")
const uploadpath=path.join('public',Book.coverimagebasepath)
const imageMimeTypes=['image/jpeg','image/png','image/gif']
const upload =multer({
    dest:uploadpath,
    fileFilter: (req,file,callback)=>{
        callback(null,imageMimeTypes.includes(file.mimetype))
    }
})
router.get('/',async (req,res)=>{
    let query=Book.find()
    if(req.query.title !=null && req.query.title !=''){
        query=query.regex('title', new RegExp(req.query.title,'i'))
    }
    if(req.query.author !=null && req.query.author !=''){
        query=query.regex('author', new RegExp(req.query.author,'i'))
    }
    try{
        const books=await query.exec()
        res.render('books/index',{
            books:books,
            searchoptions:req.query,
            layout:'layouts/lay'
        })

    }catch{
        res.redirect("/")
    }
    
});



router.get('/new',(req,res)=>{
    
   rendernewpage(res, new Book())
})
router.post('/',upload.single('cover'),async (req,res)=>{
    const filename=req.file!=null ? req.file.filename:null
    const book = new Book({
      title: req.body.title,
      author:req.body.author,
      coverimage:filename,
      description: req.body.description
  })
 try{

 
      const newbook =await book.save()
      res.redirect('/books')
 }catch{
    if(book.coverimage !=null){
        removebookcover(book.coverimage)
    }
    rendernewpage(res, book,true)
 } 
})
function removebookcover(filename){
    fs.unlink(path.join(uploadpath,filename))
    if(err) console.error(err)
}
async function rendernewpage(res,book,haserror=false){
   try{ const params={
        book:book
    }
    if(haserror) params.errormessage='error creating new book'
    res.render('books/new',params)
}catch{
    res.redirect('/books')
}
}
module.exports=router;