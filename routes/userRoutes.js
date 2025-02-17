const express=require('express');
const router=express()

const User=require('./../models/user');
const Book=require('./../models/book')
const { json } = require('body-parser');
const { jwtAuthMiddleware,genratToken } = require('../jwt');

router.get('/',(req,res)=>{
    res.send("hello")
})


//singup page
router.post('/singup',async(req,res)=>{
    try{
        const data=req.body;
        const newUser= new User(data);
        const response=await newUser.save();
        console.log("data saved");
        const playload={
            id:response.id,
            username:response.username

        }
        console.log(JSON.stringify(playload));
        const token=genratToken(playload)
        
        return res.status(200).json({response:response,token:token})
    }catch(err){
        console.log(err);
        res.status(500).json({error:"internal server error"})
    }
})

router.post('/login',async(req,res)=>{
    try{
        const {username,password}=req.body;

        const user=await User.findOne({username:username})

        if(!user || !(await user.comparePassword(password))){
            return res.status(401).json({error:'invalid username or password'})
        }
        const playload={
            id: user.id,
            username: user.username

        }
        const token=genratToken(playload)
        res.json({token})


    }catch(err){
        console.log(err)
        res.status(500).json({error:"internal server errorr"})
    }
})

//add book to cart
router.post('/addtoCart/:bookID',jwtAuthMiddleware,async(req,res)=>{
     bookId=req.params.bookID;
     userId=req.user.id;
     
     try{
        const book=await Book.findById(bookId);
        if(!book){
            return res.status(500).json({message:'invalid book id'})
        }
        
        const user=await User.findById(userId);
        if(!book){
            return res.status(500).json({message:'user not found'})
        }
        
        user.cart.push({bookName:book.name,book:bookId})
        await user.save();
        return res.status(200).json({message:'book saved in cart'})
     }catch(err){
        console.log(err);
        res.status(500).json({error:'internal server error'})
     }
})



module.exports=router