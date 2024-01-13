const controller=require('../controllers/controller');
const login=require('../controllers/login');
const middleWare=require('../middleware/middleware')
module.exports= app => {
    const express=require('express');
    const router=express.Router();
    router.get('/NTL.vn',middleWare.logout,controller.home)
    .get('/NTL/login',middleWare.login,login.login)
    .post('/NTL/login',login.sendLogin)
    .get('/NTL/create',middleWare.login,login.create)
    .post('/NTL/create',login.sendCreate)
    .get('/NTL/logout',login.logout)
    app.use(router);
};