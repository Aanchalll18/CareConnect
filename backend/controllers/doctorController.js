
import doctorModel from "../models/doctorModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import appointmentModel from "../models/appointmentModel.js";

const changeAvailablity = async (req, res) => {
  try {
    const { docId } = req.body; 
    const docData = await doctorModel.findById(docId); 
    await doctorModel.findByIdAndUpdate(docId, { available: !docData.available }); 
    console.log(docData)
    res.status(200).json({ success: true, message: "Availability changed" }); 
  } catch (e) {
    console.error(e); 
    res.status(500).json({ success: false, message: e.message }); 
  }
};

const doctorList=async(req,res)=>{
  try{
      const doctors=await doctorModel.find({}).select("-password -email")
      res.json({success:true,doctors})
     }
  catch(e){
    console.log(e)
    res.json({success:false,message:e.message})
  }
};

const logindoctor = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    
    const doctor = await doctorModel.findOne({ email }); 
    if (!doctor) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials.",
      });
    }

    
    const isMatch = await bcrypt.compare(password, doctor.password);
    if (isMatch) {
      
      const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET, {
        expiresIn: "1d", 
      });

      return res.status(200).json({
        success: true,
        message: "Login successful.",
        token,
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials.",
      });
    }
  } catch (error) {
    console.error("Error in logindoctor:", error);
    return res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
};

const docappointment=async(req,res)=>{
  try {
    const {docId}=req.body;
    const appointments=await appointmentModel.find({docId})
    res.json({success:true,appointments})
  } catch (error) {
    console.log(error)
    res.json({success:false,message:error.message})
  }
};

const appointmentComplete=async(req,res)=>{
    try{
        const {docId,appointmentId}=req.body
        const appointmentData=await appointmentModel.findById(appointmentId)

        if(appointmentData && appointmentData.docId === docId){
          await appointmentModel.findByIdAndUpdate(appointmentId,{isCompleted:true})

           return res.json({
            success:true,
            message:'Appointment Completed'
          })
        }else{
          return res.json({
            success:false,
            message:'error while completing the appointment'
          })
        }
    }
    catch(e){
     return res.json({
        success:false,
        message:e.message
      })
    }
};

const appointmentCancel=async(req,res)=>{
  try{
      const {docId,appointmentId}=req.body
      const appointmentData=await appointmentModel.findById(appointmentId)

      if(appointmentData && appointmentData.docId === docId){
        await appointmentModel.findByIdAndUpdate(appointmentId,{cancelled:true})

         return res.json({
          success:true,
          message:'Appointment Cancelled'
        })
      }else{
        return res.json({
          success:false,
          message:'error while cancelling the appointment'
        })
      }
  }
  catch(e){
   return res.json({
      success:false,
      message:e.message
    })
  }
};

const docDashboars = async (req, res) => {
  try {
    const { docId } = req.body; 
    const appointments = await appointmentModel.find({ docId }); 

    let earnings = 0;

    appointments.map((item) => {
      if (item.isCompleted || item.payment) {
        earnings += item.amount; 
      }
    });

    let patients = [];
    appointments.map((item) => {
      if (!patients.includes(item.userId)) {
        patients.push(item.userId); 
      }
    });

    const dashData = {
      earnings,
      appointments: appointments.length,
      patients: patients.length,
      latestAppointments: appointments.reverse().slice(0, 5),
    };

    res.json({
      success: true,
      dashData, 
    });
  } catch (error) {
    console.log(error); 
    res.json({
      success: false,
      message: error.message, 
    });
  }
};

const doctorProfile=async(req,res)=>{
try {
  const {docId}=req.body
  const profileData=await doctorModel.findById(docId).select('-password')

  res.json({
    success:true,
    profileData
  })
} catch (error) {
  console.log(error)
  res.json({
    success:false,
    message:error.message
  })
}
}

export { changeAvailablity ,doctorList,logindoctor,docappointment,appointmentComplete,appointmentCancel,docDashboars}
