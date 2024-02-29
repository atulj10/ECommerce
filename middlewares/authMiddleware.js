import JWT from "jsonwebtoken"
import userModel from "../models/userModel.js";

export const requireSigIn = async (req, res, next) => {
    try {
        const decode = JWT.verify(req.headers.authorization, process.env.JWT_SECRET)
        req.user = decode
        next()
    } catch (error) {
        console.log(error);
    }
}

//Admin Access
export const isAdmin = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.user._id)

        if (!user.role) {
            return res.status(401).send({
                success: false,
                messgae: "Unauthorised Access"
            })
        }
        else {
            next()
        }
    } catch (error) {
        console.log(error);
        res.status(401).send({
            success: false,
            error,
            messgae: "error in Admin middleware"
        })
    }
}