require('dotenv').config()

const express = require('express')

const server = require('./server');
const helmet = require('helmet')

server.use(helmet())

server.get('/', function (req, res) {
  res.status(200).json({greeting: process.env.GREETING})
})

const PORT = process.env.PORT || 8000

server.listen(PORT, () => console.log(`\n == API on port ${PORT} == \n`))