
import bcrypt from "bcrypt";
import validator from "validator";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import jwt from 'jsonwebtoken'
import appointmentModel from "../models/appointmentModel.js";
import userModel from "../models/userModel.js";

const addDoctor = async (req, res) => {
    try {
        const { email, password, speciality, degree, experience, about, fees, address, name } = req.body;

        const imageFile = req.file; // Ensure imageFile exists and is valid

        console.log({ email, password, speciality, degree, experience, about, fees, address, name, imageFile });

        // Validate input
        if (
            !email ||
            !password ||
            !speciality ||
            !degree ||
            !experience ||
            !about ||
            !fees ||
            !address ||
            !name ||
            !imageFile
        ) {
            return res.status(400).json({
                success: false,
                message: "All fields are mandatory",
            });
        }

        // Validate email format
        if (!validator.isEmail(email)) {
            return res.status(400).json({
                success: false,
                message: "Please enter a valid email",
            });
        }

        // Validate password strength
        if (password.length < 8) {
            return res.status(400).json({
                success: false,
                message: "Please enter a strong password",
            });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Upload image to Cloudinary
        if (!imageFile || !imageFile.path) {
            return res.status(400).json({
                success: false,
                message: "Image file is required",
            });
        }

        const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
            resource_type: "image",
        });

        const imageUrl = imageUpload.secure_url;

        // Prepare doctor data
        const docData = {
            name,
            email,
            image: imageUrl,
            password: hashedPassword,
            speciality,
            degree,
            experience,
            about,
            fees,
            address: typeof address === 'string' ? JSON.parse(address) : address,
            date: Date.now(),
        };

        // Save to database
        const newDoc = new doctorModel(docData);
        await newDoc.save();

        return res.status(201).json({
            success: true,
            message: "Doctor added successfully",
        });
    } catch (e) {
        console.error(e.message);
        return res.status(500).json({
            success: false,
            message: e.message,
        });
    }
};

const allDoctors = async (req, res) => {
    try {
        const doctors = await doctorModel.find({}).select('-password');

        res.json({ success: true, doctors });
    } catch (e) {
        console.error(e);
        res.status(500).json({ success: false, message: e.message });
    }
};


// api for admin login
const loginAdmin=async(req,res)=>{
    try{
        const {email,password}=req.body;
        if(email===process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
            const token =jwt.sign(email+password,process.env.JWT_SECRET)
            return res.status(200).json({
                success:true,
                token
            })

        }
        else{
            return res.status(400).json({
                success:false,
                mesage:"Invalid Credentials"
            })
        }
    }
    catch(e){
        console.log(e)
        return res.status(400).json({
            success:false,
            error:e.message
        })
    }
}

// all appointments
const appointmentList=async(req,res)=>{
    try {
        const appointments=await appointmentModel.find({})
        console.log(appointments);
        res.json({
            success:true,
            appointments
        })

    } catch (error) {
        console.log(error)
        res.json({
            success:false,
            message:error.message
        })
    }
}

// api for cancelling the appointment
const AppointmentCancel = async (req, res) => {
    try {
        const {  appointmentId } = req.body;

      

        // Fetch appointment details
        const appointmentData = await appointmentModel.findById(appointmentId).lean();
        if (!appointmentData) {
            return res.status(404).json({
                success: false,
                message: 'Appointment not found',
            });
        }

        // Check authorization
        if (String(appointmentData.userId) !== userId) {
            return res.status(403).json({
                success: false,
                message: 'Unauthorized action',
            });
        }

        // Cancel the appointment
        await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });

        const { docId, slotDate, slotTime } = appointmentData;

        // Fetch doctor details
        const doctorData = await doctorModel.findById(docId).lean();
        if (!doctorData) {
            return res.status(404).json({
                success: false,
                message: 'Doctor not found',
            });
        }

        let { slots_booked } = doctorData;
        if (slots_booked[slotDate]) {
            slots_booked[slotDate] = slots_booked[slotDate].filter((e) => e !== slotTime);

            // Update doctor's slots
            await doctorModel.findOneAndUpdate({ _id: docId }, { slots_booked });
        }

        return res.status(200).json({
            success: true,
            message: 'Appointment cancelled successfully',
        });
    } catch (error) {
        console.error('Error in cancelAppointment:', error);
        return res.status(500).json({
            success: false,
            message: 'An error occurred while cancelling the appointment',
        });
    }
};

const admindashboard=async(req,res)=>{
    try{
        const doctors=await doctorModel.find({})
        //const users=await userModel.find({})
        const users=await userModel.find({})
        const appointments=await appointmentModel.find({})

        const dashdata={
            doctors:doctors.length,
            appointments:appointments.length,
            patients:users.length,
            latestAppointments:appointments.reverse().slice(0,5)
        }
        res.json({success:true,dashdata})

    }catch(e){
        console.log(e)
        res.json({success:false,message:e.message})
    }
}
export { addDoctor,loginAdmin ,allDoctors,appointmentList,AppointmentCancel,admindashboard};



