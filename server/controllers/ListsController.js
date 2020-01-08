import express from 'express'
import { Authorize } from '../middleware/authorize'
import _listService from "../services/ListService"

export default class ListsController {
  constructor() {
    this.router = express.Router()
      .post('', this.createList)
      .delete('/:id', this.deleteList)
    // .use(Authorize.authenticated)
    // .delete('/:id', this.delete)
    // .use(this.defaultRoute)
  }
  // defaultRoute(req, res, next) {
  //   next({ status: 404, message: 'No Such Route' })
  // }

  async createList(req, res, next) {
    try {
      let data = await _listService.createList(req.body)
      return res.status(200).send(data)
    } catch (error) {
      next(error)
    }
  }
  async deleteList(req, res, next) {
    try {
      await _listService.deleteList(req.params.id)
      return res.send("deleted")
    } catch (error) {
      next(error)
    }
  }
}

