import mongoose from 'mongoose'
import Comment from "../models/Comment"

const _repository = mongoose.model('Comment', Comment)

class CommentsService {
  async createComment(data) {
    let comment = await _repository.create(data)
    return comment
  }
  async getCommentsByTask(id) {
    let data = await _repository.find({ taskId: id })
    return data
  }
  async deleteComment(id) {
    await _repository.findOneAndRemove({ _id: id })
  }
}


const _commentService = new CommentsService()
export default _commentService