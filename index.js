let express = require('express');
const path = require('path');
// require('dotenv').config();
const app = express();



let PORT = process.env.APP_PORT || 5000

express()
  .use(express.static(path.join(__dirname, 'public')))
  .get('/', (req, res) => res.render('index'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))