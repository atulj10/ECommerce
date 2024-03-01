import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import cors from "cors"
import categoryRoutes from './routes/categoryRoutes.js'
import productRoutes from './routes/productRoutes.js'
import path from "path"
import {fileURLToPath} from 'url'
//For the import of the connectDB function we have use the extension
//along with the name of the file if we're using the import i.e. ES6 module

dotenv.config();//Configuring the env file

connectDB()//For establishing the connection between the database and the sever
//Es6 fix
const __filename=fileURLToPath(import.meta.url)
const __dirname=path.dirname(__filename)

const app = express()//Making the instance of express
const port = process.env.PORT//Decalaring the port to be used as the server

//MiddleWare
app.use(cors())//This is used inorder to prevent any cross origin clashes
app.use(express.json())//For parsing the json format data 
app.use(morgan("dev"))//For the handeling the API requests
app.use(express.static(path.join(__dirname,'./client/build')))


app.use("/api/v1/auth", authRoutes)//For handeling the authentication
app.use("/api/v1/category", categoryRoutes)//For handeling the category functions
app.use("/api/v1/product", productRoutes)//For handeling product related requests

//Rest APIs
app.use("*",function(req,res){
    res.sendFile(path.join(__dirname,'./client/build/index.html'))
})



//Listening to the port of the server
app.listen(port, () => {
    console.log(`Server running on Port:${port}`.bgBlue.white)
})
