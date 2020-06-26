const express = require('express');
const multer = require('multer');
const upload = multer();
const fs = require('fs');
var cors = require('cors')

var app = express();
app.use(cors())
app.use(express.static('fileupload'));

app.post('/upload/', upload.any(), (req, res) => {
    console.log('POST /post_pdf/');
    console.log('Files: ', req.files);
    fs.writeFile(`./fileupload/${req.files[0].originalname}`, req.files[0].buffer, (err) => {
        if (err) {
            console.log('Error: ', err);
            res.status(500).send('An error occurred: ' + err.message);
        } else {
            res.status(200).send('ok');
        }
    });
});

app.get('/listpdf',(req, res) => {
    fs.readdir('./fileupload/', function (err, files) {
        const list = [];
        //handling error
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        } 
        //listing all files using forEach
        files.forEach(function (file) {
            // Do whatever you want to do with the file
            list.push(file); 
        });
        res.json({
            lists:list
        })
    });
    
})

app.listen(8081);