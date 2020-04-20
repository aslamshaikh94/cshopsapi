let express = require('express');
let connection = require('../config/database');
require('dotenv').config();
let SECRETKEY = process.env.SECRET_KEY;

const ensureToken = require('../middleware/auth');
let app = express()

app.use(express.urlencoded({extended:true}));
app.use(express.json());


app.post('/', ensureToken, (req, res)=>{
  let user_id = req.user.id
  let sql = `INSERT INTO orders SET ?`  
  const eachRequest =  req.body.forEach((order)=>{
    let {id, product_id, product_name, selling_price, quantity} = order
    let sqldelete = `DELETE FROM favorite_cart_products WHERE id=${id}`  
    let inserOrder = {user_id:user_id, product_id, product_name, price:selling_price, quantity, user_id}
    
    return new Promise((resolve, reject)=>{
      connection.query(sql, inserOrder, (err, result)=>{
        connection.query(sqldelete, (err, result)=>{
          if(err){
            reject(err)
          }
          else{
            resolve(result)
          }
        })
      })
    })

  })

  Promise.all([eachRequest]).then((data)=>{
    res.json({status:true})    
  })
  .catch((err)=>{
    res.json({status:false, message:err})    
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