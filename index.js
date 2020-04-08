let express = require('express');
const path = require('path');
require('dotenv').config();
const app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-auth-token");
    next();
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

var userauth = require('./routes/auth');
var product = require('./routes/product');
var enquiry = require('./routes/enquiry');
var users = require('./routes/users');
var addto = require('./routes/addto');
var myprofile = require('./routes/myprofile');
var orders = require('./routes/orders');

app.use("/auth", userauth);
app.use("/users", users);
app.use("/product", product);
app.use("/enquiry", enquiry);
app.use("/addto", addto);
app.use("/myprofile", myprofile);
app.use("/orders", orders);

let port = process.env.APP_PORT
app.listen(port, ()=>{
  console.log("server is runing " + port)
});