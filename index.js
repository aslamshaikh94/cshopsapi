let express = require('express');
const path = require('path');
require('dotenv').config();
const app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000, https://cshops.in");
    res.header('Access-Control-Allow-Credentials', true);
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, auth-token");
    next();
});

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

var userauth = require('./routes/auth');
var users = require('./routes/users');
var product = require('./routes/product');
var enquiry = require('./routes/enquiry');
var addto = require('./routes/addto');
var myprofile = require('./routes/myprofile');
var orders = require('./routes/orders');
var upload = require('./routes/upload');

app.use("/auth", userauth);
app.use("/users", users);
app.use("/product", product);
app.use("/enquiry", enquiry);
app.use("/addto", addto);
app.use("/myprofile", myprofile);
app.use("/orders", orders);
app.use("/upload", upload);


// error handler middleware
app.use((error, req, res, next) => {
  res.status(error.status || 500).send({
    error: {
      status: error.status || 500,
      message: error.message || 'Internal Server Error',
    },
  });
});


let PORT = process.env.APP_PORT || 5030
app.listen(PORT, ()=>{
  console.log("server is runing " + PORT)
});