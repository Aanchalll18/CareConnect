import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
    try {
       
        const token = req.headers.token;
        if (!token || typeof token !== "string") {
            console.log("Token header missing or invalid");
            return res.status(401).json({
                success: false,
                message: "Authorization token is missing or invalid",
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.body.userId = decoded.id;

        next(); 
    } catch (error) {
        console.error("JWT verification error:", error.message);

        return res.status(401).json({
            success: false,
            message: error.message.includes("jwt expired")
                ? "Session expired, please login again"
                : "Invalid token, authentication failed",
        });
    }
};

export default authUser;

