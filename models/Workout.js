const { model, Schema } = require('mongoose')

const Workout = new Schema({
  day: String,
  exercises: [{
    type: Schema.Types.ObjectId,
    ref: 'Exercise'
  }]
})

module.exports = model('Workout', Workout)
