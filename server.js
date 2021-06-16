const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', err => {
  console.log(err.name, err.message);
  console.log('uncaught Exception! Shutting down!');
  process.exit(1);
});

dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE_URL;

mongoose
  .connect(DB, {
    useCreateIndex: true,
    autoIndex: true,
    useFindAndModify: false,
    family: 4,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('DB is successfully conntected'));

const port = process.env.PORT || 4000;

const server = app.listen(port, () =>
  console.log(`App is running on port ${port} 🔥🔥🔥🔥`)
);

process.on('unhandledRejection', err => {
  console.log(err.name, err.message);
  console.log('Unhandled Rejection! Shutting down!');
  server.close(() => {
    process.exit(1);
  });
});
