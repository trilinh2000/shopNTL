const express=require('express');
const app=express();
const session=require('express-session')
const mongodb=require('./app/config/configMongodb');
mongodb();
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static('app/public'));
app.set('view engine','ejs')
app.set('views','app/views')

app.use(session({
    secret:'mysql',
    resave:true,
    saveUninitialized:true,
}))
require('./app/router/router')(app);
app.listen(3000,(err)=>{
    if(err) throw err;
    console.log('Connection Server');
})