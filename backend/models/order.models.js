import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    products: [
      {
        type: mongoose.ObjectId,
        ref: "Product",
      },
    ],
    payment:{

    },
    byer:{
        type:mongoose.ObjectId,
        ref:"User",
    },
    status:{
        type:String,
        default:"Not process",
        enum:["Not Process", "Processing", "shipped", "deliverd", "cancel"],
    }
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);


 export default Order;