import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
	try {
		// Extract the token from custom header "token"
		const token = req.headers.token;

		// Ensure the token is present
		if (!token || typeof token !== "string") {
			console.log("Token header missing or invalid");
			return res.status(401).json({
				success: false,
				message: "Authorization token is missing or invalid",
			});
		}

		// Verify the token
		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		// Attach user ID to the request object
		req.body.userId = decoded.id;

		next(); // Proceed to the next middleware or route handler
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

