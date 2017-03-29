const express = require("express"),
      hbs     = require("hbs"),
      fs      = require("fs");

var app = express();

hbs.registerPartials(__dirname + "/views/partials"); //this allows hbs to use partials
app.set("view engine", "hbs");
app.use(express.static(__dirname + "/public")); //this is middleware that connects the app.get

app.use((req, res, next) => { //this is middleware
    var now = new Date().toString();
    var log =`${now}: ${req.method} | ${req.path}`;
    console.log(log);
    fs.appendFile("server.log", log + "\n", (err) => {
        if(err){
            console.log("Unable to append to server.log");
        }
    });
    next();
});

hbs.registerHelper("getCurrentYear", () => {
    return new Date().getFullYear();
});

hbs.registerHelper("screamIt", (text) => {
    return text.toUpperCase();
});

app.get("/", (req, res) => {
    res.render("home.hbs", {
        pageTitle: "Welcome Page",
        welcomeMessage: "This is the welcome page! Welcome!"
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
        pageTitle: "About Page"
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

app.get("/maintenance", (req, res) =>{
    res.render("maintenance.hbs", {
        pageTitle: "Maintenance",
        pageMessage: "This page is underconstruction",
        pageMean: "Now go away!"
    });
});

app.get("*", (req, res) => {
    res.render("notfound.hbs", {
        pageTitle: "Page Not Found",
        pageQuestion: "What are you doing with your life?"
    });
});

app.listen(3000, process.env.IP, () => {
    console.log("Server is up on Port 3000.");
});
