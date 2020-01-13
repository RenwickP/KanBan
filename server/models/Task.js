import mongoose from "mongoose"
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

// const Comment = new Schema({
//   content: { type: String, required: true },
//   authorId: { type: ObjectId, ref: 'User', required: true },
// }, { timestamps: true, toJSON: { virtuals: true } })

const Task = new Schema({
  description: { type: String, required: true },
  listId: { type: ObjectId, ref: 'List', required: true },
  authorId: { type: ObjectId, ref: 'User', required: true },
  boardId: { type: ObjectId, ref: 'Board', required: true },
  // comments: [Comment]
}, { timestamps: true, toJSON: { virtuals: true } })

export default Task