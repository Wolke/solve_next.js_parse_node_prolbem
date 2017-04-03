const express = require('express')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({
  dev
})
const handle = app.getRequestHandler()

let Parse = require("parse/node");
// console.log("Parse",Parse);
Parse.serverURL = "http://localhost:1337/parse";
Parse.initialize("hell", "hellJAVASCRIPT_KEY","hellMASTER_KEY");

app.prepare()
  .then(() => {
    const server = express()

    server.get('/a', (req, res) => {
      return app.render(req, res, '/b', req.query)
    })

    server.get('/b', (req, res) => {
      return app.render(req, res, '/a', req.query)
    })

    server.get('/api', (req, res) => {
      // server.response()
      let q = new Parse.Query(Parse.User);
      q.count(c => {
        res.end(`{"users":${c}}`)
      })
    })

    server.get('*', (req, res) => {
      return handle(req, res)
    })

    server.listen(3000, (err) => {
      if (err) throw err
      console.log('> Ready on http://localhost:3000')
    })
  })