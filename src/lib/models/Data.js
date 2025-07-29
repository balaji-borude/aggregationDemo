import mongoose from "mongoose";

const dataSchema = new mongoose.Schema({
  name: String,
  description: String,
  published_date: Date,
  phone: String
})

// const Data  =mongoose.model("Data",dataSchema);
export default mongoose.models.Data || mongoose.model("Data", dataSchema);