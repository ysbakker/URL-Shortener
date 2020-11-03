var express = require('express')
var router = express.Router()

router.get('/', (req, res, next) => {
  res.json([{ url: 'https://bruh.moment', slug: 'awijdLK' }])
})

module.exports = router
