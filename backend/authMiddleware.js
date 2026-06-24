const jwt = require('jsonwebtoken')   
const { secret } = require('./config')

module.exports = function (req, res, next) {

    if (req.method === "OPTIONS") {
        next()
    }
    try {
        
        const token = req.headers.authorization?.split(' ')[1] 
        
        //проверяем что не токена
        if (!token) {
            return res.status(403).json({ message: "Пользователь не авторизован" })
        }    
        const decodedData = jwt.verify(token, secret)
       req.user = decodedData
       
        //проверяем что токен неверный
        next()
    } catch (e) {
        console.log(e)
        return res.status(403).json({ message: "Пользователь не авторизован" })
    }
}
//Вычитал что так обычно называют такой js файл