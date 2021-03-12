const express = require('express')
const path = require('path')

const app = express()

const PORT = process.env.PORT || 3000

app.use(express.static(path.join(__dirname, 'public')))

app.listen(PORT, (err) => {
  if(err){
    console.log("Error occured", err)
  } else {
    console.log(`Server started at port ${PORT}`)
  }
})