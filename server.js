const express = require('express');
const app = express();
const hostname = 'localhost';
const port = 3000;
const bodyParser = require('body-parser');
const mysql = require('mysql');
const { request } = require('express');


app.use(express.static(__dirname));
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));

const connect = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "0991947939",
    database : "mydata"
})

connect.connect(err => {
    if(err) throw(err);
    else{
        console.log("MySQL connected");
    }
})
let tablename = "userInfo";
const queryDB = (sql) => {
    return new Promise((resolve,reject) => {
        con.query(sql, (err,result, fields) => {
            if (err) reject(err);
            else
                resolve(result)
        })
    })
}


app.post('/addDB', async (req,res) => {
    let sql = "CREATE TABLE IF NOT EXISTS userInfo (id INT AUTO_INCREMENT PRIMARY KEY, reg_date TIMESTAMP, username VARCHAR(255), email VARCHAR(100),password VARCHAR(100))";
    let result = await queryDB(sql);
    sql = `INSERT INTO userInfo (username, email) VALUES ("${req.body.username}", "${req.body.email}")`;
    result = await queryDB(sql);
    console.log("New record created successfullyone");
    res.end("New record created successfully");
})



app.listen(port, hostname, () => {
    console.log(`Server running at   http://${hostname}:${port}/`);
});