
import jwt from 'jsonwebtoken';

const authadmin = async (req, res, next) => {
    try {
        const { atoken } = req.headers;
        if (!atoken) {
            console.log("No token found in request headers");
            return res.json({
                success: false,
                message: "NOT Authorized"
            });
        }
        
        console.log("Authorization Header:", req.headers.authorization);
        console.log("Extracted Token:", atoken);

        const token_decode = jwt.verify(atoken, process.env.JWT_SECRET);
        console.log("Decoded Token:", token_decode);

        if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
            console.log("Decoded Token:", token_decode);
            console.log("Expected Token:", process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD);
            return res.status(400).json({
                success: false,
                message: "NOT Authorized"
            });
        }

        next();
    } catch (e) {
        console.log("Error in authadmin middleware:", e);
        return res.status(400).json({
            success: false,
            message: e.message
        });
    }
};

export default authadmin;
