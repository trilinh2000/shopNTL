const controller=require('../controllers/controller');
const login=require('../controllers/login');
const middleWare=require('../middleware/middleware')
const upload=require('../model/multer')
const bodyParser=require('body-parser');
bodyParser.json();
bodyParser.urlencoded({extended:false});
module.exports= app => {
    const express=require('express');
    const router=express.Router();
    router.get('/NTL.vn',middleWare.logout,controller.home)
    .post('/NTL.vn',upload.single('image'),middleWare.logout,controller.createProduct)
    .get('/NTL/login',middleWare.login,login.login)
    .post('/NTL/login',login.sendLogin)
    .get('/NTL/create',middleWare.login,login.create)
    .post('/NTL/create',upload.single('image'),login.sendCreate)
    .get('/NTL/verify',login.verify)
    .get('/NTL/logout',login.logout)
    app.use(router);
};