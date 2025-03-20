const { Router }= require('express');
const homeRouter = Router();
const { getHome, postCreatePost } = require('../controller/homeController');
const passport = require('passport')

homeRouter.get('/', passport.authenticate('jwt', {session: false}), getHome);
homeRouter.post('/post', passport.authenticate('jwt', {session: false}), postCreatePost )
module.exports = homeRouter;