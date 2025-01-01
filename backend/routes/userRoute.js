import express from 'express'
import { getProfile, loginUser, registerUser } from '../controllers/userControllers.js'
import authUser from '../middlewares/authUser.js'

const userRoute=express.Router()

userRoute.post('/register',registerUser)
userRoute.post('/login',loginUser)
userRoute.get('/profile',authUser,getProfile)

export default userRoute;