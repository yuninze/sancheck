const express = require('express')
const path = require('path')
const app = express()

app.get("*",(req, res) => {
  console.log(req.originalUrl)
  
  if (req.originalUrl.endsWith("php") || req.originalUrl.endsWith("cgi") || req.originalUrl.includes("sql")) {
	res.end()
  }
  
  const file=`${__dirname}/${req.originalUrl}`
  res.download(file)
})

app.get("/",(req, res) => {
  console.log(req.originalUrl)
  res.sendFile(__dirname+"/index.html")
})

app.listen(80,()=>{
	console.log("listening")
})
