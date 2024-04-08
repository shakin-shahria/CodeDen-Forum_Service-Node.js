const express = require('express');
const mongoose = require('mongoose');
const expressLayouts = require('express-ejs-layouts');
const Article = require ('./models/article')

//ROUTES
const userRouters = require('./routes/user')

const app = express();


//mongoose db con

mongoose.connect('mongodb://127.0.0.1:27017/blog').then(()=> console.log('MongoDB connected'))
.catch((err)=> console.log('Connection error', err))







//VIEW ENGINE
app.use(expressLayouts);
app.set('view engine', 'ejs');


//ROUTE
app.get('/',async(req, res)=>{
    const article = await Article.find();
    console.log(article)
    res.render('index',{article:article})
})

//Body parser

app.use(express.json());
app.use(express.urlencoded({exrended:true}))




//useerRouters
app.use('/article',userRouters)




//PUBLIC FOLDER for CSS and JS

app.use(express.static('public'))

//PORT
const PORT = process.env.PORT || 8080
app.listen(PORT, ()=>{

   console.log('Working on port 8080')



})