let express = require('express');
let connection = require('../config/database');
const ensureToken = require('../middleware/auth');
let app = express()

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.get('/', (req, res, next)=>{
	connection.query('SELECT * FROM users', (err, result, fields)=>{
		if(err){
      res.status("Error", err)
    }
    else{
      res.json(result)
    }
	})
});

app.get('/manufacturers', (req, res, next)=>{
  let sql = `SELECT id, fname, lname, usertype, username, email, address 
             FROM users 
             WHERE usertype ='manufacturer'`
  connection.query(sql, (err, result, fields)=>{    
    if(err){
      res.status("Error", err)
    }
    else{
      res.json(result)
    }
  })
});

app.get('/requests', ensureToken, (req, res, next)=>{
  let sql = `SELECT * FROM users
             JOIN requests ON users.id = requests.request_id 
             AND user_id = ? AND status="0" `
  connection.query(sql, req.user.id, (err, result, fields)=>{    
    if(err){
      res.status("Error", err)
    }
    else{
      res.json(result)
    }    
  })
});

app.get('/vender_requests', ensureToken, (req, res, next)=>{  
  let sql = `SELECT * FROM users
             JOIN requests ON users.id = requests.request_id
             AND user_id = '${req.user.id}' AND status!=1
            `
  connection.query(sql, (err, result, fields)=>{
    if(err){
      res.status("Error", err)
    }
    else{
      res.json(result)
    }
  })
});
app.get('/venders', ensureToken, (req, res, next)=>{
  let sql = `SELECT * FROM users
             JOIN requests ON users.id = requests.request_id
             AND user_id=${req.user.id} AND status=1
            `
  connection.query(sql, (err, result, fields)=>{
    if(err){
      res.status("Error", err)
    }
    else{
      res.json(result)
    }
  })
});

app.post('/vender_request/:id', ensureToken, (req, res, next)=>{
  let paramsId = req.params.id;
  let request ={
    user_id:paramsId,
    request_id:req.user.id,
  }  
  let sql = `SELECT user_id FROM requests 
             WHERE user_id =${paramsId}  
             AND request_id = ${req.user.id}`
  connection.query(sql, (err, result, fields)=>{
    if(result.length>0){
      return res.json({status:false, message:'You have already sent a request'})
    }
    else{
      connection.query('INSERT INTO requests SET ?',  request , (err, result, fields)=>{    
        if(err){
          res.status("Error", err)
        }
        else{
          res.json(result)
        }
      })      
    }
  })
});

app.post('/vender_request/action/:id', ensureToken, (req, res, next)=>{  
  let sql = `UPDATE requests SET status =${req.body.status}
             WHERE request_id=${req.params.id}
             AND user_id=${req.user.id}
             `
  connection.query(sql, (err, result, fields)=>{
    if(err){
      return res.json({status:false, message:err})
    }
    else{
      res.json({status:false, message:'You have already sent a request'})
    }
  });
});

app.get('/user', ensureToken, (req, res, next)=>{
  connection.query('SELECT id,fname,lname,usertype,username,email,address,verified FROM users WHERE id=?', req.user.id, (err, result, fields)=>{
    res.json(result)
  })
});


module.exports = app;