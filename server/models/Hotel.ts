import mongoose from "mongoose";
// DATABASE FOR HOTEL

const HotelSchema = new mongoose.Schema({

    name:{
        type:String ,
        
       
    } ,
    type:{
        type:String ,
      
       
    } ,
    
         city:{
        type:String ,
     
      
    } ,

    address:{
        type:String ,

    
    } ,
  title:{
        type:String ,

    
    } ,
    distance:{
        type:String ,
       
    } ,

    photos:{
        type:[String] ,
       
    } ,
    desc:{
        type:String ,
        

       
    } ,
    rating:{
        type :Number ,
        min:0 ,
        max :5
    } ,
    rooms:{
        type :[String] ,  
    },
    cheapestPrice:{
        type:Number ,
       
    } ,
    featured :{
        type :Boolean  ,
        default : false ,
    }


});

export default mongoose.model("Hotel" ,HotelSchema)

