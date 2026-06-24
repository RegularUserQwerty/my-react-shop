const PORT  = 9001
const URLDB = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/test';
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const { secret } = require('./config')
const User = require('./models/User')
const Product = require('./models/Product')
const authMiddleware = require('./authMiddleware')
const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/test";

mongoose.connect(mongoURI)
  .then(() => console.log("MongoDB успешно подключена внутри Docker!"))
  .catch(err => console.log(err));

const app = express()

app.use(cors())
app.use(express.json())

const generateAccessToken = (id) => {
    const payload = {
        id
    }
    return jwt.sign(payload, secret, {expiresIn: '24h'})
}

app.post('/registration', async (req, res) => {
    console.log(req.body);
    const {login, password, email} = req.body
    const user = new User({login, password, email})
    await user.save()
    res.json({
        message: 'Вы успешно зерегистировались'
    })
})

app.post('/login', async (req, res) => {
    console.log(req.body);
    const {login, password} = req.body
    const user = await User.findOne({login})
    if (!user){
        return res.status(400).json({message: 'Пользователь не найден!'})
    }
    if (user.password !== password){
        return res.status(400).json({message: 'Неверный логин или пароль'})
    }
    const token = generateAccessToken(user._id)
    res.json({
        message: 'Вы успешно авторизованы!',
        token: token
    })
})

app.get('/profile', authMiddleware, async (req, res) => {
    try {
        //в req.user.id лежит id пользователя из токена
        //ищем пользователя в базе, исключая выдачу пароля 
        const user = await User.findById(req.user.id).select('-password')
        
        if (!user) {
            return res.status(404).json({ message: "Пользователь не найден" })
        }

        //отправляем данные на фронтенд
        res.json({ user })
    } catch (e) {
        console.log(e)
        res.status(500).json({ message: "Ошибка сервера при получении профиля" })
    }
})

app.post('/change-password', authMiddleware, async (req, res) => {
    try {
        const { newPassword } = req.body;

        if (!newPassword || newPassword.trim() === "") {
            return res.status(400).json({ message: "Пароль не может быть пустым" });
        }

        const user = await User.findById(req.user.id);
        
        if (!user) {
            return res.status(404).json({ message: "Пользователь не найден в базе" });
        }

        user.password = newPassword;
        await user.save();
        res.json({ message: "Пароль успешно изменен!" });
    } catch (e) {
        console.log("Ошибка на бэкенде:", e);
        res.status(500).json({ message: "Ошибка сервера при смене пароля" });
    }
});

app.post('/add-product', async (req, res) => {
    try {
        const { title, price, image } = req.body;

        // название и цена должны быть обязательно
        if (!title || !price) {
            return res.status(400).json({ message: "Название и цена обязательны для заполнения!" });
        }

        // обращаемся к коллекции через mongoose.connection
        const db = mongoose.connection.useDb('test');
        await db.collection('products').insertOne({
            title: title,
            price: Number(price), 
            image: image || "https://via.placeholder.com/150" // заглушка если нет картинки
        });

        res.json({ message: "Товар успешно добавлен в базу данных!" });
    } catch (e) {
        console.log("Ошибка при добавлении товара:", e);
        res.status(500).json({ message: "Ошибка сервера при добавлении товара" });
    }
});

app.get('/products', async (req, res) => {

    const products = await Product.find()

    res.json({
        data: products
    })
})

const start = async () => {
    try {
        await mongoose.connect(URLDB, {authSource: "admin"})
        app.listen(PORT, () => console.log(`Сервер запущен на ${PORT} порте`))
    } catch (e) {
        console.log(e)
    }
}

start()