import express from 'express'
import { appointmentCancel, appointmentComplete, docappointment, docDashboars, doctorList,logindoctor } from '../controllers/doctorController.js'
import authDoc from '../middlewares/authDoctor.js'


const doctorRoute=express.Router()
doctorRoute.get('/list',doctorList)
doctorRoute.post('/login',logindoctor)
doctorRoute.get('/appointments',authDoc,docappointment)
doctorRoute.post('/complete-appointment',authDoc,appointmentComplete)
doctorRoute.post('/cancel-appointment',authDoc,appointmentCancel)
doctorRoute.get('/dashboard',authDoc,docDashboars)

export default doctorRoute