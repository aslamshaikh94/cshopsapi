let express = require('express');
let connection = require('../config/database');
require('dotenv').config();
let SECRETKEY = process.env.SECRET_KEY;

const ensureToken = require('../middleware/auth');
let app = express()

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.post('/', ensureToken, (req, res)=>{
  let favorites={
    user_id:req.user.id,
    product_id:req.body.product_id,
    type:req.body.type
  }
  let sql = `INSERT INTO favorite_cart_products SET ?`
  connection.query(sql, favorites, (err, result)=>{
    if(err){
      res.json({status:false, message:err})
    }
    else{
      res.json({status:true})
    }
  })
});

app.get('/', ensureToken, (req, res)=>{ 
  let sql = `SELECT * FROM favorite_cart_products WHERE user_id=${req.user.id}`
  connection.query(sql, (err, result)=>{
    if(err){
      res.json({status:false, message:err})
    }
    else{
      res.json(result)
    }
  })
})

app.get('/wishlist', ensureToken, (req, res, next)=>{
  let sql = `SELECT products.id AS product_id, 
                    favorite_cart_products.id AS addto_id, 
                    product_name, selling_price, photos 
             FROM products
             LEFT JOIN favorite_cart_products ON products.id = favorite_cart_products.product_id
             AND favorite_cart_products.type='${req.query.type}'
             WHERE favorite_cart_products.user_id=${req.user.id}
            `
  connection.query(sql, (err, result, fields)=>{
    if(err){
      res.status("Error", err)
    }
    else{
      res.json(result)
    }
  });
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