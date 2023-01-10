import mongoose from "mongoose";

//here give validation
const productSchema = new mongoose.Schema({
    //here use the Object remove duplicasy in DB
    id: {
        type: String, 
        required: true,
        unique: true
    }, 
    url: String,
    detailUrl: String,
    title: Object,
    price: Object,
    quantity: Number,
    description: String,
    discount: String,
    tagline: String
});

//here give collection name and schema 
const Product = mongoose.model("product", productSchema);

export default Product;