const localvariable = (req, res, next) => {
    if (!req.app.locals) {
        req.app.locals = {};
    }
    console.log("localvariable middleware called");
    next();
};
module.exports=localvariable;