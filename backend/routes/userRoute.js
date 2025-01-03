import express from 'express'
import { getProfile, loginUser, registerUser, updateProfile } from '../controllers/userControllers.js'
import authUser from '../middlewares/authUser.js'
import upload from '../middlewares/multer.js'

const userRoute=express.Router()

userRoute.post('/register',registerUser)
userRoute.post('/login',loginUser)
userRoute.get('/profile',authUser,getProfile)
userRoute.post('/update/profile',upload.single('image'),authUser,updateProfile)

export default userRoute;