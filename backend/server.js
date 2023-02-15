require('dotenv').config();

const express = require('express')
const mongoose = require('mongoose')
const nodemailer = require("nodemailer");
const workoutRoutes = require('./routes/workouts')
const userRoutes = require('./routes/user')

const PORT = process.env.PORT;
const server = express();

server.use(express.json())

server.use((req, res, next) => {
  
  next()
})

server.use('/api/workouts', workoutRoutes)
server.use('/api/user', userRoutes)

server.listen(PORT, () => {
    // console.log('Server is running on '+ PORT +' Port');
});

mongoose.connect(process.env.MONGO_URI).then(() => {
})
.catch((err) => {
    console.log(err)
})

// export default server