import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: [8, "Password must be atleast 8 characters long"],
        select: false
    },
    avatar: {
        public_id: String,
        url: String
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    tasks: [{
        title: String,
        description: String,
        completed: Boolean,
        createdAt: Date
    }],
    verified: {
        type: Boolean,
        default: false
    },
    otp: Number,
    otpExpiry: Date,
    resetPasswordOtp: Number,
    resetPasswordOtpExpiry: Date
});

 userSchema.pre("save", async function (next) {
     if(!this.isModified("password"))
         return next();

     const salt = await bcrypt.genSaltSync(10);
     const hashedPassword = await bcrypt.hash(this.password, salt);
     this.password = hashedPassword;
     next();
 })

userSchema.methods.getJWTToken = function() {
    const token = jwt.sign({_id: this._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_COOKIE_EXPIRE*24*60*60*1000
    });
    return token;
}

userSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compareSync(password, this.password);
}

userSchema.index({otpExpiry: 1}, {expireAfterSeconds: 0});

export const Users = mongoose.model("Users", userSchema);