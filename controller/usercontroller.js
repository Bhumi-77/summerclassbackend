const User = require("../model/usermodel");
const Profile = require("../model/ProfileModel");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");


function getMynamecontroller(req, res, next) {

//router.get('/myname', function(req, res, next) {
  //res.send('my name is bhumi ');
   res.json({
  name :"dharan",
   city:"dharan",
    age :25,
  

   });
//);
}
  //res.send('respond with a resource');

   

async function createUserController(req,res, next){

    const name = req.body.name;
    const email = req.body.email;
    const password= req.body.password;
    const username= req.body.username;
   
        if (   !name ||!email || !password ||!username){
          return res.status(400).json({
            message:"Please Provide All required Details",
          });
        }

        const checkuser= await User.findOne({ email });
        if (checkuser){
          return res.status(400).json({
            message:"user already exists with this email"
          });
        }

      const encryctPassword= await bcrypt.hash(password,10);
      
      const finaldata={
      name,
      email, 
      password: encryctPassword,
      username,
    };

    const user = new User(finaldata);
  await user.save();

  const profileData = { 
    user: user._id,
    bio: "",
    profilePicture: "",
    skills: [],
    github: "",
    linkedin: "",
    portfolioUrl: ""
  };

  const profile = new Profile(profileData);
  await profile.save();
  
  res.status(201).json({
    message: "User Created",
    user: user,
  });
}

    
  
async function loginHandleController(req,res, next){
  const {email, password} = req.body;
  if ( !email || !password){
          return res.status(400).json({
            message:"Please Provide All Details",
          });
        }

        const checkuser= await User.findOne({ email: email }).select("+password");
        if (!checkuser){
          return res.status(400).json({
            message:"user does not exists with this email"
          });
        }

    const checkPassword = await bcrypt.compare(password, checkuser.password);
       if (checkPassword) {
    const token = jwt.sign(
      {
      id: checkuser._id,
      role: checkuser.role, },
      
      process.env.AUTH_SECRECT_KEY,
      {
        expiresIn: "1h"
      }
    );
    return res.status(200).json({
      message: "login sucessfull",
      accessToken: token,
    });

        }else{
          return res.status(400).json({
            message:"Invalid credentials"
          });
            
          
        }
    }

    
async function getUserListController(req, res) {

  const userList = await User.find();
  res.status(200).json({
    message:"User alist fetched Successfully",
    users: userList,
  });
  
}
  
async function updateProfileMeController(req, res) {}

async function viewMyProfileController(req, res) {

  const {id} = req.user; // logic same and call the function get user information
}

async function viewProfileofUserController(req, res) {
  const {id} = req.params; // same as above
}


  module.exports= { 
    getMynamecontroller,
    createUserController,
    loginHandleController,
    getUserListController,
    updateProfileMeController,
    viewMyProfileController,
    viewProfileofUserController
  }