
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
        
        
        const token_decode = jwt.verify(atoken, process.env.JWT_SECRET);
      

        if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
           
            console.log("Expected Token:", process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD);
            return res.status(400).json({
                success: false,
                message: "NOT Authorized"
            });
        }

        next();
    } catch (e) {
        
        return res.status(400).json({
            success: false,
            message: e.message
        });
    }
};

export default authadmin;

