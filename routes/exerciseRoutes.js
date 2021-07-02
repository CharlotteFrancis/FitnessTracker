const router = require('express').Router()
const { Exercise, Workout } = require('../models')

// get all exercise
router.get('/exercises', (req, res) => {
  Exercise.find()
    .populate('workout')
    .then(exercises => res.json(exercises))
    .catch(err => console.log(err))
})

// make exercise
router.post('/exercises', (req, res) => {
  Exercise.create(req.body)
    .then(exercise => {
      Workout.findByIdAndUpdate(exercise.workout, { $push: { exercises: exercise._id } })
        .then(_ => res.json(exercise))
        .catch(err => console.log('error in making  the update route for workout', err))
    })
    .catch(err => console.log('error in making the exercise, in exercise routes: ', err))
})

// update exercise
router.put('/exercises/:id', (req, res) => {
  Exercise.findByIdAndUpdate(req.params.id, { $set: req.body })
    .then(_ => res.sendStatus(200))
    .catch(err => console.log(err))
})

// delete
router.delete('/exercises/:id', (req, res) => {
  Exercise.findByIdAndDelete(req.params.id)
    .then(() => res.sendStatus(200))
    .catch(err => console.log('error in delete exercoses route: ', err))
})

module.exports = router
