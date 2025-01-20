import express from 'express'
import { addDoctor, loginAdmin,allDoctors,appointmentList, AppointmentCancel } from '../controllers/adminController.js'
import upload from '../middlewares/multer.js'
import authadmin from '../middlewares/authadmin.js'
import { changeAvailablity } from '../controllers/doctorController.js'

const adminRouter=express.Router()

adminRouter.post('/add-doctor',authadmin
    ,upload.single('image'),addDoctor)
adminRouter.post('/login',loginAdmin)
adminRouter.post('/all-doctors',authadmin,allDoctors)
adminRouter.post('/change-availability',authadmin,changeAvailablity)
adminRouter.get('/all/appointments',authadmin,appointmentList)
adminRouter.post('cancel-appointment',authadmin,AppointmentCancel)
export default adminRouter;
