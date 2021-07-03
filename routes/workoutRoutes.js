const router = require('express').Router()
const { Workout } = require('../models')

// get all workouts
router.get('/workouts', (req, res) => {
  Workout.aggregate([
    {
      $addFields: {
        totalDuration: {
          $sum: '$exercises.duration'
        }
      }
    }
  ])
    .then(workouts => res.json(workouts))
    .catch(err => console.log('error in get all workouts:', err))
})

// get add an exercise(?)
router.put('/workouts/:id', (req, res) => {
  Workout.findByIdAndUpdate(req.params.id, { $push: { exercises: req.body } })
})

// create a workout
router.post('/workouts', (req, res) => {
  Workout.create(req.body)
    .then(workout => res.json(workout))
    .catch(err => console.log('Error in posting workout: ', err))
})

// get workouts in range
router.get('/workouts/range', (req, res) => {
  Workout.aggregate([
    {
      $addFields: {
        totalDuration: {
          $sum: '$exercises.duration'
        }
      }
    }
  ])
    .then(workouts => res.json(workouts))
    .catch(err => console.log(err))
})

// delete a workout
router.delete('/workouts/:id', (req, res) => {
  Workout.findByIdAndDelete(req.params.id)
    .then(() => res.sendStatus(200))
    .catch(err => console.log('error in delete workouts route: ', err))
})

module.exports = router
