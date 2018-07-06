const Question = require('../models/question.model')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

module.exports = {
  getAll: function (req, res) {
    Question.find()
      .populate('answer')
      .populate('User')
      .sort('-createdAt')
      .exec()
      .then(response => {
        console.log(response,'====>>>ini response')
        res.status(200).json({
          message: 'Question list retrieved successfully',
          response
        })
      })
      .catch(err => {
        res.status(400).json({
          message: 'Unable to retrieve question list',
          err
        })
      })
  },
  create: function (req, res) {
    let decoded = jwt.verify(req.headers.token, 'secret')
    
    Question.create({
      title: req.body.title,
      description: req.body.description,
      user: decoded.id
    })
    .then(response => {
      res.status(200).json({
        message: 'Question posted',
        response
      })
    })
    .catch(error => {
      res.status(400).json({
        message: 'Unable to post question'
      })
    })
  },
  getById: function (req, res) {
    console.log(req.params.id)
    Question.findOne({ _id: req.params.id })
      .populate('answer')
      .exec()
      .then(question => {
        console.log(question)
        res.status(200).json({
          message: 'Question retrieved',
          question
        })
      })
      .catch(error => {
        console.log(error)
        res.status(400).json({
          message: 'Unable to retrieve question thread',
          error
        })
      })
  },
  getQuestionByUserId: function (req, res) {
    let decoded = jwt.verify(req.headers.token, 'secret')
    Question.find({ user: decoded.id })
      .exec()
      .then(ques => {
        console.log(ques)
        res.status(200).json({
          message: 'User questions retrieved',
          ques
        })
      })
      .catch(err => {
        res.status(400).json({
          message: 'Unable to retrieve user questions',
          err
        })
      })
    // res.send(decoded)
  },
  deleteQuestion: function (req, res) {
    Question.findByIdAndRemove(req.params.id)
      .exec()
      .then(question => {
        res.status(200).json({
          message: 'question deleted',
          question
        })
      })
      .catch(err => {
        res.status(400).json({
          message: 'unable to delete question',
          err
        })
      })
  },
  updateQuestion: function (req, res) {
    Question.findByIdAndUpdate(req.params.id, {
      title: req.body.title,
      description: req.body.description
    })
      .exec()
      .then(question => {
        res.status(200).json({
          message: 'question updated',
          question
        })
      })
      .catch(err => {
        res.status(400).json({
          message: 'unable to update question',
          err
        })
      })
  },
  upvote: function (req, res) {
    Question.findOne({ _id: req.params.ques})
      .exec()
      .then(question => {
        if (question.user == req.params.user) {
          res.status(200).json({
            message: 'user cannot vote their own question',
          })
        } else {
          let upIndex = question.upvote.indexOf(req.params.user)
          let downIndex = question.downvote.indexOf(req.params.user)
          if (downIndex !== -1) {
            question.downvote.splice(downIndex, 1)
            question.save()
            res.status(200).json({
              message: 'downvote removed'
            })
          } else {
            if (upIndex === -1) {
              question.upvote.push(req.params.user)
              question.save()
              res.status(200).json({
                message: 'Upvote successful'
              })
            } else if (upIndex !== -1) {
              question.upvote.splice(upIndex, 1)
              question.save()
              res.status(200).json({
                message: 'user removed downvote'
              })
            }
          }
        }
      })
      .catch(err => {
        res.send(err)
      })
  },
  downvote: function (req, res) {
    Question.findOne({ _id: req.params.ques})
      .exec()
      .then(question => {
        if (question.user == req.params.user) {
          res.status(200).json({
            message: 'user cannot vote their own question',
          })
        } else {
          let upIndex = question.upvote.indexOf(req.params.user)
          let downIndex = question.downvote.indexOf(req.params.user)
          if (upIndex !== -1) {
            question.upvote.splice(upIndex, 1)
            question.save()
            res.status(200).json({
              message: 'upvote removed'
            })
          } else {
            if (downIndex === -1) {
              question.downvote.push(req.params.user)
              question.save()
              res.status(200).json({
                message: 'downvote successful'
              })
            } else if (downIndex !== -1) {
              question.downvote.splice(downIndex, 1)
              question.save()
              res.status(200).json({
                message: 'user removed downvote'
              })
            }
          }
        }
      })
      .catch(err => {
        res.send(err)
      })
  }
}