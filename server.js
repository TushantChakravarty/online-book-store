if(process.env.NODE_ENV !=='production'){
    require('dotenv').config();
}

const express=require('express');
const app=express();
const expressLayouts=require('express-ejs-Layouts');
const indexrouter= require('./router/index');
const bookrouter=require('./router/books')
const authorrouter=require('./router/authors')

app.set('view engine','ejs');
app.set('views',__dirname +'/views');
app.set('layout','layouts/layout');
app.use(expressLayouts);
app.use(express.static('public'));
app.use(express.urlencoded({limit:'10mb',extended: false}))
app.use(express.json())
const mongoose=require('mongoose');
mongoose.connect(process.env.DATABASE_URL,{
    useNewUrlParser:true
});
const db=mongoose.connection
db.on('error',error=>console.error(error));
db.once('open',()=>{
    console.log('connected to database');
})
app.use('/',indexrouter);
app.use('/books',bookrouter);
app.use('/authors',authorrouter);
app.listen(process.env.PORT||800,()=>{
    console.log('server is running');
});