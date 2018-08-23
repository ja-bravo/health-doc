import * as express from 'express';
import controller from './controller'
export default express.Router()
    .get('/', controller.isFirstTime)
    .post('/', controller.signIn)
    .post('/register', controller.register);