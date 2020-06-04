
const server = require('./server');
const helmet = require('helmet')

const server = express()

server.get('/', function (req, res) {
  res.status(200).json({message: 'hello world'})
})

const port = 8000

server.listen(port, () => console.log(`\n == API on port ${port} == \n`))