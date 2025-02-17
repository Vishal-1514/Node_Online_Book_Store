const mongoose=require('mongoose');
const bcrypt=require('bcrypt');

const bookSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    about:{
        type:String,
        
    }
})
const Book=mongoose.model('Book',bookSchema);
module.exports=Book;