import jwt from "jsonwebtoken";
import { Users } from "../models/User.js";

export const isAuthenticated = async (req, res, next) => {
    try {
        const {token} = req.cookies;
        if(!token){
            return res.status(401).json({ success: false, message: "User not authenticated"});
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await Users.findById(decoded._id);
        next();

   } catch(err) {
        console.log(err);
        res.status(500).json({ success: false, message: err.message});
   }

}