const express = require('express')
require('dotenv').config();
const cloudinary = require('cloudinary')

const app = express();

cloudinary.config({
 cloud_name: process.env.CLOUD_NAME,
 api_key: process.env.API_KEY,
 api_secret: process.env.API_SECRET,	
})

app.use(express.urlencoded({extended:true}))
app.use(express.json({ limit: '10mb' }))

app.post('/', async (req, res)=>{
	let result = await cloudinary.v2.uploader.upload(req.body.image, {format: "jpeg"});	
	try{
		res.json(result.secure_url)
	}
	catch(err){
		res.json({
        status:false,
        message:err
    })
	}
})


module.exports = app