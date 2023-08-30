const http = require('node:http');
const express = require('express')
const hostname = '127.0.0.1';
const port = 3000;
const app = express()

const node16 = require('./node16')

app.get('/node16', node16.settimeout)






const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello, World!\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
}); 