const express=require('express');
const router=express.Router();
const Author=require("../models/author")

router.get('/',async (req,res)=>{
    try{
    const author= await Author.find({})
    
    res.render('authors/index',{author:author});
}
    catch{
        res.redirect('/');
    }
});



router.get('/new',(req,res)=>{
    res.render('authors/new',{author:new Author()});
})
router.post('/',async (req,res)=>{
    const author=new Author({
        name:req.body.name
    })
    try{
        const newauthor=await author.save()
        res.redirect('authors');
    }catch{
        res.render("authors/new",{
            author:author,
            errormessage: 'error creating author'
        })
    }
    
})
module.exports=router;