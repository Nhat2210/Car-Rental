import jwt from 'jsonwebtoken'
import User from '../models/User.js';


export const protect = async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.json({ success: false, message: "not authorized" })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const userId = decoded.id
        await User.findById(userId)

        if (!userId) {
            return res.json({ success: false, message: "not authorized" })
        }

        req.user = await User.findById(userId).select("-password")
        next();
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })

    }
}