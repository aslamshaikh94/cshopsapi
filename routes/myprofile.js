const express = require('express');
const connection = require('../config/database');
require('dotenv').config();
const ensureToken = require('../middleware/auth');
let app = express();

app.use(express.urlencoded({extended:true}));
app.use(express.json());


app.post('/contact_info', ensureToken, (req, res)=>{
	let {fname, phone, email, pincode, country, state, city, address} = req.body;
	let contactData = {
		user_id:req.user.id,
		fname:fname,
		phone:phone,
		email:email,
		pincode:pincode,
		countries:country,
		states:state,
		cities:city,
		address:address
	}
	let sql = `INSERT INTO contact_info SET ?`
	connection.query(sql, contactData, (err, result, fields)=>{
		if(err){
			res.status("Error", err)
		}
		else{
			res.json(result)
		}
	})
})

app.put('/contact_info/:id', ensureToken, (req, res)=>{
	let {fname, phone, email, pincode, country, state, city, address} = req.body;
	let contactData = {
		user_id:req.user.id,
		fname:fname,
		phone:phone,
		email:email,
		pincode:pincode,
		countries:country,
		states:state,
		cities:city,
		address:address
	}	
	let sql = `UPDATE contact_info SET ? WHERE id=${req.params.id}`
	connection.query(sql, contactData, (err, result, fields)=>{
		if(err){
			res.status("Error", err)
		}
		else{
			res.json(result)
		}
	})
})


app.get('/contact_info', ensureToken, (req, res)=>{
	let sql = `SELECT id, fname, phone, email, pincode, countries AS country, 
										states AS state, cities AS city, address  FROM contact_info WHERE user_id=${req.user.id}`;
	connection.query(sql, (err, result, fields)=>{		
		if(err){
			res.status("Error", err)
		}
		else{
			res.json(result)			
		}
	})
});

module.exports = app;