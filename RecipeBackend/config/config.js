require("dotenv").config()

module.exports={
  "development": {
    "username": process.env.USER_NAME,
    "password": process.env.PASSWORD,
    "database":process.env.DATABASE_NAME,
    "host":process.env.HOST,
    "dialect":process.env.DIALECT
  },
  "test": {
   "username": process.env.USER_NAME,
    "password": process.env.PASSWORD,
    "database": process.env.DATABASE_NAME,
    "host":process.env.HOST,
    "dialect":process.env.DIALECT
  },
  "production": {
    "username": process.env.USER_NAME,
    "password": process.env.PASSWORD,
    "database": process.env.DATABASE_NAME,
    "host":process.env.HOST,
    "dialect":process.env.DIALECT
  }
}
