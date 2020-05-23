let express = require('express');
let connection = require('../config/database');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const FacebookTokenStrategy = require('passport-facebook-token');
const passport = require("passport");

require('dotenv').config();
let SECRETKEY = process.env.SECRET_KEY

const ensureToken = require('../middleware/auth');
let app = express()

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.post('/signup', (req, res, next)=>{
	let user = {
		fname:req.body.fname,
		lname:req.body.lname,
		usertype:req.body.usertype,
		username:req.body.username,
    email:req.body.email,
		password:req.body.password,
		address:req.body.address
	}

  const saltRounds = 10;
  let sqlINSERT = 'INSERT INTO users SET ?'
  let sqlSELECT = `SELECT * FROM users WHERE email='${user.email}' OR username='${user.username}'`

  connection.query(sqlSELECT, (err, result, fields)=>{
   if(result.length>0){
    return res.json({status:false, message:'User already exists'})
   }
   else{
      bcrypt.hash(user.password, saltRounds, function (err, hash) {
        user.password = hash
      	connection.query(sqlINSERT, user, function (err, result, fields) {
          	if (err) {
              res.json({
                  status:false,
                  message:'there are some error with query'
              })
            }
            else{
                res.json({
                  status:true,
                  data:result,
                  message:'user registered sucessfully'
              })
            }
        });
      });
   }
  })


});

app.post('/login', (req, res, next)=>{
  let {username, password} =  req.body;
  let sql = `SELECT * FROM users WHERE username='${username}'`;

  connection.query(sql, (error, result, fields)=>{
    if(result.length > 0){
      let {id, usertype} = result[0]      
      bcrypt.compare(password, result[0].password, function(err, bcryptresult) {                  
          if (bcryptresult === true) {
           jwt.sign({id, usertype}, SECRETKEY, /*{ expiresIn: 3600 },*/ (err, token)=>{
              if(err) res.json({error:err})
              res.json({
                status:true,
                id,
                usertype,
                token
              });
            });
          }
          else{
            res.json({
              status:false,
              message:'Invalid username / password pair!'
            })
          }
      });      
    } 
    else{
      res.json({status:false, message:'Username or Password did not match'})
    }
  });
});


passport.use('facebookToken', new FacebookTokenStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  passReqToCallback: true
}, async (req, accessToken, refreshToken, profile, done) => {  
  try {
    const {email, name, picture} = profile._json
    // console.log(profile)
    let user = {
      fname:name,
      lname:'',
      usertype:req.query.type,      
      email:email,
    }
    let sqlSELECT = `SELECT * FROM users WHERE email='${email}'`
    let sqlINSERT = 'INSERT INTO users SET ?'
    connection.query(sqlSELECT, (err, result, fields)=>{
      if(result.length>0){        
        return done(null, result[0]);
      }
      else{
        connection.query(sqlINSERT, user, function (err, result, fields) {
          connection.query(sqlSELECT, (err, result, fields)=>{
            done(null, result[0]);
          })
        });
      }
    })     
  } catch(error) {
    done(error, false, error.message);
  }
}));



app.post('/facebook', function(req, res, next) {
    passport.authenticate('facebookToken', function(err, user, info) {
        let {id, usertype} = user;              
        jwt.sign({id, usertype}, SECRETKEY, /*{ expiresIn: 3600 },*/ (err, token)=>{
          if(err) res.json({error:err})
          res.json({
            status:true,
            id,
            usertype,
            token
          });
        });     
        
        next()
    })(req, res, next);
});


module.exports = app;