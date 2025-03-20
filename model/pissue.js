import mongoose from "mongoose";

const issueSchema = new mongoose.Schema({
  title: String,
  description: String,
  ward: String,
  upvotes: { type: Number, default: 0 },  // Upvotes field
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },  // Reference to User model
});

const Issue = mongoose.model("Issue", issueSchema);
export default Issue;
