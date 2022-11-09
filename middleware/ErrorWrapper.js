const errorHandler  = require("./errorHandler");

 function errorWrapper(cb,req,res) {
    return async function(params) {
        try {
            if(params.length === 1 ) await cb(params[0]);
            else if(params.length === 2 ) await cb(params[0],params[1]);
            else if(params.length === 3 ) await cb(params[0],params[1],params[2]);
            if(params.length === 4 ) await cb(params[0],params[1],params[2],params[3]);
        } catch (error) {
            errorHandler(error, req, res);
        }
    }
}

module.exports = errorWrapper;
