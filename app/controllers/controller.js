const express=require('express');
express.json();
express.urlencoded({extended:true});

const account=require('../model/account')
const product=require('../model/product')
const fs = require('fs');
const path = require('path');
exports.home=async(req,res) =>{
        const account1=req.session.account;
        const data=await account.findOne({email:account1.email})//.populate({ path: 'productId' });
        const data1=await product.find({productId:account1._id}).populate({ path: 'productId' });
        res.render('home',{items:data,items1:data1});
        
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