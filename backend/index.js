const fs = require('fs')
const http = require('http')
const PORT = 3001

const data = fs.readFileSync('./data.json')

http.createServer((req, res) => {
  res.statusCode = 200
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.contentType = 'application/json'
  res.end(data)
}).listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})
