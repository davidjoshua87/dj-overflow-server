const Answer = require('../models/answer.model')
const Question = require('../models/question.model')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

module.exports = {
  create: function (req, res) {
    console.log('masuk')
    let token = req.headers
    console.log(token)
    let decoded = jwt.decode(token.token, 'secret')
    console.log(decoded)
    // console.log(req.params.id)
    Answer.create({
      answer: req.body.answer,
      // question: mongoose.Types.ObjectId(req.params.id),
      user: mongoose.Types.ObjectId(decoded.id)
    })
    .then(ans => {
      Question.find({ _id: req.params.id })
        .then(ques => {
          console.log(ques)
          ques[0].answer.push(ans._id)
          ques[0].save()
          res.status(200).json({
            message: 'Answer posted',
            ans,
            ques
          })
        })
    })
    .catch(err => {
      res.status(400).json({
        message: 'Unable to post answer',
        err
      })
    })
  },
  getAll: function (req, res) {
    Answer.find()
      .exec()
      .then(ans => {
        res.status(200).json({
          message: 'All answers retrieved',
          ans
        })
      })
      .catch(err => {
        res.status(400).json({
          message: 'Unable to retrieve answers',
          err
        })
      })
  },
  remove: function (req, res) {
    Answer.findByIdAndRemove(req.params.id)
      .exec()
      .then(ans => {
        res.status(200).json({
          message: 'answer deleted',
          ans
        })
      })
      .catch(err => {
        res.status(400).json({
          message: 'unable to delete answer'
        })
      })
  },
  upvote: function (req, res) {
    console.log(req.params)
    Answer.findOne({ _id: req.params.ans})
      .exec()
      .then(answer => {
        console.log(answer)
        let upIndex = answer.upvote.indexOf(req.params.user)
        let downIndex = answer.downvote.indexOf(req.params.user)
        if (downIndex !== -1) {
          answer.downvote.splice(downIndex, 1)
          answer.save()
          res.status(200).json({
            message: 'downvote removed'
          })
        } else {
          if (upIndex === -1) {
            answer.upvote.push(req.params.user)
            answer.save()
            res.status(200).json({
              message: 'Upvote successful'
            })
          } else if (upIndex !== -1) {
            answer.upvote.splice(upIndex, 1)
            answer.save()
            res.status(200).json({
              message: 'User removed upvote'
            })
          }
        }
      })
      .catch(err => {
        res.send(err)
      })
  },
  downvote: function (req, res) {
    Answer.findOne({ _id: req.params.ans})
      .exec()
      .then(answer => {
        let upIndex = answer.upvote.indexOf(req.params.user)
        let downIndex = answer.downvote.indexOf(req.params.user)
        if (upIndex !== -1) {
          answer.upvote.splice(upIndex, 1)
          answer.save()
          res.status(200).json({
            message: 'upvote removed'
          })
        } else {
          if (downIndex === -1) {
            answer.downvote.push(req.params.user)
            answer.save()
            res.status(200).json({
              message: 'downvote successful'
            })
          } else if (downIndex !== -1) {
            answer.downvote.splice(downIndex, 1)
            answer.save()
            res.status(200).json({
              message: 'User removed downvote'
            })
          }
        }
      })
      .catch(err => {
        res.send(err)
      })
  }
}