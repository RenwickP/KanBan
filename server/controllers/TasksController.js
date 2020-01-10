import express from 'express'
import { Authorize } from '../middleware/authorize'
import _tasksService from "../services/TasksService"
import _commentService from "../services/CommentsService"

export default class TasksController {
  constructor() {
    this.router = express.Router()
      .use(Authorize.authenticated)
      .get('/:id/comments', this.getCommentsByTask)
      .post('', this.createTask)
      .put('/:id', this.editListId)
      .delete('/:id', this.deleteTask)


    // .delete('/:id', this.delete)
    // .use(this.defaultRoute)
  }
  // defaultRoute(req, res, next) {
  //   next({ status: 404, message: 'No Such Route' })
  // }

  async createTask(req, res, next) {
    try {
      let data = await _tasksService.createTask(req.body)
      return res.status(200).send(data)
    } catch (error) {
      next(error)
    }
  }
  async deleteTask(req, res, next) {
    try {
      if (req.body.authorId = req.session.uid) {
        await _tasksService.deleteTask(req.params.id)
        return res.send("deleted")
      }
    } catch (error) {
      next(error)
    }
  }
  async editListId(req, res, next) {
    try {
      let edit = await _tasksService.editListId(req.params.id, req.body)
      return res.send(edit)
    } catch (error) {
      next(error)
    }
  }

  async getCommentsByTask(req, res, next) {
    try {
      let data = await _commentService.getCommentsByTask(req.params.id)
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }
}

