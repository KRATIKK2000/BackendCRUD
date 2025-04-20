let mongoose= require("mongoose");


let userEnquireSchema= mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true,
        unique:true
    },  
     phone:{
        type:String,
        required: true
    }, 
    message:{
        type:String,
        required: true
    },

})

let enquiryModel= new mongoose.model("enquiry",userEnquireSchema);
module.exports=enquiryModel;