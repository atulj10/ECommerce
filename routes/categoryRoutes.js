import express from "express"
import { isAdmin, requireSigIn } from "../middlewares/authMiddleware.js"
import { allCategoryController, createCategoryController, deleteCategoryController, singleCategoryController, updateCategoryController } from "../controllers/categoryController.js"

const router = express.Router()

//Routes

//Create-Category
router.post('/create-category', requireSigIn, isAdmin, createCategoryController)


//Update-Category
router.put('/update-category/:id', requireSigIn, isAdmin, updateCategoryController)

//Get all category
router.get('/get-category', allCategoryController)

//Get single Category
router.get('/single-category/:slug', singleCategoryController)

//delete the category
router.delete('/delete-category/:id', requireSigIn, isAdmin, deleteCategoryController)

export default router