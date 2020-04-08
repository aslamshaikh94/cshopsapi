const express = require('express');
const connection = require('../config/database');
require('dotenv').config();
const ensureToken = require('../middleware/auth');
let app = express();

app.use(express.urlencoded({extended:true}));
app.use(express.json());


app.post('/contact_info', ensureToken, (req, res)=>{
	let {name, phone, email, pincode, country, state, city, address} = req.body;
	let contactData = {
		user_id:req.user.id,
		fname:name,
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


app.get('/contact_info', ensureToken, (req, res)=>{
	let sql = `SELECT * FROM contact_info WHERE user_id=${req.user.id}`;
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