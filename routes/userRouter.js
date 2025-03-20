const { Router } = require('express');
const { postCreateUser } = require('../controller/userController');
const userRouter = Router();



userRouter.post('/', postCreateUser);


module.exports = userRouter;
