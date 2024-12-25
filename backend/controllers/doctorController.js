import React from "react";
import doctorModel from "../models/doctorModel.js";

const changeAvailablity=async (requestAnimationFrame,res)=>{
  try{
    const {docId}= req.body
    await doctorModel.findByIdAndUpdate(docId,{available:!docData.available})
    res.json({
      success:true,
      message:'Availability Updated'
    })
  }
  catch(e){
    console.log(e);
    res.json({
      success:false,
      message:e.message
    })
  }
}

export {changeAvailablity}