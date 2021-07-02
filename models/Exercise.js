const { model, Schema } = require('mongoose')

const Exercise = new Schema({
  type: String,
  name: String,
  duration: Number,
  weight: Number,
  reps: Number,
  sets: Number,
  workout: {
    type: Schema.Types.ObjectId,
    ref: 'Workout'
  }
})

module.exports = model('Exercise', Exercise)
