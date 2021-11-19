const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const userRouter = require('./routers/user.router');
const {STATUS_CODE} = require('./configs');
const {MONGO_CONNECT_URL, PORT} = require('./configs/config');

const app = express();

mongoose.connect(MONGO_CONNECT_URL);

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/users', userRouter);

// eslint-disable-next-line no-unused-vars
app.use('*', (err, req, res, next) => {
    res
        .status(err.status || STATUS_CODE.INTERNAL_SERVER_ERROR_500)
        .json({message: err.message});
});

app.listen(PORT, () => {
    console.log(`listen ${PORT}`);
});
