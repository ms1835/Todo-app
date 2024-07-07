export const sendToken = (res, user, statusCode, message) => {
    const userData = {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        tasks: user.tasks,
        verified: user.verified
    }

    const options = {
        httpOnly: true,
        expires: new Date(Date.now()+process.env.JWT_COOKIE_EXPIRE*24*60*60*1000)
    }
    const token = user.getJWTToken();
    
    res.status(statusCode).cookie("token", token, options).json({success: true, user: userData, message});
}