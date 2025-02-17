const mongoose=require('mongoose');
const bcrypt=require('bcrypt');

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        
    },
    email:{
        type:String,
        unique:true
    },
    username:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:['buyer','admin'],
        default:'buyer'
    },
    cart:[{
        bookName: { // Store book name directly
            type: String,
            required: true
          },
        book:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Book',
            required:true
        },
        addtocartAt:{
            type:Date,
            default:Date.now()
        }
    }]
})

userSchema.pre('save',async function(next){
    const person=this;
    if(!person.isModified('password')) return next();

    try{
        const salt=await bcrypt.genSalt(10);

        //hash password
        const hashpassword=await bcrypt.hash(person.password,salt);

        //overide the plain password with the hashed one
        person.password=hashpassword;
        next(); 
    }catch(err){
        return next(err)
    }
})

userSchema.methods.comparePassword=async function(candidatePassword){
    
    try{
        const isMatch= await bcrypt.compare(candidatePassword,this.password)
          return isMatch;
    }catch(err){
        throw err;
    }
}

const User=mongoose.model('User',userSchema);
module.exports=User