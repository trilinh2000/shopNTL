module.exports.login=(req,res,next)=>{
    if(req.session.login){
        res.locals.account=req.session.account;
        res.redirect('/NTL.vn');
    }
    else{
        next();
    }
}
module.exports.logout=(req,res,next)=>{
    if(req.session.login){
        res.locals.account=req.session.account;
        next();
    }
    else{
        res.redirect('/NTL/login');
    }
}