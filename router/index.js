const express=require('express');
const router=express.Router();
const Book= require('../models/book')
 router.get('/',(req,res)=>{
     res.render('choose',{layout:'layouts/layy'})
 })

router.get('/buyer',async (req,res)=>{
    let books
    try{
      books= await Book.find().sort({created:'desc'}).limit(10).exec()
    }catch{
      books=[]
    }
    res.render('index',{books:books,layout:'layouts/lay'});
    
});

module.exports=router;
