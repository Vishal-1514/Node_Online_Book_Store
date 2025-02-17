const express=require('express');
const app=express();
const db=require('./db')
require('dotenv').config();

const bodyParser=require('body-parser')
app.use(bodyParser.json());


const User=require('./models/user')
const Book=require('./models/book')

const userRoutes=require('./routes/userRoutes');
const bookRoutes=require('./routes/bookRoutes')

app.use('/user',userRoutes)
app.use('/book',bookRoutes)

const PORT= process.env.PORT || 3000;
app.listen(3000,()=>{
    console.log("listenging on port 3000")
})
