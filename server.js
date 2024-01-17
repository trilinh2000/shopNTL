const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const session=require('express-session')
const methodOverride = require('method-override');
require('dotenv/config')
const mongodb=require('./app/config/configMongodb');
mongodb();
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static('app/public'));
app.use(express.static('views'))
app.set('view engine','ejs')
app.set('views','app/views')
app.use(methodOverride('_method', { methods: ['POST', 'GET'] }));
app.use(session({
    secret:process.env.SESSION_SECRET,
    resave:true,
    saveUninitialized:true,
}))
require('./app/router/router')(app);
app.listen(process.env.PORT_SERVER,(err)=>{
    if(err) throw err;
    console.log('Connection Server');
})