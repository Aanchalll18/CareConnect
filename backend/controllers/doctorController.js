import doctorModel from "../models/doctorModel.js"


const changeAvailablity=async()=>{
  try{
    const {docId}=req.body
    const docData=await doctorModel.findById(docId)
    await doctorModel.findByIdAndUpdate(docId,{available:!docData.available})
    res.json({success:true,message:'Availablity changed'})
  }
  catch(e){
    console.log(e)
    resizeBy.status({
      success:false,
      message:e.message
    })
  }
}
export {changeAvailablity}