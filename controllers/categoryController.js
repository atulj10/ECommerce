import slugify from "slugify"
import CategoryModel from "../models/CategoryModel.js"


//Create Category Controller
export const createCategoryController = async (req, res) => {
    try {
        const { name } = req.body

        if (!name) {
            return res.status(401).send({
                message: "Name is required"
            })
        }

        const existingCategory = await CategoryModel.findOne({ name })

        if (existingCategory) {
            return res.status(200).send({
                success: true,
                message: "Category Already Exists"
            })
        }

        const category = await new CategoryModel({ name, slug: slugify(name) }).save()
        res.status(201).send({
            success: true,
            message: "Category created",
            category
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: "Error in catgeory"
        })
    }
}

//Update catgeory
export const updateCategoryController = async (req, res) => {
    try {

        const { name } = req.body
        const { id } = req.params
        const category = await CategoryModel.findByIdAndUpdate(id, { name, slug: slugify(name) }, { new: true })
        res.status(200).send({
            success: true,
            message: "Category Updated Successfully",
            category
        })
    } catch (error) {
        console.log(error);
        res.send(500).send({
            success: false,
            error,
            message: "Error while updating category"
        })
    }
}

//Get all category
export const allCategoryController = async (req, res) => {
    try {

        const category = await CategoryModel.find({})
        res.status(200).send({
            success: true,
            message: "All Categories List",
            category
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: "Couldn't fetched the Categories"
        })
    }
}

//single Category Controller
export const singleCategoryController = async (req, res) => {
    try {
        const category = await CategoryModel.findOne({ slug: req.params.slug })
        res.status(200).send({
            success: true,
            message: "Got the single category",
            category
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: "Error while getting single category"
        })
    }
}

//Delete a category
export const deleteCategoryController = async (req, res) => {
    try {
        const { id } = req.params
        await CategoryModel.findByIdAndDelete(id)
        res.status(200).send({
            success: true,
            message: "Successfully deleted the category"
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: "Couldn't Delete the Category"
        })
    }
}