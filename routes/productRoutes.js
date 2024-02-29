import express from "express"
import { requireSigIn, isAdmin } from '../middlewares/authMiddleware.js'
import { createProductController, deleteProductController, getProductController, getSingleProductController, productCountController, productFilterController, productListController, productPhotoController, relatedProductController, searchProductController, updateProductController, productCategoryController, braintreeTokencontroller, braintreePaymentController } from "../controllers/productController.js"
import formidable from 'express-formidable'

const router = express.Router()

//routes
//Product creation
router.post('/create-product', requireSigIn, isAdmin, formidable(), createProductController)

//Product Updation
router.put('/update-product/:pid', requireSigIn, isAdmin, formidable(), updateProductController)

//Products fetching
router.get('/get-product', getProductController)

//Single Product Fetching
router.get('/get-product/:slug', getSingleProductController)

//Fetching the photo
router.get('/product-photo/:pid', productPhotoController)

//Deleting the Product
router.delete('/delete-product/:id', requireSigIn, isAdmin, deleteProductController)

//Filter Route
router.post('/product-filter', productFilterController)

//product controller
router.get('/product-count', productCountController)

//product per page
router.get('/product-list/:page', productListController)

//search 
router.get('/search/:keyword', searchProductController)

//Similar Product Route
router.get('/related-product/:pid/:cid', relatedProductController)

//Category wise Product
router.get('/product-category/:slug', productCategoryController)

//Payment Routes
//Token
router.get('/braintree/token', braintreeTokencontroller)

//Payment
router.post('/braintree/payment', requireSigIn, braintreePaymentController)

export default router