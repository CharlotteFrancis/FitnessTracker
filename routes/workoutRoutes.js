const router = require('express').Router()
const { Workout, Exercise } = require('../models')

// get all workouts
router.get('/workouts', (req, res) => {
  Workout.find()
    .populate('exercises')
    .then(workouts => res.json(workouts))
    .catch(err => console.log('error in get all workouts:', err))
})

// get add an exercise(?)
router.put('/workouts/:id', (req, res) => {
  Exercise.create(req.body)
    .then(exercise => {
      Workout.findByIdAndUpdate(exercise.workout, { $push: { exercises: exercise._id } })
        .then(_ => res.json(exercise))
        .catch(err => console.log('error in making  the update route for workout', err))
    })
    .catch(err => console.log('error in making the exercise, in workout routes: ', err))
})

// create a workout
router.post('/workouts', (req, res) => {
  Workout.create(req.body)
    .then(workout => res.json(workout))
    .catch(err => console.log('Error in posting workout: ', err))
})

// get workouts in range
router.get('/workouts/range', (req, res) => {
  // not sure this haha
})

// delete a workout
router.delete('/workouts/:id', (req, res) => {
  Workout.findByIdAndDelete(req.params.id)
    .then(() => res.sendStatus(200))
    .catch(err => console.log('error in delete workouts route: ', err))
})

module.exports = router
