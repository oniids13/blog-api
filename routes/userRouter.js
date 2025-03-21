const { Router } = require('express');
const { postCreateUser, postEditUser } = require('../controller/userController');
const userRouter = Router();
const passport = require('passport')



userRouter.post('/signup', postCreateUser);
userRouter.post('/:id/edit', passport.authenticate('jwt', {session: false}), postEditUser)


module.exports = userRouter;
