var db = require('../models/index');
var bodyParser  = require('body-parser');
var session = require('express-session');
var helpers = require('./helpers.js');

module.exports = function(app, express){
  
  var userRouter = express.Router();
  var sessionRouter = express.Router();
  var commentRouter = express.Router();

  // express-session to save our cookie
  app.use(session({
    secret: 'keep it safe',
    resave: false,
    saveUninitialized: true
  }));

  // bodyParser to get data from POST requests
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());

  // serve up static files
  app.use(express.static(__dirname + '/../../client'));

  // hand over to the corresponding router
  // based on the path
  app.use('/api/users', userRouter);
  app.use('/api/sessions', sessionRouter);
  app.use('/api/comments', commentRouter);
  app.use(helpers.errorLogger);
  app.use(helpers.errorHandler);
  
  // include the routers
  require('../routes/userRoute.js')(userRouter);
  require('../routes/sessionRoute.js')(sessionRouter);
  require('../routes/commentRoute.js')(commentRouter);

  
};


