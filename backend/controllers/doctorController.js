
import doctorModel from "../models/doctorModel.js";

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

export { changeAvailablity };
