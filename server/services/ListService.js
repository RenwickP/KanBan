import mongoose from 'mongoose'
import List from "../models/List"

const _repository = mongoose.model('List', List)

class ListService {
  async createList(data) {
    let list = await _repository.create(data)
    return list
  }
  async getListsByBoardId(id) {
    let data = await _repository.find({ boardId: id })
    return data
  }
  async deleteList(id) {
    await _repository.findOneAndRemove({ _id: id })
  }
}


const _listService = new ListService()
export default _listService