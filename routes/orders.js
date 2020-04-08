let express = require('express');
let connection = require('../config/database');
let SECRETKEY = process.env.SECRET_KEY;

const ensureToken = require('../middleware/auth');
let app = express()

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.post('/', ensureToken, (req, res)=>{  
  let sql = `INSERT INTO orders SET ?`
  req.body.forEach((order)=>{
    let inserOrder = {...order, user_id:req.user.id}
    connection.query(sql, inserOrder, (err, result)=>{
      if(err){
        res.json({status:false, message:err})
      }
      else{
        res.json({status:true})
      }
    })    
  })
});

app.delete('/:id', (req, res)=>{
  let sql = `DELETE FROM favorite_cart_products WHERE id=${req.params.id}`
  connection.query(sql, (err, result, fields)=>{
    if(err){
      res.send("Error", err)
    }
    else{
      res.json(result)
    }
  });
})



module.exports = app;