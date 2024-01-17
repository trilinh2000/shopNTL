const express=require('express');
express.json();
express.urlencoded({extended:true});

const account=require('../model/account')
const product=require('../model/product')
const fs = require('fs');
const path = require('path');
const { error } = require('console');
exports.home=async(req,res) =>{
        const account1=req.session.account;
        console.log(account1._id)
        const data=await product.find({productId:account1._id}).populate({ path: 'productId' });
        console.log(data)
        res.render('home',{items:data});
}
exports.createProduct=async(req,res)=>{
    const account2=req.session.account;
    const {name,title}=req.body;
    const find=await account.findOne({email:account2.email})
    console.log(find);
    const obj={
        productId: find.id,
       name:name,
       title:title,
       img:{
        data: fs.readFileSync(path.join('app/uploads/'+req.file.filename)),
        contentType: 'image/jpg'
        }
    }
    console.log(obj);
    if(!obj){
        console.log("error");
    }else{
    const create=await product.create(obj);
    res.redirect('/NTL.vn');
    }
}