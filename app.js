var mysql = require("mysql");
var express = require("express");
var app = express();

// respond with "hello world" when a GET request is made to the homepage
app.get("/", async function (req, res) {
	var con = await mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "root",
	});

	await con.connect(function (err) {
		if (err) {
			console.log(err.message);
			res.send("Failed");
		}
		console.log("connected");
	});

	res.send("hello world");
});

var server = app.listen(54321, function () {
	var port = server.address().port;
	console.log("Listening at http://localhost:%s/", port);
});
