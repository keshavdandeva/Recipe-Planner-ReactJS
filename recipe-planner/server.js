const express = require('express');
const fs = require('fs');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 5000;

var cors = require('cors')
  app.use(bodyParser.json());
  app.use(cors());

app.get('/index', (req, res) => {
	let data = fs.readFileSync('Recipes.json');
	res.json(JSON.parse(data));
})

app.get('/edit/:key', (req, res) => {
const key = req.params.key;
var data = JSON.parse(fs.readFileSync('Recipes.json'));
var response = {[key]: data[key]}
res.json(JSON.stringify(response));
})

app.post('/edit/:key', (req, res) => {
	var key = req.params.key
	var write = {};
	var data = JSON.parse(fs.readFileSync('Recipes.json'));
	for (var k in data) {
		if ( k === key) {
			continue;
		} else {
			write[k] = data[k];
		}
	}
	for ( var i in req.body ) {
		write[i] = req.body[i]
	}
	fs.writeFileSync('Recipes.json', JSON.stringify(write), 'utf-8');
})

app.post('/add_recipe', (req, res) => {
	var write = {};
	var data = JSON.parse(fs.readFileSync('Recipes.json'));
	for (var key in data) {
		write[key] = data[key];
	}
	var obj = req.body;
	for (var key in obj) {
		write[key] = obj[key];
	}
	fs.writeFileSync('Recipes.json', JSON.stringify(write), 'utf-8');
})

app.delete('/destroy/:key', (req, res) => {
const key = req.params.key;
var data = JSON.parse(fs.readFileSync('Recipes.json'));
var recipes = {};
for (var k in data) {
	if ( k == key) {
		continue;
	} else {
		recipes[k] = data[k];
	}
}
fs.writeFileSync('Recipes.json', JSON.stringify(recipes), 'utf-8');
})

app.listen(5000);
console.log('server listening on port :5000');