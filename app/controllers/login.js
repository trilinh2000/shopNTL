const account=require('../model/account')
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
        console.log(findAccount)
        if(password==findAccount.password){
            req.session.login=true;
            req.session.account=findAccount;
            res.redirect('/NTL.vn');
        }
        else{
            res.redirect('/NTL/login');
        }
    }
}
module.exports.create=async(req,res)=>{
    await res.render('account/create');
}
module.exports.sendCreate=async(req,res)=>{
    const {username,email,password,img}=req.body;
    if(!{username,email,password,img}){
        await res.render('account/create');
    }
    else{
        const create=await account.create({username,email,password,img});
        console.log(create)
        if(!create){
            await res.render('account/create');
        }
        else{
            await res.redirect('/NTL/login');
        }
    }
}
module.exports.logout=(req,res)=>{
    req.session.destroy((err) =>{
        if(err){
            res.redirect('/500');
        }
        res.redirect('/NTL.vn');
        console.log("Logout")
    })
}