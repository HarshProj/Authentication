const localvariable = (req, res, next) => {
    if (!req.app.locals) {
        req.app.locals = {
            OTP : null,
            resetSession : false,
        };
    }
    console.log("localvariable middleware called");
    next();
};
module.exports=localvariable;