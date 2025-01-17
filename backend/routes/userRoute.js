import express from 'express'
import { bookAppointment, cancelAppointment, getProfile, listAppointment, loginUser, paymentRazorpay, registerUser, updateProfile, verifyapi } from '../controllers/userControllers.js'
import authUser from '../middlewares/authUser.js'
import upload from '../middlewares/multer.js'

const userRoute=express.Router()

userRoute.post('/register',registerUser)
userRoute.post('/login',loginUser)
userRoute.get('/profile',authUser,getProfile)
userRoute.post('/update/profile',upload.single('image'),authUser,updateProfile)
userRoute.post('/book/appointment',authUser,bookAppointment)
userRoute.get('/appointments',authUser,listAppointment)
userRoute.post('/cancel/appointment',authUser,cancelAppointment)
userRoute.post('/payment-razorpay',authUser,paymentRazorpay)
userRoute.post('/verifyRazorpay',authUser,verifyapi)

export default userRoute;