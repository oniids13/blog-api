const { Router } = require('express');
const { postCreateUser, postEditUser, postDeleteUser, getUsers } = require('../controller/userController');
const userRouter = Router();
const passport = require('passport')



userRouter.post('/signup', postCreateUser);
userRouter.post('/:id/edit', passport.authenticate('jwt', {session: false}), postEditUser);
userRouter.delete('/:id/delete', passport.authenticate('jwt', {session: false}), postDeleteUser );
userRouter.get('/all', passport.authenticate('jwt', {session: false}), getUsers );
module.exports = userRouter;
