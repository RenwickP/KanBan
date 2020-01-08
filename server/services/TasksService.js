import mongoose from 'mongoose'
import Task from "../models/Task"

const _repository = mongoose.model('Task', Task)

class TasksService {
  async createTask(data) {
    let task = await _repository.create(data)
    return task
  }

  // async getTasksByBoardId(id) {
  //   let data = await _repository.find({ boardId: id })
  //   return data
  // }
  // async deleteTask(id) {
  //   await _repository.findOneAndRemove({ _id: id })
  // }
}


const _tasksService = new TasksService()
export default _tasksService