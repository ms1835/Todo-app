import { Users } from "../models/User.js";
import { sendMail } from "../utils.js/sendMail.js";
import { sendToken } from "../utils.js/sendToken.js";
import cloudinary from "cloudinary";
import fs from "fs";

export const register = async(req, res) => {
    try{
        const{ name, email, password} = req.body;
         const avatar = req.files.avatar.tempFilePath;
         let user = await Users.findOne({email});
         if(user){
             return res.status(409).json({success: false, message: "User already exists."});
         }
         const cloud = await cloudinary.v2.uploader.upload(avatar, {
                folder: "TodoApp/Avatars",
                width: 150,
                crop: "scale"
         });
        fs.rmSync("./tmp", {recursive: true});
        const otp = Math.floor(Math.random() * 1000000);
        user = await Users.create({
            name,
            email,
            password,
            avatar: {
                public_id: cloud.public_id,
                url: cloud.secure_url
            },
            otp,
            otpExpiry: new Date(Date.now() + process.env.OTP_EXPIRE*60*1000)
        });
        await sendMail(
            email,
            "Verify your account", `Your otp is ${otp}`
        );
        sendToken(
            res,
            user,
            201,
            "OTP sent to your email, Please verify your account"
        );
    } catch(err) {
        console.log(err);
        res.status(500).json({success: false, message: err.message});
    }
}


export const verify = async(req, res) => {
    try {
        const otp = Number(req.body.otp);
        const user = await Users.findById(req.user._id);
        if(!user){
            return res.status(404).json({success: false, message: "User not found"});
        }
        if(user.otp !== otp || user.otpExpiry < new Date()){
            return res.status(400).json({success: false, message: "Invalid OTP"});
        }
        user.verified = true;
        user.otp = null;
        user.otpExpiry = null;

        await user.save();
        sendToken(res, user, 200, "Account verified successfully")
    } catch(err) {
        res.status(500).json({success: false, message: err.message});
    }
}

export const login = async(req, res) => {
    try{
        const {email, password} = req.body;

        let user = await Users.findOne({email}).select("+password");
        if(!email || !password){
            return res.status(400).json({success: false, message: "Please provide email and password."});
        }
         if(!user){
             return res.status(400).json({success: false, message: "Invalid email or password."});
         }
         const isMatch = await user.comparePassword(password);
         if(!isMatch){
             return res.status(400).json({success: false, message: "Invalid email or password."});
         }
        sendToken(
            res,
            user,
            200,
            "Login Successful"
        );
    } catch(err) {
        console.log(err);
        res.status(500).json({success: false, message: err.message});
    }
}


export const logout = async(req, res) => {
    try{
        res
            .status(200)
            .cookie("token", null, {
                expires: new Date(Date.now()),
                httpOnly: true
            })
                .json({success: true, message: "Logged out successfully"});
    } catch(err) {
        console.log(err);
        res.status(500).json({success: false, message: err.message});
    }
}

export const addTask = async(req, res) => {
    try{
        const { title, description } = req.body;
        const user = await Users.findById(req.user._id);
        if(!user){
            return res.status(404).json({success: false, message: "User not found"});
        }
        user.tasks.push({
            title,
            description,
            completed: false,
            createdAt: new Date(Date.now())
        });
        await user.save();
        res.status(200).json({success: true, message: "Task added successfully"});
    } catch(err) {
        console.log(err);
        res.status(500).json({success: false, message: err.message});
    }
}

export const removeTask = async(req, res) => {
    try{
        const { taskId } = req.params;
        const user = await Users.findById(req.user._id);
        if(!user){
            return res.status(404).json({success: false, message: "User not found"});
        }
        user.tasks = user.tasks.filter(task => task._id.toString() != taskId.toString());
        await user.save();
        res.status(200).json({success: true, message: "Task removed successfully"});
    } catch(err) {
        console.log(err);
        res.status(500).json({success: false, message: err.message});
    }
}

export const updateTask = async(req, res) => {
    try{
        const { taskId } = req.params;
//        const { title, description, completed } = req.body;
        const user = await Users.findById(req.user._id);
        if(!user){
            return res.status(404).json({success: false, message: "User not found"});
        }
        user.task = user.tasks.find(task =>
            task._id.toString() === taskId.toString()
        );
        user.task.completed = !user.task.completed;
        await user.save();
        res.status(200).json({success: true, message: "Task updated successfully"});
    } catch(err) {
        console.log(err);
        res.status(500).json({success: false, message: err.message});
    }
}

export const getMyProfile = async(req, res) => {
    try{
        const user = await Users.findById(req.user._id);
        if(!user){
            return res.status(404).json({success: false, message: "User not found"});
        }
        sendToken(res, user, 200, "User profile fetched successfully");
    } catch(err) {
        console.log(err);
        res.status(500).json({success: false, message: err.message});
    }
}

export const updateProfile = async(req, res) => {
    try{
        const user = await Users.findById(req.user._id);
        if(!user){
            return res.status(404).json({success: false, message: "User not found"});
        }
        const { name } = req.body;
        const avatar = req.files.avatar.tempFilePath;
        if (name) user.name = name;
        if(avatar){
            await cloudinary.v2.uploader.destroy(user.avatar.public_id);
            const cloud = await cloudinary.v2.uploader.upload(avatar, {
                folder: "TodoApp/Avatars",
                width: 150,
                crop: "scale"
            });
            fs.rmSync("./tmp", {recursive: true});
            user.avatar = {
                public_id: cloud.public_id,
                url: cloud.secure_url
            };
        }
        await user.save();
        res.status(200).json({success: true, message: "Profile updated successfully"});
    } catch(err) {
        console.log(err);
        res.status(500).json({success: false, message: err.message});
    }
}

export const updatePassword = async(req, res) => {
    try{
        const user = await Users.findById(req.user._id).select("+password");
         if(!user){
             return res.status(404).json({success: false, message: "User not found"});
         }
        const { oldPassword, newPassword } = req.body;
        if(!oldPassword || !newPassword){
            return res.status(400).json({success: false, message: "Please provide old password and new password."});
        }
        const isMatch = await user.comparePassword(oldPassword);
        if(!isMatch){
            return res.status(400).json({success: false, message: "Invalid old password"});
        }
        user.password = newPassword;
        await user.save();
        res.status(200).json({success: true, message: "Password updated successfully"});
    } catch(err) {
        console.log(err);
        res.status(500).json({success: false, message: err.message});
    }
}

export const forgotPassword = async(req, res) => {
    try{
        const { email } = req.body;
        const user = await Users.findOne({email});
        if(!user){
            return res.status(404).json({success: false, message: "User not found"});
        }
        const resetPasswordOtp = Math.floor(Math.random() * 1000000);
        user.resetPasswordOtp = resetPasswordOtp;
        user.resetPasswordOtpExpiry = new Date(Date.now() + process.env.OTP_EXPIRE*60*1000);
        await user.save();

        await sendMail(email, "Reset Password", `Your otp is ${resetPasswordOtp}`);

        res.status(200).json({success: true, message: "Reset password otp sent to your email"});
    } catch(err) {
        console.log(err);
        res.status(500).json({success: false, message: err.message});
    }
}

export const resetPassword = async(req, res) => {
    try{
        const { otp, newPassword } = req.body;
        const user = await Users.findOne({
            resetPasswordOtp: otp,
            resetPasswordOtpExpiry: { $gt: new Date()}
        }).select("+password");
        if(!user){
            return res.status(400).json({success: false, message: "Invalid OTP or OTP expired"});
        }
        user.password = newPassword;
        user.resetPasswordOtp = null;
        user.resetPasswordOtpExpiry = null;
        await usr.save();

        res.status(200).json({success: true, message: "Password reset successfully"});
    } catch(err) {
        console.log(err);
        res.status(500).json({success: false, message: err.message});
    }
}