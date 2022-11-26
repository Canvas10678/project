const express = require('express');
const app = express();
const hostname = 'localhost';
const port = 3000;
const cookieParser = require("cookie-parser");
const multer = require('multer');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const { request } = require('express');
const e = require('express');

app.use(cookieParser());
app.use(express.static(__dirname));
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, 'public/img/');
    },

    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  });

const imageFilter = (req, file, cb) => {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};
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
        connect.query(sql, (err,result, fields) => {
            if (err) reject(err);
            else
                resolve(result)
        })
    })
}

app.post("/regisDB",async (req,res) => {
    let sql = "CREATE TABLE IF NOT EXISTS userInfo (id INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(255), email VARCHAR(100),password VARCHAR(100),img VARCHAR(100))";
    let result = await queryDB(sql);
    sql = `INSERT INTO userInfo (username, email, password,img) VALUES ("${req.body.username}", "${req.body.email}", "${req.body.password}",'avatar.png')`;
    result = await queryDB(sql);
    console.log("New record created successfullyone");
    return res.redirect('Login.html');
})

app.post('/checkLogin',async (req,res) => 
{ 
    let sql = `SELECT id, username, password,img FROM ${tablename}`;
    let result = await queryDB(sql);
    result = Object.assign({ }, result);
    console.log(result);
    const username = req.body.username;
    const password = req.body.password;

    let obj = Object.keys(result);
    var isCorrect = false;
    for (var i = 0; i < obj.length; i++) {
        var temp = result[obj[i]];
        var dataUsername = temp.username;
        var dataPassword = temp.password;
        if (dataUsername == username && dataPassword == password) {
            console.log("----");
            isCorrect = true;
            res.cookie('username', username);
            res.cookie('img', temp.img);
        }
    }

    if (isCorrect == true) {
        console.log("login");
        res.redirect('index.html');
    }
    else {
        console.log("Try again");
        res.redirect('Login.html?error=1');
    }
})
app.post('/profilepic', (req,res) => {
    let upload = multer({ storage: storage, fileFilter: imageFilter }).single('avatar');

    upload(req, res, (err) => {

        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        else if (!req.file) {
            return res.send('Please select an image to upload');
        }
        else if (err instanceof multer.MulterError) {
            return res.send(err);
        }
        else if (err) {
            return res.send(err);
        }
        let username = getCookie('username');
        updateImg(username, req.file.filename)
        res.cookie('img', req.file.filename);
        return res.redirect('Profile.html')
    });
    function getCookie(name) {
        var value = "";
        try {
            value = req.headers.cookie.split("; ").find(row => row.startsWith(name)).split('=')[1]
            return value
        } catch (err) {
            return false
        }
    }
})

const updateImg = async (username, filen) => {
    let sql = `UPDATE ${tablename} SET img = '${filen}' WHERE username = '${username}'`;
    let result = await queryDB(sql);
    console.log(result);
}

app.get('/logout', (req,res) => {
    res.clearCookie('username');
    res.clearCookie('img');
    return res.redirect('Login.html');
})


app.listen(port, hostname, () => {
    console.log(`Server running at   http://${hostname}:${port}/Login.html`);
});