// Happy coding guys
/**
 * 
 * npx sequelize-cli model:generate --name Store --attributes name:string,code:string,location:string,category:string
 * npx sequelize-cli model:generate --name Employee --attributes firstName:string,lastName:string,dateOfBirth:date,education:string,position:string,StoreId:integer
 * npx sequelize-cli migration:generate --name addSalaryToEmployee
 * 
*/

const express = require('express')
const app = express()
const port = 3005
const router = require('./routes')

// app.get('/', (req, res) => {
//   res.send(`Hello World!`)
// })

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

  
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(router);