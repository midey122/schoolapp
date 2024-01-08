function check(req,res,next){
    console.log(`${req.method}`);
    next()
}
module.exports = check