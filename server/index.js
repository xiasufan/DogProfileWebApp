const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");

const bcrypt = require("bcrypt");
const saltRounds = 10;

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    key: "userId",
    secret: "xiasufan",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 5 * 1000,
    },
  })
);

var db_config = {
  user: "root",
  host: "localhost",
  password: "ttt111222",
  database: "own_project",
};

var db = mysql.createConnection(db_config);

function handleDisconnect() {
  db = mysql.createConnection(db_config);

  db.connect(function (err) {
    if (err) {
      console.log("error when connecting to db:", err);
      setTimeout(handleDisconnect, 2000);
    }
  });

  db.on("error", function (err) {
    console.log("db error", err);
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      handleDisconnect();
    } else {
      throw err;
    }
  });
}

handleDisconnect();

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

app.listen(3001, () => {
  console.log("server is running on port 3001");
});