const account=require('../model/account')
require('dotenv/config');
const bcrypt=require('bcrypt');
const mailer=require('../utils/mailer');
const express=require('express');
express.json();
express.urlencoded({extended:true});
const fs=require('fs')
const path=require('path')
module.exports.login=async(req,res)=>{
    await res.render('account/login');
}
module.exports.sendLogin=async(req,res) =>{
    const {email,password}=req.body;
    if(!{email,password}){
        res.render('account/login')
    }
    else{
        const findAccount=await account.findOne({email:email});
        bcrypt.compare(password,findAccount.password,async(err,result)=>{
            if(result==true){
                req.session.login=true;
                req.session.account=findAccount;
                res.redirect('/NTL.vn');
            }
            else{
                res.redirect('/NTL/login');
            
            }
        })
    }
}
module.exports.create=async(req,res)=>{
    await res.render('account/create');
}
module.exports.sendCreate=async(req,res)=>{
    const {username,email,password}=req.body;
    if(!{username,email,password}){
        await res.render('account/create');
    }
    else{
        bcrypt.hash(password,parseInt(process.env.BCRYPT_HASH)).then(async(hashed)=>{
            const obj={
                username:username,
                email:email,
                password:hashed,
                img:{
                    data: fs.readFileSync(path.join('app/uploads/'+req.file.filename)),
                    contentType: 'image/jpg'
                }
            }
            const create=await account.create(obj);
            console.log(create);
            if(!create){
                await res.render('account/create');
            }
            else{
                
                bcrypt.hash(create.email,parseInt(process.env.BCRYPT_HASH)).then(async(hashedEmail)=>
                mailer.sendMail(create.email,"VERRIFY",`<a href="${process.env.APP_URL}/NTL/verify?email=${create.email}&token=${hashedEmail}">CREATE ACCOUNT</a>`)
                );
                await res.redirect('/NTL/login');
                setTimeout(async(req,res,next)=>{
                    const xoa=await account.findOneAndDelete({email:create.email,verify:false});
                    console.log("xoa:",xoa);
                },50000);
            }
        })
    }
}
module.exports.verify=async(req,res)=>{
    if(!req.query.email||!req.query.token){
        await res.render('account/create');
    }
    else{
        bcrypt.compare(req.query.email,req.query.token,async(err,result)=>{
            if(result==true){
                const update=await account.updateOne({email:req.query.email},{verify:true});
                res.redirect('/NTL/login')
            }
            else{
                res.redirect('/NTL/create');
            }
        })
    }
}
module.exports.logout=(req,res)=>{
    req.session.destroy((err) =>{
        if(err){
            res.redirect('/500');
        }
        res.redirect('/NTL/login');
        console.log("Logout")
    })
}