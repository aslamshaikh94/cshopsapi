let express = require('express');
const path = require('path');
// require('dotenv').config();
const app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-auth-token");
    next();
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});



let PORT = process.env.APP_PORT || 5000
app.listen(PORT, ()=>{
  console.log("server is runing " + PORT)
});