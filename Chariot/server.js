const express = require ('express');
const path = require('path');
const mongoose = require('mongoose');
const secret = require('./secret/secret.js');

//connect to the database

mongoose.connect(secret.database, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console,'connection error:'));
db.once('open', function(){
	console.log('connected to the database');
});

//init the app

const app = express();

// view engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//set the public folder
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req,res, next){
	res.render('index',
		{
			title:'index'
		});
});

app.listen(3000, function(err){
	if(err){
		return (err);
	}
	else{
		console.log('running on port 3000');
	}

});