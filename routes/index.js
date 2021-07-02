const router = require('express').Router()

router.use('/api', require('./exerciseRoutes'))
router.use('/api', require('./workoutRoutes'))

module.exports = router
