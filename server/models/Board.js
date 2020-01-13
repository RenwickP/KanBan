import mongoose from "mongoose"
import List from "./List"
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

const _listRepository = mongoose.model('List', List)

const Board = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  authorId: { type: ObjectId, ref: 'User', required: true }
}, { timestamps: true })

//CASCADE ON DELETE
Board.pre('findOneAndRemove', function (next) {
  //lets find all the lists and remove them
  Promise.all([
    _listRepository.deleteMany({ boardId: this._conditions._id })
    //_taskRespository.deleteMany({boardId: this._conditions._id})
  ])
    .then(() => next())
    .catch(err => next(err))
})

export default Board