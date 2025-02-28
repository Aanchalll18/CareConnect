
import mongoose from "mongoose";

// Define the User schema
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: { type: String, default: "https://static.vecteezy.com/system/resources/previews/009/292/244/original/default-avatar-icon-of-social-media-user-vector.jpg" },
    address: { type: Object, default: { line1: '', line2: '' } },
    gender: { type: String, default: "Not Selected" },
    DOB: { type: String, default: "Not Selected" },
    phone: { type: String, default: '000000000' },
});

// Export the user model
const userModel = mongoose.models.user||mongoose.model('user',userSchema)

export default userModel
