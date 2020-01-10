import mongoose from "mongoose"
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

const Comment = new Schema({
  content: { type: String, required: true },
  taskId: { type: ObjectId, ref: 'Task', required: true },
  authorId: { type: ObjectId, ref: 'User', required: true },
}, { timestamps: true, toJSON: { virtuals: true } })

export default Comment