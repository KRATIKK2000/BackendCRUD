let express = require("express");
let mongoose = require("mongoose");
require("dotenv").config();
let enquiryModel=require("./models/enquiry.model")


let app=express();
app.use(express.json())
// app.use(express.urlencoded({extended:true}))


// ccreate data
app.post("/api/enquiry-insert",(req,res)=>{

    let {sName, sEmail, sPhone ,sMessage}=req.body
    let enquiry= new enquiryModel({
        name:sName,
        email:sEmail,
        phone:sPhone,
        message:sMessage
    })
 
    enquiry.save().then(()=>{
        res.send({status:1,message:"Enquiry saved successfully"})
    }).catch((err)=>{
        res.send({status:0 ,message:"err while saving file" ,err:err})
    })
    
})

// read data 
app.get("/api/enquiry-list",async (req,res)=>{
    let enquiryList= await enquiryModel.find()
    res.status(200).json({status:1,message:"enquiry list",data:enquiryList})
})


// delete data 
app.delete("/api/enquiry-delete/:id",async (req,res)=>{
     let enquiryId= req.params.id;
     let deleteEnquiry = await enquiryModel.deleteOne({_id:enquiryId})
    res.send({status:1,message:"enquiry delete successfully",id:enquiryId , delres:deleteEnquiry})

})

// update data
app.put("/api/enquiry-update/:id",async (req,res)=>{
    let enquiryId = req.params.id;
    let {sName, sEmail, sPhone ,sMessage}=req.body
 let updateObj={
    name:sName,
    email:sEmail,
    phone:sPhone,
    message:sMessage
 }
    let updateRes= await enquiryModel.updateOne({_id:enquiryId},updateObj)
    res.send({status:1,message:"enquiry update successfully",id:enquiryId, updateRes})
})


//  connect to mongodb
mongoose.connect(process.env.DBURL).then(()=>{
    console.log("db connected")
    app.listen(process.env.PORT,()=>{
        console.log("server start at port"+process.env.PORT)
    })
})