import mongoose from "mongoose";

const indexStatusSchema = new mongoose.Schema({
    videoId: { type: String, lowercase: true, unique: true, required: true },
    status: { type: String, enum: ["CREATED", "COMPLETED", "FAILED"], required: true },
}, { collection: "IndexStatuses" });

export default mongoose.model("indexstatus", indexStatusSchema);