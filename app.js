//external imports
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');

//internal imports
const {
  notFoundHandler,
  errorHandler,
} = require('./middlewares/common/errorHandler');
const loginRouter = require('./router/loginRouter');
const usersRouter = require('./router/usersRouter');
const inboxRouter = require('./router/inboxRouter');

const app = express();

// with this line we can use process.env.... anywhere in the application
dotenv.config();

//database connection
mongoose
  .connect(process.env.MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Database Connection Successful'))
  .catch((err) => console.log(err));

//request parser
//express.json() is a method inbuilt in express to recognize the incoming Request Object as a JSON Object. express.urlencoded() is a method inbuilt in express to recognize the incoming Request Object as strings or arrays
app.use(express.json());
app.use(express.urlencoded({ extended: true })); //so that we can parse request query

//set view engine
app.set('view engine', 'ejs');

//set static folder
// To serve static files such as images, CSS files, and JavaScript files, use the express.static built-in middleware function in Express.
app.use(express.static(path.join(__dirname, 'public')));

//parser cookies
app.use(cookieParser(process.env.COOKIE_SECRET));

//routing setup
app.use('/', loginRouter);
app.use('/users', usersRouter);
app.use('/inbox', inboxRouter);
//404 handler
app.use(notFoundHandler);

//common error handler
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`app listening to port ${process.env.PORT}`);
});
