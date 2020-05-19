const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const router = require('./route');
const sequelize = require('./models').sequelize;
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/', router);
sequelize.sync();

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server On : http://localhost:${PORT}/`);
})