const express = require('express')

const path = require('path')

const Rollbar = require('rollbar')

let rollbar = new Rollbar({
    accessToken: "248bfcc28f114522a3f9e0ee241cef0e",
    captureUncaught: true,
    captureUnhandledRejections: true
})

const app = express()

// console.log(__dirname, path)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
    rollbar.info("html file served successfully")
})

let students = []

app.post('/api/student', (req, res)=>{
    const {name} = req.body
    name = name.trim()

    students.push(name)
    rollbar.log('student added successfully', {
        auth: 'Owen', type: 'manual entry'})
    res.status(200).send(students)
})

app.use(rollbar.errorHandler())

const port = process.env.PORT || 4765

app.listen(port, () => console.log(`Take us to warp ${port}!`))