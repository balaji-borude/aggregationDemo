import mongoose from "mongoose";

const connect = async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        .then(()=>console.log("Mongodb connected succesfully "))
    } catch (error) {
        console.log("error in DB Connection")
    }
}

export default connect;