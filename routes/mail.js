const express = require('express')
const nodemailer = require('nodemailer');
const ensureToken = require('../middleware/auth');

let app = express();
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.get('/', (req, res)=>{
	let transporter = nodemailer.createTransport({
	  service: 'gmail',
	  auth: {
	    user: 'aslam.ahmed@gmail.com',
	    pass: 'Aslam.123'
	  }
	});

	let mailOptions = {
	  from: 'highflyingaslam@gmail.com',
	  to: 'aslamakhtarahmed@gmail.com',
	  subject: 'Sending Email using Node.js',
	  text: 'That was easy!'
	};

	transporter.sendMail(mailOptions, function(error, info){
	  if (error) {
	    console.log('error', error);
	  } else {
	    console.log('Email sent: ' + info.response);
	  }
	});
});

module.exports = app;