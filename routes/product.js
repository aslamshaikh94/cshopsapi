let express = require('express');
const path = require("path");
let app = express();
let connection = require('../config/database');
const ensureToken = require('../middleware/auth');

app.use(express.urlencoded({extended:true}));
app.use(express.json({ limit: '10mb' }));

app.post('/add', ensureToken, (req, res)=>{		
	let product = {
		seller_id:req.user.id,
		categories:req.body.categories,
		type:req.body.type,
		product_name:req.body.product_name,	
		purchase_price:req.body.purchase_price,
		selling_price:req.body.selling_price,
		venders_price:req.body.venders_price,
		stock:req.body.stock,
		minorder:req.body.minorder,
		warranty:req.body.warranty,
		extra_fields:req.body.extra_fields,
		details:req.body.details,
		terms_conditions:req.body.terms_conditions,
		photos:req.body.photos,
		thumbnail:req.body.thumbnail,
	}
	let sql = 'INSERT INTO products SET ?'
	connection.query(sql, product, (err, result, fields)=>{		
		if(err){
			res.json({
            status:false,
            message:'there are some server error'
        })
		}
		else{
			res.send(result)
		}
	})
});

app.post('/update', ensureToken, (req, res)=>{
	let product = {
		categories:req.body.categories,
		type:req.body.type,
		product_name:req.body.product_name,	
		purchase_price:req.body.purchase_price,
		selling_price:req.body.selling_price,
		venders_price:req.body.venders_price,
		stock:req.body.stock,
		minorder:req.body.minorder,
		warranty:req.body.warranty,
		extra_fields:req.body.extra_fields,
		details:req.body.details,
		terms_conditions:req.body.terms_conditions,
		photos:req.body.photos,
		thumbnail:req.body.thumbnail,
	}
	let sql = `UPDATE products SET ? WHERE id=${req.body.id}`
	connection.query(sql, product, (err, result, fields)=>{
		if(err){
			res.json({
            status:false,
            message:'there are some server error'
        })
		}
		else{
			res.send(result)
		}
	})
});

app.get('/products', (req, res, next)=>{
	let sql = `SELECT * FROM products order by created_at desc LIMIT 24`
	connection.query(sql, (err, result, fields)=>{
		if(err){
			res.status("Error", err)
		}
		else{
			res.json(result)
		}
	});
});



app.get('/admin/products', ensureToken, (req, res, next)=>{	
	let sql =`SELECT * FROM products WHERE seller_id ='${req.user.id}' order by created_at desc`
	connection.query(sql, (err, result, fields)=>{
		if(err){
			res.status("Error", err)
		}
		else{
			res.json(result)
		}
	});
});


app.get('/', function (req, res) {
	let sql = `SELECT * FROM products WHERE ${req.query.field} LIKE '%${req.query.search}%' order by created_at desc`
  connection.query(sql, (err, result, fields)=>{
		if(err){
			res.status("Error", err)			
		}
		else{
			res.json(result)			
		}
	});
});

app.get('/filters', function (req, res) {		
	let sql = `SELECT * FROM products WHERE ${req.query.field}='${req.query.search}' order by created_at desc`
  connection.query(sql, (err, result, fields)=>{
		if(err){
			res.status("Error", err)			
		}
		else{
			res.json(result)			
		}
	});
});

app.get('/:id', (req, res, next)=>{
	let sql = `SELECT * FROM products WHERE id ='${req.params.id}'`
	connection.query(sql, (err, result, fields)=>{
		if(err){
			res.send("Error", err)
		}
		else{
			res.json(result)
		}
	});
});

app.delete('/delete/:id', ensureToken, (req, res, next)=>{
	let sql = `DELETE FROM products 
						 WHERE id =${req.params.id} 
						 AND seller_id =${req.user.id}`
	connection.query(sql, (err, result, fields)=>{
		if(err){
			res.send("Error", err)
		}
		else{
			res.json(result)
		}
	});
});

module.exports = app;