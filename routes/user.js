const express = require('express');
const Router = express.Router();
const Article = require ('../models/article')
Router.get('/new', (req,res)=>{
    res.render('article/new')
})

// Router.post('/',(req,res)=>{
//    const article = new Article({
//     title: req.body.title,
//     des: req.body.des,
//     info: req.body.info
//    })
//    article.save().then(()=>{
//     res.redirect(`/`)
//    })
// })

Router.get('/:_id',async(req,res)=>{
   
    const article = await Article.findOne({_id:req.params._id})
    if (article == null){res.redirect('/')}
    res.render('article/show',{article:article})



})





Router.post('/', (req, res) => {
    const { title, des, info } = req.body;

    // Check if title, des, and info are provided
    if (!title || !des || !info) {
        return res.status(400).send("Please provide title, description, and info.");
    }

    const article = new Article({
        title: title,
        des: des,
        info: info
    });

    article.save()
        .then(() => {
            res.redirect('/');
        })
        .catch((error) => {
            // Handle validation errors
            if (error.name === 'ValidationError') {
                return res.status(400).send(error.message);
            }
            // Handle other errors
            res.status(500).send("An error occurred while saving the article.");
        });
});


//delete

// Router.get('/delte/:id',(req,res)=>{
//     Article.findByIdAndDelete({id:req.params.id},(err)=>{
//         if(err){
//             res.send('sorry')
//         }
//         else{
//             res.redirect('/')
//         }
//     })
// } )



// Router.post('/delete/:id', (req, res) => {
//     Article.findByIdAndDelete({_id:req.params.id}, (err) => {
//         if (err) {
//             console.log(err);
//             res.send('Sorry, an error occurred while deleting the article.');
//         } else {
//             res.redirect('/');
//         }
//     });
// });

Router.post('/:id/delete', async (req, res) => {
    try {
        const deletedArticle = await Article.findByIdAndDelete(req.params.id);
        if (!deletedArticle) {
            return res.status(404).send('Article not found.');
        }
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).send('Sorry, an error occurred while deleting the article.');
    }
});

















module.exports = Router;