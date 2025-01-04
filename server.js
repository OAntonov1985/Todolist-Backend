const app = require("./app");
const dotenv = require('dotenv');
const mongoose = require("mongoose");

process.on('uncaughtException', err => {
    console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
    console.log(err.name, err.message);
    process.exit(1);
});

dotenv.config({ path: './.env' });
const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
});

const DB_STRING = process.env.DATABASE_URL_STRING;

mongoose.connect(DB_STRING).then(con => {
    console.log(`Database connected: ${con.connection.host}`);
}).catch(err => {
    Promise.reject(new Error('Test unhandled rejection'));
});

process.on('unhandledRejection', err => {
    console.log('UNHANDLED REJECTION! 💥 Shutting down...');
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});