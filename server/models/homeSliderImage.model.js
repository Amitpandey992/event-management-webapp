import mongoose from "mongoose";

const homeSliderImageSchema = new mongoose.Schema({
     image:{
        type:Object,
        default:{
          fileId:'',
          url:"https://images.unsplash.com/photo-1682685797406-97f364419b4a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxNnx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=60"
        },
      },
    createdAt: { type: Date, default: Date.now },
})

export default mongoose.model("homeSliderImageModel", homeSliderImageSchema);