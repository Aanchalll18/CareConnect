
import validator from 'validator';
import userModel from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {v2 as cloudinary} from 'cloudinary'
import mongoose from "mongoose";
import doctorModel from '../models/doctorModel.js';
import appointmentModel from '../models/appointmentModel.js';


const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Validate input
        if (!email || !name || !password) {
            return res.status(400).json({
                success: false,
                message: "Missing Details!",
            });
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({
                success: false,
                message: "Please enter a valid email",
            });
        }

        if (password.length < 8) {
            return res.status(400).json({
                success: false,
                message: "Enter a strong password (at least 8 characters)",
            });
        }

        // Check if the email is already registered
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email is already registered",
            });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const userData = {
            name,
            email,
            password: hashedPassword,
        };

        const newUser = new userModel(userData);
        const user = await newUser.save();

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            token,
        });
    } catch (e) {
        console.error("Error in registerUser:", e.message);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: e.message, // Provide error details for debugging
        });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are mandatory",
            });
        }

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User doesn't exist",
            });
        }

        const isMatched = await bcrypt.compare(password, user.password);

        if (isMatched) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

            return res.status(200).json({
                success: true,
                message: "Password matched",
                token,
            });
        } else {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials",
            });
        }
    } catch (e) {
        console.error("Error in loginUser:", e.message);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: e.message, 
        });
    }
};

const getProfile = async (req, res) => {
    try {
        const { userId } = req.body;


        const userData = await userModel.findById(userId).select('-password');
        
        if (!userData) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        console.log("Retrieved user data:", userData);

        return res.status(200).json({
            success: true,
            userData,
        });
    } catch (e) {
        console.log("Error in getProfile:", e);
        return res.status(400).json({
            success: false,
            message: e.message,
        });
    }
};

const updateProfile = async (req, res) => {
    try {
      const { userId, name, phone, address, DOB, gender } = req.body;
      const imageFile = req.file;
  
      if (!name || !phone || !DOB || !gender) {
        return res.status(400).json({
          success: false,
          message: "Required fields are missing.",
        });
      }
  
      await userModel.findByIdAndUpdate(userId, {
        name,
        phone,
        address: JSON.parse(address),
        DOB,
        gender,
      });
  
      if (imageFile) {
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
          resource_type: "image",
         
        });
  
       
        console.log("image updated")
        await userModel.findByIdAndUpdate(userId, { image: imageUpload.secure_url });
        console.log("image updated")
      }
  
      return res.status(200).json({
        success: true,
        message: "User profile updated successfully.",
      });
    } catch (error) {
      console.error("Error in updateProfile:", error);
      return res.status(500).json({
        success: false,
        message: "An error occurred while updating the profile.",
        error: error.message,
      });
    }
};



// const bookAppointment = async (req, res) => {
//     try {
//         const { userId, id: docId, slotDate, slotTime } = req.body;

//         console.log("Slot Date:", slotDate);
//         console.log("Slot Time:", slotTime);

//         // Fetch doctor data
//         const docData = await doctorModel.findById(docId).select("-password");

//         if (!docData) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Doctor not found",
//             });
//         }

//         if (!docData.available) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Doctor not available",
//             });
//         }

//         // Check and update slots
//         let slots_booked = docData.slots_booked

//         // if (slots_booked[slotDate]?.includes(slotTime)) {
//         //     return res.status(400).json({
//         //         success: false,
//         //         message: "Slot already booked",
//         //     });
//         // }

//         if(slots_booked[slotDate]){
//             if(slots_booked[slotDate].includes(slotTime)){
//                 return res.status(400).json({
//                             success: false,
//                             message: "Slot already booked",
//                         });
//             }else{
//                 slots_booked[slotDate].push(slotTime);

//             }
//         }else{
//             slots_booked[slotDate]=[]
//             slots_booked[slotDate].push(slotTime)
//         }


        
//         //slots_booked[slotDate].push(slotTime);

//         // Fetch user data
//         const userData = await userModel.findById(userId).select("-password");
//         if (!userData) {
//             return res.status(404).json({
//                 success: false,
//                 message: "User not found",
//             });
//         }

//         delete docData.slots_booked

//         // Prepare appointment data
//         const appointmentData = {
//             userId,
//             docId,
//             userData,
//             docData,
//             amount: docData.fees,
//             slotTime,
//             slotDate,
//             date: Date.now(),
//         };

//         // Save the appointment
//         const newAppointment = new appointmentModel(appointmentData);
//         await newAppointment.save();

//         // Update doctor slots
//         await doctorModel.findByIdAndUpdate(docId, { slots_booked });

//         res.status(201).json({
//             success: true,
//             message: "Appointment booked successfully",
//         });
//     } catch (e) {
//         console.error("Error in booking appointment:", e);
//         res.status(500).json({
//             success: false,
//             message: e.message || "Internal Server Error",
//         });
//     }
// };


// const bookAppointment = async (req, res) => {
//     try {
//         const { userId, id: docId, slotDate, slotTime } = req.body;

//         console.log("Slot Date:", slotDate);
//         console.log("Slot Time:", slotTime);

//         // Fetch doctor data
//         const docData = await doctorModel.findById(docId).select("-password");

//         if (!docData) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Doctor not found",
//             });
//         }

//         if (!docData.available) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Doctor not available",
//             });
//         }

//         // Ensure slots_booked[slotDate] is initialized as an array
//         if (!docData.slots_booked[slotDate]) {
//             docData.slots_booked[slotDate] = [];
//         }

//         // Prevent slot duplication
//         if (docData.slots_booked[slotDate].includes(slotTime)) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Slot already booked",
//             });
//         } else {
//             docData.slots_booked[slotDate].push(slotTime);
//         }

//         // Fetch user data
//         const userData = await userModel.findById(userId).select("-password");

//         if (!userData) {
//             return res.status(404).json({
//                 success: false,
//                 message: "User not found",
//             });
//         }

//         delete docData.slots_booked;

//         // Prepare appointment data
//         const appointmentData = {
//             userId,
//             docId,
//             userData,
//             docData,
//             amount: docData.fees,
//             slotTime,
//             slotDate,
//             date: Date.now(),
//         };

//         // Save the appointment
//         const newAppointment = new appointmentModel(appointmentData);
//         await newAppointment.save();

//         // Update doctor slots
//         await doctorModel.findByIdAndUpdate(docId, 
//             { slots_booked: docData.slots_booked }
//         );

//         res.status(201).json({
//             success: true,
//             message: "Appointment booked successfully",
//         });
//     } catch (e) {
//         console.error("Error in booking appointment:", e);
//         res.status(500).json({
//             success: false,
//             message: e.message || "Internal Server Error",
//         });
//     }
// };

// const bookAppointment = async (req, res) => {
//     try {
//         const { userId, id: docId, slotDate, slotTime } = req.body;

//         // Fetch doctor data
//         const docData = await doctorModel.findById(docId).select("-password");
//         console.log(docData)

//         if (!docData) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Doctor not found",
//             });
//         }

//         if (!docData.available) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Doctor not available",
//             });
//         }

//         let slots_booked=docData.slots_booked

//         if(slots_booked[slotDate]){
//             if(slots_booked[slotDate].includes(slotTime)){
//                 return res.status(400).json({ // Use 400 for client error
//                     success: false,
//                     message: "Slot already booked",
//                 });
//             }else{
//                 slots_booked[slotDate].push(slotTime)
//             }
//         }else{
//             slots_booked[slotDate]=[]
//             slots_booked[slotDate].push(slotTime)
//         }
//         const userData=await userModel.findById(userId).select('-password')
//         delete docData.slots_booked

//         const appointmentData={
//             userId,
//             docId,
//             userData,
//             docData,
//             amount:docData.fees,
//             slotTime,
//             slotDate,
//             date:Date.now()
//         }
//         const newAppointment=new appointmentModel(appointmentData)
//         await newAppointment.save()

//         await doctorModel.findByIdAndUpdate(docId,{slots_booked})


//         res.status(201).json({
//             success: true,
//             message: "Appointment booked successfully",
//         });
//     } catch (e) {
//         console.error("Error in booking appointment:", e);
//         res.status(500).json({
//             success: false,
//             message: e.message || "Internal Server Error",
//         });
//     }
// };

const bookAppointment = async (req, res) => {
    try {
        const { userId, id: docId, slotDate, slotTime } = req.body;

        // Fetch doctor data
        const docData = await doctorModel.findById(docId).select("-password");

        if (!docData) {
            return res.status(404).json({
                success: false,
                message: "Doctor not found",
            });
        }

        if (!docData.available) {
            return res.status(404).json({
                success: false,
                message: "Doctor not available",
            });
        }

        let slots_booked = docData.slots_booked;

        console.log("Checking slots for date:", slotDate);
        console.log("Slots booked on this date:", slots_booked[slotDate]);

        // Check if the slot is already booked
        if (slots_booked[slotDate] && slots_booked[slotDate].includes(slotTime)) {
            console.log("Slot is already booked");
            
            return res.status(400).json({
                success: false,
                message: "Slot already booked",
            });
        }

        // Add the slot to the doctor's slots_booked data
        if (slots_booked[slotDate]) {
            slots_booked[slotDate].push(slotTime);
        } else {
            slots_booked[slotDate] = [slotTime];
        }

        const userData = await userModel.findById(userId).select("-password");
        delete docData.slots_booked;

        const appointmentData = {
            userId,
            docId,
            userData,
            docData,
            amount: docData.fees,
            slotTime,
            slotDate,
            date: Date.now(),
        };
        const newAppointment = new appointmentModel(appointmentData);
        await newAppointment.save();

        await doctorModel.findByIdAndUpdate(docId, { slots_booked });

        res.status(201).json({
            success: true,
            message: "Appointment booked successfully",
        });
    } catch (e) {
        console.error("Error in booking appointment:", e); // Log the full error
        res.status(500).json({
            success: false,
            message: e.message || "Internal Server Error",
        });
    }
};


const listAppointment= async(req,res) =>{
    try{
        const {userId} =req.body;
        const appointments=await appointmentModel.find({userId})

        res.json({
            success:true,
            appointments
        })
    }catch(e){
        console.log(e)
        res.json({
            success:false,
            message:e.message
        })
    }
}


export { registerUser,loginUser,getProfile,updateProfile ,bookAppointment,listAppointment};
