import mongoose from "mongoose"

const orderSchema = new mongoose.Schema({
    products: [{
        type: mongoose.ObjectId,
        ref: "Products"
    }],
    payment: {},
    buyer: {
        type: mongoose.ObjectId,
        ref: "user"
    },
    status: {
        type: String,
        default: "Not processed",
        enum: ["Not Processed", "Proccessing", "Shipped", "Delivered", "Cancel"]
    }
}, { timestamps: true })

export default mongoose.model("Order", orderSchema)