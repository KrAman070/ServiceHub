const mongoose=require('mongoose');
const validator = require('validator');
const bcrypt= require('bcryptjs');
const commonFields = {
    email: {
      type: String,
      required: true,
      validate: {
        validator: validator.isEmail,
        message: '{VALUE} is not a valid email',
        isAsync: false,
      },
    },
    password: {
      type: String,
      required: true,
    },
  };

const registerFields={
    // email:{
    //     type:String,
    //     required:true,
    //     validate:{
    //         validator: validator.isEmail,
    //         message: '{VALUE} is not a valid email',
    //         isAsync: false
    //       }
    // },
    // password: {
    //     type:String,
    //     required:true
    // },
    ...commonFields,
    cpassword: {
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    fname: {
        type:String,
        required:true
    },
    lname: {
        type:String,
        required:true
    },
    service:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
      },
      city:{
        type:String,
        required:true
      },
      isbooked:{
        type:Boolean,
        default:false
      },
      verified:{
        type:Boolean,
        default:false
      }

};
const registerSchema=new mongoose.Schema(registerFields);

const signupFields = {
    ...commonFields,
    name: {
        type:String,
        required:true
    },
  };
  const signupSchema = new mongoose.Schema(signupFields);

  const loginFields = {
    ...commonFields,
  };
  const loginSchema = new mongoose.Schema( loginFields);
  

const preSaveHook = async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  if (this.cpassword && this.isModified('cpassword')) {
    this.cpassword = await bcrypt.hash(this.cpassword, 12);
  }
  next();
};
registerSchema.pre('save',preSaveHook);
signupSchema.pre('save', preSaveHook);
loginSchema.pre('save', preSaveHook);
const RegisterUser=mongoose.model('REGISTRATION', registerSchema);
const SignupUser = mongoose.model('SignupUser', signupSchema);
const LoginUser = mongoose.model('LoginUser', loginSchema);
module.exports={RegisterUser,SignupUser,LoginUser};