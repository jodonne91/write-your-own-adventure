var express = require('express');
var path = require('path');

var app = express();

var bodyParser = require('body-parser');
var multer = require('multer'); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());

var u = require("underscore")

app.use(express.static(path.join(__dirname, 'public')));
app.get("/", function(req, res){
  res.sendFile(path.join(__dirname, 'public/index.html'))
})

var pages = {}
var pageCounter = 1

var createPage = function(content) {
  var newPage = u.extend({}, content, { id: pageCounter})

  pages[pageCounter] = newPage
  pageCounter++

  return newPage
}

app.get("/api/page", function(req, res){
  res.json(u.values(pages))
})

app.get("/api/page/:page", function(req, res){
  if (pages[req.params.page]) {
    res.json(pages[req.params.page])
    return
  }
  res.sendStatus(404)
})

app.post("/api/page", function(req, res){
  res.json(createPage(req.body))
})

app.put("/api/page/:page", function(req, res){
  if (pages[req.params.page]) {
    pages[req.params.page] = u.extend({}, pages[req.params.page], req.body)
    res.json(pages[req.params.page])
    return
  }
  res.sendStatus(404)
})

app.delete("/api/page/:page", function(req, res){
  if (pages[req.params.page]) {
    var page = pages[req.params.page]
    delete pages[req.params.page]
    res.json(page)
    return
  }
  res.sendStatus(404)
})

module.exports = app;
