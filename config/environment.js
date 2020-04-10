require('dotenv').config();
let env = process.env
let db
let DEV = false

if(DEV==true){
	db = {
			HOST: env.HOST,
		  DATABASE: env.DATABASE,
		  PASSWORD: env.PASSWORD,
		  USER: env.USER
		}	
}
else{
	db = {
			HOST     : env.MYSQL_ADDON_HOST,
    	DATABASE : env.MYSQL_ADDON_DB,
    	USER     : env.MYSQL_ADDON_USER,
    	PASSWORD : env.MYSQL_ADDON_PASSWORD
		}
}

module.exports  = db