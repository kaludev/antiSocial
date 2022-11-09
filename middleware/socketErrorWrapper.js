module.exports = function errorWrapper(cb){
    return async function(socket,next){
        try{
            await cb(socket,next)
        }catch(error){
            console.error(error)
            socket.emit('error',error.message)
        }
    }
}