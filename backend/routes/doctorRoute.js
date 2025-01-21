import express from 'express'
import { doctorList,logindoctor } from '../controllers/doctorController.js'


const doctorRoute=express.Router()
doctorRoute.get('/list',doctorList)
doctorRoute.post('/login',logindoctor)

export default doctorRoute