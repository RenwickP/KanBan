import express from 'express'
import { Authorize } from '../middleware/authorize'
import _tasksService from "../services/TasksService"

export default class TasksController {
  constructor() {
    this.router = express.Router()
      .post('', this.createTask)
    // .delete('/:id', this.deleteTask)


    // .use(Authorize.authenticated)
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
      await _tasksService.deleteTask(req.params.id)
      return res.send("deleted")
    } catch (error) {
      next(error)
    }
  }
}

