const express = require('express')
let connection = require('../config/database');
const ensureToken = require('../middleware/auth');

let app = express();
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.post('/send', ensureToken, (req, res)=>{
	let enquiry = {
		user_id:req.user.id,
		product_id:req.body.product_id,
		seller_id:req.body.seller_id,
		fullname:req.body.fullname,
		phone:req.body.phone,
		email:req.body.email,
		address:req.body.address,
		message:req.body.message,
		quantity:req.body.quantity,
	}		
	let sql = 'INSERT INTO enquiries SET ?'
	connection.query(sql, enquiry, (err, result, fields)=>{
		if(err){
			res.json({
            status:false,
            message:'there are some error with query'
        })
		}
		else{
			res.send(result)
		}
	})
});

app.post(`/reply`, ensureToken, (req, res)=>{		
	let sql = `UPDATE enquiries SET reply_message ='${req.body.message}'
             WHERE id ='${req.body.id}' `
	connection.query(sql, (err, result, fields)=>{
		if(err){
			res.json({
            status:false,
            message:'there are some error with query'
        })
		}
		else{
			res.send(result)
		}
	})

});

app.get('/', ensureToken, (req, res)=>{
	let sql =`SELECT * FROM enquiries WHERE seller_id=${req.user.id}`
	connection.query(sql, (err, result, fields)=>{		
		if(err){
			res.json({
            status:false,
            message:'there are some error with query'
        })
		}
		else{
			res.send(result)
		}
	})
});

app.get('/buyer', ensureToken, (req, res)=>{
	let sql =`SELECT * FROM enquiries WHERE user_id=${req.user.id}`
	connection.query(sql, (err, result, fields)=>{		
		if(err){
			res.json({
            status:false,
            message:'there are some error with query'
        })
		}
		else{
			res.send(result)
		}
	})
});

app.get('/reply', ensureToken, (req, res)=>{
	console.log("reply")
});

module.exports = app;