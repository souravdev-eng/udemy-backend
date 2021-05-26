const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({ path: './.env' });

const DB = process.env.DATABASE_URL;

mongoose
  .connect(DB, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Database is Successfully conntected to the server'));

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`App is running on port ${port}`));
