import { MdCheck } from "react-icons/md"
import { comparePassword, hashPassword } from "../helpers/authHelper.js"
import userModel from "../models/userModel.js"
import JWT from "jsonwebtoken"
import OrderModel from '../models/OrderModel.js'

export const registerController = async (req, res) => {
    try {
        //Parsing the inputed details of the users
        const { name, email, password, phone, address, question } = req.body

        //Error Handeling for missing data
        //Validation
        if (!name) {
            return res.send({ message: "Name is required" })
        }
        if (!email) {
            return res.send({ message: "Email is required" })
        }
        if (!password) {
            return res.send({ message: "Password is required" })
        }
        if (!phone) {
            return res.send({ message: "Phone is required" })
        }
        if (!address) {
            return res.send({ message: "Adress is required" })
        }
        if (!question) {
            return res.send({ message: "Question is required" })
        }

        //Checking of existing user on basis of email
        const existingUser = await userModel.findOne({ email })

        //Handeling if User exists
        if (existingUser) {
            return res.status(200).send({
                success: false,
                message: "Already Registered please login"
            })
        }

        //hashing the password for storing it in database
        const hashedPassword = await hashPassword(password)

        //creating new user with the predefined userSchema and required data along with hashed password
        const user = await new userModel({ name, email, phone, address, password: hashedPassword, question }).save()

        res.status(201).send({
            success: true,
            message: "User Registered Successfully",
            user
        })
    }
    catch (err) {
        console.log(err)

        //Error handeling for the client side
        res.status(500).send({
            success: false,
            message: "Error in Registration",
            err
        })
    }
}

//Function for the login post
export const loginController = async (req, res) => {

    try {
        //Destructring of the fetched data
        const { email, password } = req.body

        //Validation
        if (!email || !password) {
            return res.status(400).send({
                success: false,
                message: "Inavalid Email or Password"
            })
        }

        //Getting the user
        const user = await userModel.findOne({ email })

        //Validation
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User not registered"
            })
        }

        //Matching the password
        const match = await comparePassword(password, user.password)

        //Validation
        if (!match) {
            return res.status(200).send({
                success: false,
                message: "Invalid Password"
            })
        }

        //token
        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });

        res.status(200).send({
            success: true,
            message: "Login Successful",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role: user.role
            },
            token
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in login",
            error
        })
    }

}

//forgot password

export const forgotPasswordController = async (req, res) => {
    try {
        const { email, question, newPassword } = req.body

        //validation
        if (!email) {
            res.status(400).send({ message: "Email is required" })
        }
        if (!question) {
            res.status(400).send({ message: "Question is required" })
        }
        if (!newPassword) {
            res.status(400).send({ message: "New Password is required" })
        }

        //checking
        const user = await userModel.findOne({ email, question })

        //validation
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Wrong Email Or Answer"
            })
        }

        const hashed = await hashPassword(newPassword)
        await userModel.findByIdAndUpdate(user._id, { password: hashed })
        res.status(200).send({
            success: true,
            message: "Password Reset Successfully"
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Something went wrong",
            error
        })
    }
}

//Update the user
export const updateUserController = async (req, res) => {
    try {

        const { name,
            email,
            password,
            phone,
            address, } = req.body
        const user = await userModel.findById(req.user._id)
        //password
        if (password && password.length < 6) {
            return res.json({ error: "Require password and 6 character long" })
        }

        const hashedPassword = password ? await hashPassword(password) : undefined

        const updateUser = await userModel.findByIdAndUpdate(req.user._id, { name: name || user.name, password: hashedPassword || user.password, phone: phone || user.phone, address: address || user.address }, { new: true })

        res.status(200).send({
            success: true,
            message: "Updated successfully",
            updateUser
        })
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success: false,
            message: "Error in Updating the user",
            error
        })
    }
}

//Orders
export const getOrdersController = async (req, res) => {
    try {
        const orders = await OrderModel.find({ buyer: req.user._id }).populate("products", "-photo").populate("buyers", "name")
        res.json(orders)

    } catch (error) {
        console.log(error)
        res.status(400).send({
            success: false,
            message: "Error in fetching the orders"
        })
    }
}

//Orders
export const getAllOrdersController = async (req, res) => {
    try {
        const orders = await OrderModel.find({}).populate("products", "-photo").populate("buyers", "name").sort({ createdAt: "-1" })
        res.json(orders)

    } catch (error) {
        console.log(error)
        res.status(400).send({
            success: false,
            message: "Error in fetching all orders"
        })
    }
}

//Updating the status of the order purchased by the user
export const orderStatusController = async (req, res) => {
    try {

      const {orderId}=req.params
      const {status}=req.body
      const orders=await OrderModel.findByIdAndUpdate(orderId,{status},{new:true})
      res.json(orders)

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in Updating the orders"
        })
    }
}

//Test
export const testController = (req, res) => {
    res.send("Protected Route")
}
