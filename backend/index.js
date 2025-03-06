const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const bodyParser = require('body-parser');
const JsonWebToken = require('jsonwebtoken');
const cors = require('cors');
const dbConfig = require('./config/config.json').development;

require('dotenv').config()

const app = express();
const port = process.env.PORT;
const host = process.env.HOST;


app.use('/uploads', express.static('uploads'));

app.use(bodyParser.json());

app.use(cors({
    origin: process.env.ORIGIN,
    methods: 'GET, POST, PUT, DELETE',
    allowedHeaders: ['Content-type'],
    credentials: true
}));

const sequelize = new Sequelize(
    dbConfig.database, 
    dbConfig.username, 
    dbConfig.password, 
    {
    host: dbConfig.host,
    dialect: dbConfig.dialect
    }
);

const User = require('./models/user')(sequelize,DataTypes)
const Post = require("./models/post")(sequelize, DataTypes)
const Comment = require('./models/comment')(sequelize, DataTypes)                

sequelize.sync().then( () => {
    console.log('tabla creada')
});

const userRoutes = require('./controllers/user')
const postRoutes = require('./controllers/post')
const commentRoutes = require('./controllers/comment')


app.use('/api/users', userRoutes)
app.use('/api/posts', postRoutes)
app.use('/api/comments', commentRoutes)



app.listen(port, () => {
    console.log(`Corriendo: ${host}:${port}`)
})

// console.log(process.env.DB_PASSWORD)
// console.log(process.env.API_KEY)