require('dotenv').config();
let env = process.env
let db
let DEV = false

if(DEV==true){
	db = {
			HOST: env.HOST,
		  USER: env.USER,
		  PASSWORD: env.PASSWORD,
		  DATABASE: env.DATABASE
		}	
}
else if(DEV==false){
	db = {
			HOST     : env.MYSQL_ADDON_HOST,
    	DATABASE : env.MYSQL_ADDON_DB,
    	HOST     : env.MYSQL_ADDON_USER,
    	PASSWORD : env.MYSQL_ADDON_PASSWORD
		}
}

module.exports  = db