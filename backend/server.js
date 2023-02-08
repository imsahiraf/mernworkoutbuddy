require('dotenv').config();

const express = require('express')
const mongoose = require('mongoose')
const nodemailer = require("nodemailer");
const workoutRoutes = require('./routes/workouts')
const userRoutes = require('./routes/user')

const PORT = process.env.PORT;
const app = express();

app.use(express.json())

app.use((req, res, next) => {
  
  next()
})

app.use('/api/workouts', workoutRoutes)
app.use('/api/user', userRoutes)

app.listen(PORT, () => {
    console.log('Server is running on '+ PORT +' Port');
});

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('connected to database')
})
.catch((err) => {
    console.log(err)
})