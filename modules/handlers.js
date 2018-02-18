const fs = require('fs');
const formidable = require('formidable');
const crypto = require("crypto");
const colors = require('colors');

var id = crypto.randomBytes(4).toString("hex");
var files = [];

function addToFiles(placeholder){
    files.push(id);
    return files[placeholder];
}


exports.upload = function(request, response){
    console.log("Rozpoczynam obsługę żadania upload");
    var form = new formidable.IncomingForm();
    form.parse(request, function(error, fields, files){
        fs.renameSync(files.upload.path, addToFiles(0));
        console.log('etap 2');
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write("received image:<br/>");
        response.write("<img src='/show' />");
        response.write("<button id='return-button'>return</button>");
        response.end();
    })
}

exports.welcome = function(request, response){
    console.log("Rozpoczynam obsługę żądania welcome");
    fs.readFile('templates/start.html', function(err, html){
        response.writeHead(200, {"Content-Type": "text/html; charset=utf-8"})
        response.write(html);
        response.end();
    })
}

exports.show = function(request, response) {
    fs.readFile(files[0], "binary", function(error, file) {
        response.writeHead(200, {"Content-Type": "image/png"});
        response.write(file, "binary");
        response.end();
    })
}

exports.error = function(request, response){
    console.log("Nie wiem co robić");
    response.write("404");
    response.end();
}

