const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide name'],
        minlenght: 3,
        maxlength: 50
    },
    email: {
        type: String,
        required:[true, 'Please provide e-mail address'],
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please provide valid e-mail address'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please provide password'],
        minlenght: 6, 
    }
})

UserSchema.pre('save', async function() {

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.comparePassword =  async function (candidatePassword) {
    
    const isMatch = await bcrypt.compare(candidatePassword, this.password)
    return isMatch
    }

module.exports = mongoose.model('User', UserSchema)