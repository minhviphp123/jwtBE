const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const authRouter = require('./route/auth');
const userRouter = require('./route/userRoute');
const db = require('./config/connectDB');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const port = 8000;

const ACCESS_TOKEN_SECRET = 'eusKey';
const REFRESH_TOKEN_SECRET = 'eusRefresh';

db.connect();


app.use(bodyParser.urlencoded({ extended: false }));
// parse application / json
app.use(bodyParser.json());

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: false }, { limit: '50mb' }));

// app.use(express.json());

app.use(cors({ origin: true }));

app.use('/', authRouter);
app.use('/', userRouter);

app.listen(port, function () {
    console.log(`http://localhost:${port}`);
})
