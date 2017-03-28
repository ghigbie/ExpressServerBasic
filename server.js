const express = require("express"),
      hbs     = require("hbs");

var app = express();

app.set("view engine", "hbs");
app.use(express.static(__dirname + "/public")); //this is middleware that connects the app.get

app.get("/", (req, res) => {
    res.render("home.hbs", {
        pageTitle: "Welcome Page",
        welcomeMessage: "This is the welcome page! Welcome!",
        currentYear: new Date().getFullYear();
    });
    //res.send("<h1>Hello Express!</h1>");
    // res.send({
    //     name: "George",
    //     likes: [
    //         "Running",
    //         "Biking",
    //         "Greek Food",
    //         "New Places",
    //         "Weight Training"
    //     ]
    // });
});

app.get("/about", (req, res) => {
    res.render("about.hbs", {
        pageTitle: "About Page",
        currentYear: new Date().getFullYear()
    });
});

app.get("/moreinfo",  (req, res) => {
    res.send("<h1>There's a lot more information on this page</h1>");
});

app.get("/bad", (req, res) => {
    res.send({
        error: "There was an error requesting this page"
    });
});

app.listen(3000, process.env.IP, () => {
    console.log("Server is up on Port 3000.");
});
