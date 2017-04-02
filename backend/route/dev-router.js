let Router = require('express').Router
let bearerAuth = require('../lib/bearer-auth-midd.js')
// let basicAuth = require('../lib/basic-auth-midd.js')
let createError = require('http-errors')
let Dev = require('../model/dev')
let jsonParser = require('body-parser').json()

let router = module.exports = new Router()


//unauthed get all devs to pass to filtered dev list

router.get('/api/devList', (req, res, next) => {
  Dev.find()
  .then(allDevsObj => {
    res.send(allDevsObj)
  })
  .catch(next)
})

//req.user should be a individual user which the bearer auth will identify
router.post('/api/dev', bearerAuth, jsonParser, (req, res, next) => {
  if(!req.user.isDev) return next(createError(401, 'Please log in as a Developer'))

  //req.body will be values from the form they fill out on angular front-end
  const dev = new Dev(req.body)
  dev.save()
  .then(dev => res.json(dev))
  .catch(next)
})

router.get('/api/dev', bearerAuth, (req, res, next) => {
  if(!req.user.isDev) return next(createError(401, 'please log in as a developer'))

  Dev.findOne({username: req.user.username})
  .then( dev => {
    //if dev is null, return a 404 error. This is important for edit profile functionality
    if(!dev) return next(createError(404, 'Not found'))
    res.json(dev)
  })
  .catch(err => {
    console.error(err)
  })
})

router.put('/api/dev', bearerAuth, jsonParser, (req, res, next) => {
  Dev.findOneAndUpdate({username: req.user.username}, req.body).exec()
    .then(docs => {
      res.json(docs)
    })
    .catch(err => {
      console.error(err)
    })
})

  // .then(dev => {
  //   if(!dev) return next(createError(404, 'Not found'))
  //   res.json(dev)
  // })
//   .catch(err => {
//     console.log(err)
//   })
// })

router.delete('/api/dev', bearerAuth, (req, res) => {
  Dev.findByIdAndRemove(req.user.id)
  .then(user => res.json(user))
  .catch(e => {
    console.log(e)
    res.json({}) //or err.message?
  })
})
