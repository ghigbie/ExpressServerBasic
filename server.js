const express = require("express");

var app = express();

app.get("/", (req, res) => {
    res.send("Hello Express!");
});

app.listen(3000, process.env.IP, () => {
    console.log("Server is running");
});
