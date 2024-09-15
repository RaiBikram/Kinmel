import mongoose,{ Schema, model } from "mongoose";

const productSchema = new Schema ({
    name:{
        type:String,
        require:true,
    },

    // slug to make seo friendly 
    slug:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    category:{
        type:mongoose.ObjectId,
        ref:"Category",
        required:true,
    },
    quantity:{
        type:Number,
        required:true,
    },
    photo:{
        data:Buffer,
        contentType:String,
    },
    shipping:{
        type:Boolean,
        required:true

    }
},{timestamps:true}
);



const Product = model("Product", productSchema);


export default Product;