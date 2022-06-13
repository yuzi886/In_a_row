const  express = require('express');
//Two days from now
// let time = 48 * 60 * 60 * 1000;
// var MemoryStore = require('connect').session.MemoryStore
// const cors = require('cors');
const app = express();
const session = require('express-session');
require('dotenv').config();

var MySQLStore = require('express-mysql-session')(session);

var options = {
	host: 'localhost',
	port: 3306,
	user: process.env.USER,
	password: process.env.PASS,
	database: process.env.DB
};

var sessionStore = new MySQLStore(options);

// secure and httponly must be set to false to work with backend as it's http and not https
app.use(session({
	key: 'session_cookie_name',
	secret: 'session_cookie_secret',
	store: sessionStore,
	resave: true,
	saveUninitialized: true,
	cookie: { secure: false, httpOnly: false }
}));



// Gives global accses to json for easy data handeling
app.use(express.json())

// app.use(cors({origin: 'https://localhost:3000'}));

// app.use(cors({
// 	origin: 'https://localhost:3000',
// 	methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
// 	credentials: true
//   }));

app.use('/user/', require('./routes/user'));

app.use('/guest/', require('./routes/guest'));

app.use('/game/', require('./routes/game'));

app.use('/game/randomlink/', require('./routes/randomlink'));

app.use('/game/removerandom/', require('./routes/removerandom'));

// Route to social media api code
app.use('/api/login', require('./routes/api'));



const PORT = process.env.PORT || 3001

//Where it listens
app.listen(PORT, ()=>{
    console.log(`Listening on Port: ${PORT}`);
});
