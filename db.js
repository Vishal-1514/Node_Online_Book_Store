const mongoose=require('mongoose')
require('dotenv').config();

//const mongoURL='mongodb://localhost:27017/onlinebookstore';
const mongoURL = process.env.MONGODB_URL_LOCAL
mongoose.connect(mongoURL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}) ;

const db=mongoose.connection;

db.on('connected',()=>{
    console.log("mongo db data base connected")
});

db.on('disconnected',()=>{
    console.log("disconnected to mongo db server")
});
db.on('error',(err)=>{
    console.log("mongo db error",err)
})

module.exports=db
