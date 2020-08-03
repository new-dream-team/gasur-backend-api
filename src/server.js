const express = require('express');

const app = express();
const cors = require('cors');
const mongoose = require('mongoose')

const routes = require('./routes');
mongoose.connect('mongodb+srv://Gasur:@Southpark216@cluster0-ud8cr.mongodb.net/Gasur?retryWrites=true&w=majority',{
	useNewUrlParser :true,
	useUnifiedTopology:true
})

app.use(cors());
app.use(express.json());
app.use(routes);

let port = process.env.PORT;
if (!port) {
	port = 3333;
}

app.listen(port);
