const mongoose = require('mongoose')

const registeSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    eventtype:{
        type:String,
        required:true
    },
    participants:{
        type:Array,
        required:true
    },
    eventdate:{
        type:String,
    },
    description:{
        type:String,
    },
})

module.exports = mongoose.model('Registerprofiles',registeSchema)