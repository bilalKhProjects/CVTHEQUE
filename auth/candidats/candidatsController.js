const User = require('../User')
const env = require('../database/db')
const jwt = require('jsonwebtoken')
const candidats = require('./candidats')
const util = require('util');
let fs = require('fs');
let formidable = require('formidable');

// send candidats
exports.sendCandidat = function (req, res) {
console.log(req.params.cin)
let form = new formidable.IncomingForm()

form.parse(req, function(error, fields, file){

  const candidat = new candidats({
       ...fields})

candidats.findOne({cin:candidat.cin}, function (err,existingCin) {

   if (err) {
     return res.status(422).json({ 'error': 'Oops! Something went wrong' })
   }
   console.log(existingCin)
   if (existingCin) {
     return res.status(422).json({ 'error': 'CIN already exist' })
   }
 
   else {
      candidat.save(function(err){
            if(err){
              return res.status(422).json({
                'error':err
              })
            }
            return res.status(200).json({'registered':true})
          })
   }
  })
})
}
 //get all candidat 
 exports.getCandidat= function(req,res) {
  candidats.find({}).exec((err, rst) => {
     for(let i=0;i<rst.length;i++){
       if(rst){ 
         rst[i].cv=null
       }
       else
         {err}
     }
    return res.status(200).json({rst});
  })
 }
// get 1 candidat 
 exports.getCandidatById= function(req,res){
 candidats.findOne({ _id: req.params.id }).exec((err, rst) => {
    return res.status(200).json({ rst });
 });
 }
//delete candidat 
 exports.deleteCandidat= function(req,res) {
  candidats.deleteOne({_id : req.params.id}).exec((err, status) => {
  });
  return res.status(200).json({ message:"Deleted successfully" })
 }
 //update candidat 
 exports.updateCandidat=async function (req, res) {

  let form = new formidable.IncomingForm()

  form.parse(req, function(error, fields, file){
  
    const candidat = new candidats({
         ...fields})
         
         candidats.findOneAndUpdate({ _id: req.params.id},fields).exec((err, rst) => {
           if(error){
             return res.status(420).json({'error': err})
           }
           else{
          return res.status(200).json({ rst });
           }
       });
  })
}

