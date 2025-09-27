const userModel = require('../models/user.models')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const foodPartnerModel = require('../models/foodpartner.model')

async function registerUser(req, res){
      const {fullName, email , password} = req.body

      const isUserAlreadyExist = await userModel.findOne({
        email
      })

      if(isUserAlreadyExist){
        return res.status(400).json({
            message:"User already exist"
        })
      }

      const hashedPassword = await bcrypt.hash(password, 8)

      const user = await userModel.create({
        fullName,
        email, password:hashedPassword

      })

      const token = jwt.sign({
        id:user._id,
      },process.env.JWT_SECRET
    )

    res.cookie("token", token)

    res.status(201).json({
      message:"User registered successfully",
      user:{
      _id:user._id,
      email:user.email,
      fullName:user.fullName,
      }
    })
}

async function loginUser(req, res){
    const {email, password} = req.body;

    const user = await userModel.findOne({

      email
    })

    if(!user){
      res.status(400).json({
        message:'Invalid email or password'
      })
    }
    const isPasswordMatched = await bcrypt.compare(password, user.password)

    if(!isPasswordMatched){
      return res.status(400).json({
        message:'Invalid email or password'
      })
    }

    const token = jwt.sign({
      id:user._id,

    },process.env.JWT_SECRET)

    res.cookie("token", token)

    res.status(200).json({
      message:"User logged in successfully",
      user:{
        _id:user._id,
        email:user.email,
        fullName:user.fullName,

      }
    })
}

async function logoutUser(req, res){
   res.clearCookie("token");
   res.status(200).json({
    message:"User logged out successfully"
   })
}


async function registerFoodPartner(req, res){
      const {name , email , password, phone, address, contactName} = req.body

      const isAccountExists = await foodPartnerModel.findOne({
        email 
      })

      if(isAccountExists){
        return res.status(400).json({
          message:"Food partner already exists"
        })

        
        
      }
      
      const  hashedPassword = await bcrypt.hash(password, 10);

      const foodPartner = await foodPartnerModel.create({
        name,
        email,
        password:hashedPassword,
        phone,
        contactName,
        address

      })

      const token = jwt.sign({
        id:foodPartner._id,
      }, process.env.JWT_SECRET)

      res.cookie("token", token)
     

      res.status(201).json({
        message:"Food partner registered successfully",
        foodpartner:{
          _id:foodPartner._id,
          email:foodPartner.email,
          name:foodPartner.name,
          phone:foodPartner.phone,
          contactName:foodPartner.contactName,
          address:foodPartner.address,
          

        }
      })
    }


async function loginFoodPartner(req, res){
      const {email, password} = req.body;
      const foodPartner = await foodPartnerModel.findOne({
email
      })
      if(!foodPartner){
        return res.status(400).json({
          message:"Invalid email or password"
        })
      }

      const isPasswordMatched = await bcrypt.compare(password, foodPartner.password)

      if(!isPasswordMatched){
        return res.status(400).json({
          message:"Invalid email or password"
        })
      }
      
      const token = jwt.sign({
        id:foodPartner._id,
        
        
      },process.env.JWT_SECRET) 
      res.cookie("token", token)
      res.status(200).json({
        message:"Food partner logged in successfully",
      })
      // console.log("FoodPartner token:", token);

}


function logoutFoodPartner(req, res){
  res.clearCookie("token");
  res.status(200).json({
    message:"Food partner logged out successfully"
  })
}


module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  registerFoodPartner,
  loginFoodPartner,
  logoutFoodPartner
  // 
}