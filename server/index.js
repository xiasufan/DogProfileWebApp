const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");
const Axios = require("axios")
const OpenAI = require("openai")

require('dotenv').config();


app.use(
  cors({
    origin: [process.env.CORS_ORIGIN],
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE'
  })
);

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });


const bcrypt = require("bcrypt");
const saltRounds = 10;

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

app.use(express.json());


app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('trust proxy', 1);




app.use(
  session({
    key: "userId",
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 5 * 1000,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', 
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : undefined
      
    },
  })
);

var db_config = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  connectionLimit: 5, // Set the maximum number of connections
  waitForConnections: true, // When no connections are available, wait for one
  queueLimit: 20, // limit on the number of queued connection requests
};

const db = mysql.createPool(db_config);

// Error handling for the connection pool
db.on('error', function(err) {
  console.error('Database error: ', err);
  // Log the state of the connection pool
  console.log('Total connections in pool: ', pool.totalConnections());
  console.log('Free connections in pool: ', pool.freeConnections());
  console.log('Connection queue length: ', pool.queue.length);
});

app.post('/api/chat', async (req, res) => {
  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: req.body.prompt }],
      model: "gpt-4",
    });
    console.log(completion.choices[0].message.content);

    // 将GPT-4的响应发送回客户端
    res.json(completion.choices[0].message.content);
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.log(err);
    }

    const sql = "INSERT INTO users (username, password, role) VALUES (?,?,?)";
    const values = [username, hash, "user"];

    db.query(sql, values, (err, result) => {
      if (err) {
        console.error(err);
        res.send({ message: "Registration failed.. User might already exist" });
      } else {
        console.log("SQL query:", sql, "with values:", values);
        res.send({ message: "Registration successful ^_^" });
      }
    });
  });
});

app.get('/test-cookie', (req, res) => {
  res.cookie('test', 'value', { maxAge: 900000, httpOnly: true, secure: true, sameSite: 'None' });
  res.send('Test cookie set');
});

app.get("/login", (req, res) => {
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    res.send({ loggedIn: false });
  }
});

app.get("/logout", (req, res) => {
  if (req.session.user) {
    req.session.destroy();
  } else {
    res.send({ message: "invalid session" });
  }
});




app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  db.query(
    "SELECT * FROM users WHERE username=?",
    [username],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        if (result.length > 0) {
          bcrypt.compare(password, result[0].password, (error, response) => {
            if (response) {
              req.session.user = result;
              res.send({ message: "Login successful", user: result });
            } else {
              res.send({ message: "failed to match password" });
            }
          });
        } else {
          res.send({ message: "failed to match username" });
        }
      }
    }
  );
});

process.on('exit', () => {
  pool.end((err) => {
    if (err) {
      console.error('Error closing the pool: ', err);
    } else {
      console.log('Pool has been closed.');
    }
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});