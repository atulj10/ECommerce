import  express  from "express";
import {forgotPasswordController, getAllOrdersController, getOrdersController, loginController, orderStatusController, registerController, testController, updateUserController} from "../controllers/authController.js"
import { isAdmin, requireSigIn } from "../middlewares/authMiddleware.js";

//Router Object
const router=express.Router()

//Routing
//Register || Method POST
router.post('/register',registerController)

//Login || Method POST
router.post('/login',loginController)

//Forget Password || POST
router.post('/forgot-password',forgotPasswordController)

//test routes 
router.get('/test',requireSigIn,isAdmin,testController)

//protected user rote auth
router.get('/user-auth',requireSigIn,(req,res)=>{
    res.status(200).send({ok:true})
})

//Admin protected Route
router.get('/admin-auth',requireSigIn,isAdmin,(req,res)=>{
    res.status(200).send({ok:true})
})

//Updating the user
router.put('/profile',requireSigIn,updateUserController)

//orders to be viewed
router.get('/orders',requireSigIn,getOrdersController)

//All orders to be viewed
router.get('/all-orders',requireSigIn,isAdmin,getAllOrdersController)

//order's status to be updated
router.put('/order-status/:orderId',requireSigIn,isAdmin,orderStatusController)

export default router;