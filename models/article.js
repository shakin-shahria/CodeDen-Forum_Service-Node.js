const mongoose = require ('mongoose');
const slugify = require ('slugify')

const articleSchema = new mongoose.Schema({

    title:{                      // this are the name form where I have to match with the (new.ejs)
        type:String,
        required: true,
    },
    des:{
           

        type:String,
        required: true

    },
    info:{
           

        type:String,
        required: true,

    },
    createdAt:{
        type:String,
        default:Date.now()
    },
    slug:{
        type: String,
        required:true,
        unique: true
    }
})

articleSchema.pre('validate', function(next){
    if (this.title){
        this.slug = slugify(this.title,{lower:true,strict:true})
    }
    next()
})
module.exports = mongoose.model("Article",articleSchema)