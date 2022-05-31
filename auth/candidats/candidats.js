// Candidats.js
const mongoose=require('mongoose')
const bcrypt=require('bcryptjs')
const { blob } = require('stream/consumers')
const { isNull } = require('@angular/compiler/src/output/output_ast')
const Schema=mongoose.Schema

const candidats= new Schema({
    cin:{type:String, unique: true},
    lastName:String,
    name:String,
    gender:String,
    age:Number,
    city:String,
    exp:String,
    cv:String
},{
    collection: 'candidats'
})
module.exports = mongoose.model('candidats', candidats)