const { Router } = require('express')
const loginRouter = Router();
const {postLogin} = require('../controller/loginController')


loginRouter.post('/', postLogin);


module.exports = loginRouter;