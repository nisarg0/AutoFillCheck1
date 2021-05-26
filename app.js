var mysql = require("mysql");
var express = require("express");
const { query } = require("express");
var app = express();

// To allow cors
app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept"
	);
	next();
});

// respond with "hello world" when a GET request is made to the homepage
app.get("/api/users", async function (req, res) {
	const id = req.query.id;

	var con = mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "root",
		database: "autofill1",
	});

	con.connect(async function (err) {
		if (err) {
			console.log(err.message);
			res.send("Failed");
		}
		var script = "SELECT * FROM userdetails AS usr WHERE usr.ID = id";
		con.query(script, function (err, result, fields) {
			if (err) throw err;
			res.send(result);
		});
	});
});

var server = app.listen(54321, function () {
	var port = server.address().port;
	console.log("Listening at http://localhost:%s/", port);
});
