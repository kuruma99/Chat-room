var express = require('express');
var bodyParser = require('body-parser');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var app = express();
var mongoose = require('mongoose');
var server = app.listen(3000, () => {
	console.log('server is running on port', server.address().port);
});


app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

var Message = mongoose.model('Message', {
	name: String,
	message: String
})

app.get('/messages', (req,res) => {
	Message.find({}, (err,messages)=> {
		res.send(messages);
	})
})

app.get('/messages/:user', (req, res) =>{
	var user = req.params.user;
	Message.find({name: user}, (err, messages) =>{
		res.send(messages);
	})
})

app.post('/messages', async(req, res) => {
	try{
	var message = new Message(req.body);
	
	var savedMessage = await message.save()
	console.log('saved');
	res.sendStatus(200);

	}
	catch(error){
		res.sendStatus(500);
		return console.log('error', error);
	}
	finally{
		console.log('Message Posted');
	}
})



