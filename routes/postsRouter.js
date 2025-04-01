const { Router }= require('express');
const postsRouter = Router();
const { getAllPosts, postCreatePost, postCreateComment, postEditPost, getSinglePost, deleteSinglePost, putEditComment, deleteUserComment, putPublishPost } = require('../controller/postsController');
const passport = require('passport');

// Posts route
postsRouter.get('/', passport.authenticate('jwt', {session: false}), getAllPosts);
postsRouter.get('/:postId', passport.authenticate('jwt', {session: false}), getSinglePost)
postsRouter.post('/post', passport.authenticate('jwt', {session: false}), postCreatePost );
postsRouter.post('/:postId/edit', passport.authenticate('jwt', {session: false}), postEditPost);
postsRouter.delete('/:postId/delete', passport.authenticate('jwt', {session: false}), deleteSinglePost);
postsRouter.put('/:postId/publish', passport.authenticate('jwt', {session: false}), putPublishPost)
// Comments route
postsRouter.post('/:postId/comment', passport.authenticate('jwt', {session: false}), postCreateComment);
postsRouter.put('/comment/:commentId/edit', passport.authenticate('jwt', {session: false}), putEditComment);
postsRouter.delete('/comment/:commentId/delete', passport.authenticate('jwt', {session: false}), deleteUserComment );


module.exports = postsRouter;