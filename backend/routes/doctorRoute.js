import express from 'express'
import { docappointment, doctorList,logindoctor } from '../controllers/doctorController.js'
import authDoc from '../middlewares/authDoctor.js'


const doctorRoute=express.Router()
doctorRoute.get('/list',doctorList)
doctorRoute.post('/login',logindoctor)
doctorRoute.get('/appointments',authDoc,docappointment)

export default doctorRoute