const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const data = require('./data');
const currentPath = path.resolve(__dirname);

function createCss(data) {
    if (fs.existsSync(currentPath + '/index.css')) {
        console.log(data);
        let newData = [];

        data.class.map(function(className) {
            newData.push(className.name + '{ ' + className.property + ': ' + className.value + '; }' );
        });

        newData.map(function(className) {
            fs.appendFile(currentPath + '/index.css', className, function (err) {
                if (err) throw err;
                
                console.log('Saved!');
            });
        });
    } else {
        fs.writeFile(currentPath + '/index.css', data.data, function(err) {
            if(err) {
                return console.log(err);
            }

            console.log("The file was saved!");
        }); 
    }
}

app.use(bodyParser.json())

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/src/index.html'));
});

app.post('/test', function(req, res) {
    res.send(req.body);
    createCss(req.body);
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})