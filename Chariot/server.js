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

const pages = require ('./routes/pages.js');
const adminPages = require('./routes/admin_pages.js');

app.use('/admin/pages', adminPages);
app.use('/', pages);

app.listen(3000, function(err){
	if(err){
		return (err);
	}
	else{
		console.log('running on port 3000');
	}

});