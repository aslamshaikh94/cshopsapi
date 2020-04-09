const express = require('express')
const path = require('path')
const app = express();
const PORT = process.env.PORT || 8080

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-auth-token");
    next();
});



express()
  .use(express.static(path.join(__dirname, 'public')))
  .get('/', (req, res) => res.render('index'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
