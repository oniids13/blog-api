const { Router }= require('express');
const postsRouter = Router();
const { getAllPosts, postCreatePost, postCreateComment } = require('../controller/postsController');
const passport = require('passport')

postsRouter.get('/', passport.authenticate('jwt', {session: false}), getAllPosts);
postsRouter.post('/post', passport.authenticate('jwt', {session: false}), postCreatePost )
postsRouter.post('/:postId/comment', passport.authenticate('jwt', {session: false}), postCreateComment)
module.exports = postsRouter;