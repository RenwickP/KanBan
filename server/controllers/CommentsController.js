import express from 'express'
import { Authorize } from '../middleware/authorize'
import _commentsService from "../services/CommentsService"

export default class CommentsController {
  constructor() {
    this.router = express.Router()
      .use(Authorize.authenticated)
      .post('', this.createComment)
      .delete('/:id', this.deleteComment)

    // .use(this.defaultRoute)
  }
  // defaultRoute(req, res, next) {
  //   next({ status: 404, message: 'No Such Route' })
  // }

  async createComment(req, res, next) {
    try {
      let data = await _commentsService.createComment(req.body)
      return res.status(200).send(data)
    } catch (error) {
      next(error)
    }
  }
  async deleteComment(req, res, next) {
    try {
      if (req.body.authorId = req.session.uid) {
        await _commentsService.deleteComment(req.params.id)
        return res.send("deleted")
      }
    } catch (error) {
      next(error)
    }
  }
}

