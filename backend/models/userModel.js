const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const sendEmail = require("../utils/sendEmail");

const Schema = mongoose.Schema

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  verify: {
    type: String,
    default: 0,
    required: true
  },
  verifyToken: {
    type: String
  }
})

// static signup method
userSchema.statics.signup = async function(email, password) {

  // validation
  if (!email || !password) {
    throw Error('All fields must be filled')
  }
  if (!validator.isEmail(email)) {
    throw Error('Email not valid')
  }
  if (!validator.isStrongPassword(password)) {
    throw Error('Password not strong enough')
  }

  const exists = await this.findOne({ email })

  if (exists) {
    throw Error('Email already in use')
  }

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)
  const verifyToken = jwt.sign(email, process.env.SECRET)

  const sent = await sendEmail(email, 'Hello you had successfully created your Account on Workout Buddy. Follow this URL to verify your email http://localhost:3000/verify/' + verifyToken);

  const user = await this.create({ email, password: hash, verifyToken })

  return user
}

// static login method
userSchema.statics.login = async function(email, password) {

  if (!email || !password) {
    throw Error('All fields must be filled')
  }

  const user = await this.findOne({ email })
  if (!user) {
    throw Error('Incorrect email')
  }

  const match = await bcrypt.compare(password, user.password)
  if (!match) {
    throw Error('Incorrect password')
  }

  if(user.verify != 1){
    const verifyToken = jwt.sign(email, process.env.SECRET)
    console.log(verifyToken)
    const sent = await sendEmail(email, 'Hello you had successfully created your Account on Workout Buddy. Follow this URL to verify your email http://localhost:3000/verify/' + verifyToken);

    const update = await this.updateOne({ email: email }, { $set:({ verifyToken: verifyToken })})
    throw Error('Please verify yourself first. We have sent you an email please check that and verify by clicking on the link')
  }

  return user
}

// static token validate method
userSchema.statics.token = async function(token) {

  if (!token) {
    throw Error('Token not found')
  }

  const user = await this.findOne({ verifyToken: token })
  if (!user) {
    throw Error('No user with this token')
  }

  const update = await this.updateOne({ verifyToken: token }, { $set:({ verify: 1 })})

  if (!update) {
    throw Error('Unable to update token')
  }

  return user
}

module.exports = mongoose.model('User', userSchema)