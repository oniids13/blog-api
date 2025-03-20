const { Router }= require('express');
const homeRouter = Router();
const { getHome, postCreatePost, postCreateComment } = require('../controller/homeController');
const passport = require('passport')

homeRouter.get('/', passport.authenticate('jwt', {session: false}), getHome);
homeRouter.post('/post', passport.authenticate('jwt', {session: false}), postCreatePost )
homeRouter.post('/:postId/comment', passport.authenticate('jwt', {session: false}), postCreateComment)
module.exports = homeRouter;