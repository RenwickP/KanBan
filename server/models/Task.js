import mongoose from "mongoose"
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

const Task = new Schema({
  description: { type: String, required: true },
  listId: { type: ObjectId, ref: 'List', required: true },
  authorId: { type: ObjectId, ref: 'User', required: true },
  boardId: { type: ObjectId, ref: 'Board', required: true },
  comments: { type: Array }
}, { timestamps: true })

export default Task