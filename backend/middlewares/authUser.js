
// import jwt from 'jsonwebtoken';

// const authUser = async (req, res, next) => {
//     try {
//         const { token } = req.headers;

//         if (!token) {
//             console.log("No token found in request headers");
//             return res.json({
//                 success: false,
//                 message: "NOT Authorized"
//             });
//         }
        
//         const token_decode = jwt.verify(token, process.env.JWT_SECRET);
      
//         req.body.userId = token_decode._id

//         next();
        
//     } catch (e) {
        
//         return res.status(400).json({
//             success: false,
//             message: e.message
//         });
//     }
// };

// export default authUser;

import jwt from 'jsonwebtoken';

const authUser = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            console.log("Authorization header missing or invalid");
            return res.status(401).json({
                success: false,
                message: "NOT Authorized",
            });
        }

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = { id: decoded._id }; // Attach user ID to req for further use
        next();
    } catch (e) {
        console.log("JWT verification error:", e.message);

        return res.status(400).json({
            success: false,
            message: e.message.includes("jwt expired")
                ? "Session expired, please login again"
                : "Invalid token, authentication failed",
        });
    }
};

export default authUser;
