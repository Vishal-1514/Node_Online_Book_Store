const express=require('express');
const router=express.Router();

const User =require('./../models/user')
const {jwtAuthMiddleware,genratToken}=require('./../jwt');
const Book = require('./../models/book');
const { json } = require('body-parser');
const { findById } = require('../models/book');

const checkAdminRole= async(userID)=>{
    try{
        const user=await User.findById(userID);
        if(!user){
            console.log("user not found");
            return false;
        }
        return user.role ==='admin';
    }catch(err){
        console.log(err);
        res.status(500).json({error:"internal server error"})
    }
}

router.post('/',jwtAuthMiddleware,async(req,res)=>{
    try{
        if(!checkAdminRole(req.user.id)){
            return res.status(500).json({message:"user do not have admin role"})
        }
        const data=req.body;
        const newBook=new Book(data);
        const response=await newBook.save();
        console.log("data saved")

        res.status(400).json({response:response})
    }catch(err){
        console.log(err);
        res.status(500).json({error:"internal server error"})
    }
})

router.put('/:bookID',jwtAuthMiddleware,async(req,res)=>{
    try{
        if(!checkAdminRole(req.user.id)){
            return res.status(500).json({message:"user do not have admin role"})

        }
        const bookId=req.params.bookID;
        const updateBookData=req.body
        const response=await Book.findByIdAndUpdate(bookId,updateBookData,{
            new:true,
            runValidators:true
        })
        if(!response){
            return res.status(404).json({error:'candidate not found'})
        }
        console.log('data updated');
        res.status(200).json(response)

    }catch(err){
        console.log(err);
        res.status(500).json({error:'internal server error'})
    }
})

router.delete('/:bookID',jwtAuthMiddleware,async(req,res)=>{
    try{
        if(!checkAdminRole(req.user.id)){
            return res.status(500).json({message:"user do not have admin role"})
        }
        const BookId=req.params.bookID;
        const book = await Book.findById(BookId);
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        await Book.findByIdAndDelete(BookId);
        console.log("data deleted");
        return res.status(200).json({message:"data deleted"})
    }catch(err){
        console.log(err);
        return res.status(500).json({error:'internal server error'})
    }
})

//get the list of book
router.get('/listofBook',async(req,res)=>{
    try{
        const book=await Book.find();
        const list=book.map((data)=>{
            return {
                bookName:data.name,
                bookPrice:data.price
            }
        })
        res.status(200).json(list)
    }catch(err){
        console.log(err);
        res.status(500).json({error:"internal server errror"})
    }
})

//search book
router.get('/:BookID',async(req,res)=>{
    try{
        const bookId=req.params.BookID;
        const book=await Book.findById(bookId);
        if(!book){
            return res.status(500).json({message:'invalid id'})
        }
        return res.status(200).json(book)
    }catch(err){
        console.log(err);
        res.status(500).json({error:'internal server error'})
    }
})

module.exports=router