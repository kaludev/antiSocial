const errorHandler  = require("./errorHandler");

module.exports = function errorWrapper(cb,req,res) {
    return async function(params) {
        try {
            if(params.length === 1 ) return await cb(params[0]);
            else if(params.length === 2 ) return await cb(params[0],params[1]);
            else if(params.length === 3 ) return await cb(params[0],params[1],params[2]);
            if(params.length === 4 ) return await cb(params[0],params[1],params[2],params[3])
        } catch (error) {
            console.error(error);
            await errorHandler(error, req, res);
        }
    }
}


