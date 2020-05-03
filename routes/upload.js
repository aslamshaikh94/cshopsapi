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
		res.json({url:result.secure_url, id:result.public_id})
	}
	catch(err){
		res.json({
        status:false,
        message:err
    })
	}
})

app.get('/', (req, res)=>{
	cloudinary.v2.api.resources({ type: 'upload', max_results: 200 }, function(error, result) {
	  res.json(result.resources)
	});
})



module.exports = app