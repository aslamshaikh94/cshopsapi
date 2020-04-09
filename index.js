const express = require('express')
const path = require('path')
const app = express();
const PORT = process.env.PORT || 8080

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");    
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-auth-token");
    next();
});


// var userauth = require('./routes/auth');
var users = require('./routes/users');
// var product = require('./routes/product');
// var enquiry = require('./routes/enquiry');
// var addto = require('./routes/addto');
// var myprofile = require('./routes/myprofile');
// var orders = require('./routes/orders');

// app.use("/auth", userauth);
app.use("/users", users);
// app.use("/product", product);
// app.use("/enquiry", enquiry);
// app.use("/addto", addto);
// app.use("/myprofile", myprofile);
// app.use("/orders", orders);

express()
  .use(express.static(path.join(__dirname, 'public')))
  .get('/', (req, res) => res.render('index'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
