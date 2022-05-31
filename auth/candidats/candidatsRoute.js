const express=require('express');
const app=express();

const candidatsRoute=express.Router();
let candidats=require('./candidats');
const candidat=require('./candidatsController')
const { authMiddleware } = require('../UserController')

//add Candidat
candidatsRoute.post('/',authMiddleware,candidat.sendCandidat);
candidatsRoute.get ('/',authMiddleware,candidat.getCandidat);
candidatsRoute.delete('/:id',authMiddleware,candidat.deleteCandidat);
candidatsRoute.get('/:id',authMiddleware,candidat.getCandidatById)
candidatsRoute.put('/:id',authMiddleware,candidat.updateCandidat)
module.exports = candidatsRoute;