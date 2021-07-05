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
    .then(_ => {
      console.log(req.body)
      res.sendStatus(200)
    })
    .catch(err => console.log(err))
})

// create a workout
router.post('/workouts', (req, res) => {
  const newWorkout = {
    ...req.body,
    day: new Date(new Date().setDate(new Date().getDate()))
  }
  Workout.create(newWorkout)
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
    .then(workouts => {
      const sevenDayWorkout = []
      if (workouts.length > 7) {
        for (let i = 0; i < 7; i++) {
          sevenDayWorkout.push(workouts[i + workouts.length - 7])
        }
      }
      res.json(sevenDayWorkout)
    })
    .catch(err => console.log(err))
})

// delete a workout
router.delete('/workouts/:id', (req, res) => {
  Workout.findByIdAndDelete(req.params.id)
    .then(() => res.sendStatus(200))
    .catch(err => console.log('error in delete workouts route: ', err))
})

module.exports = router
