
import jwt from 'jsonwebtoken';

const authUser = async (req, res, next) => {
    try {
        const { token } = req.headers;

        if (!token) {
            console.log("No token found in request headers");
            return res.json({
                success: false,
                message: "NOT Authorized"
            });
        }
        
        
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
      
        req.body.userId = token_decode._id

        next();
        
    } catch (e) {
        
        return res.status(400).json({
            success: false,
            message: e.message
        });
    }
};

export default authUser;

