const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const exphbs = require("express-handlebars");
const PageConfig = require("./../config/pages.js");
const redisClient = require('./../rdb.js');
const db = require('./../db.js');


// Routes
const billing_type = require('./../routes/billingType')

const cors = require('cors');

const app = express();

const hbs = exphbs.create({
  extname: ".hbs",
  defaultLayout: "main",
  layoutsDir: path.join(__dirname, "layouts"),
  partialsDir: path.join(__dirname, "partials")
});

app.use(cors());
app.use(bodyParser.json());

// Listen for pool events
db.on('acquire', connection => {
  console.log('Connection acquired from the pool');
});

db.on('release', connection => {
  console.log('Connection released back to the pool');
});


(async () => {
redisClient.on('error', (err) => {
    console.log('Redis Client Error', err);
});
redisClient.on('ready', () => console.log('Redis is ready'));
await redisClient.connect();
await redisClient.ping();
})();


app.use(bodyParser.json({ type: "application/*+json" }));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "./../dist")));
app.use(function (req, res, next) {
  res.header("X-Content-Type-Options", "nosniff");
  res.header("X-Frame-Options", "DENY");
  res.header("X-XSS-Protection", "1; mode=block");
  res.header("X-Powered-By", "IR");
  next();
});

app.engine("hbs", hbs.engine);
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "layouts"));

app.get("/", function (req, res) {
  res.redirect("/login");
});

app.get("/login", function (req, res) {
  res.render("login/index.hbs", PageConfig.getStore("login"));
});

app.get("/dashboard", function (req, res) {
  res.render("dashboard/index.hbs", PageConfig.getStore("dashboard"));
});

app.get("/internal-user/:mode", function (req, res) {
  res.render("internal-user/index.hbs", Object.assign(
    PageConfig.getStore("internal-user"),
    { mode: req.params.mode }
  ));
});

app.get("/external-user/:mode", function (req, res) {
  res.render("external-user/index.hbs", Object.assign(
    PageConfig.getStore("external-user"),
    { mode: req.params.mode }
  ));
});


app.get("/list-user", function (req, res) {
  res.render("list-user/index.hbs", PageConfig.getStore("listUser"));
});

app.get("/mis", function (req, res) {
  res.render("mis/index.hbs", PageConfig.getStore("mis"));
});
app.get("/summary-report", function (req, res) {
  res.render("summary-report/index.hbs", PageConfig.getStore("summary-report"));
});
app.get("/user-summary-report", function (req, res) {
  res.render("user-summary-report/index.hbs", PageConfig.getStore("user-summary-report"));
});
app.get("/senderId-report", function (req, res) {
  res.render("senderId-report/index.hbs", PageConfig.getStore("senderId-report"));
});
app.get("/custom-summary-report", function (req, res) {
  res.render("custom-summary-report/index.hbs", PageConfig.getStore("custom-summary-report"));
});

app.get("/organization-management/:mode", function (req, res) {
  res.render("organization-management/index.hbs", Object.assign(
    PageConfig.getStore("organization-management"),
    { mode: req.params.mode }
  ));
});

app.get("/department-management/:mode", function (req, res) {
  res.render("department-management/index.hbs", Object.assign(
    PageConfig.getStore("department-management"),
    { mode: req.params.mode }
  ));
});

app.get("/senderId-management/:mode", function (req, res) {
  res.render("senderId-management/index.hbs", Object.assign(
    PageConfig.getStore("senderId-management"),
    { mode: req.params.mode }
  ));
});

app.get("/credits-management/:mode", function (req, res) {
  res.render("credits-management/index.hbs", Object.assign(
    PageConfig.getStore("credits-management"),
    { mode: req.params.mode }
  ));
});
app.get("/generate-api", function (req, res) {
  res.render("generate-api/index.hbs", PageConfig.getStore("generateApi"));
});
app.get("/connect-management", function (req, res) {
  res.render("connect-management/index.hbs", PageConfig.getStore("connectMgmt"));
});

app.get("/routing", function (req, res) {
  res.render("routing/index.hbs", PageConfig.getStore("routing"));
});

app.get("/bulk-routing", function (req, res) {
  res.render("bulk-routing/index.hbs", PageConfig.getStore("bulk-routing"));
});

app.get("/error-code-mapping", function (req, res) {
  res.render("error-code-mapping/index.hbs", PageConfig.getStore("error-code-mapping"));
});

app.get("/ssmp-session-mgmt", function (req, res) {
  res.render("ssmp-session-mgmt/index.hbs", PageConfig.getStore("ssmpSessionMgmt"));
});

app.get("/smsc-mgmt/:mode", function (req, res) {
  res.render("smsc-mgmt/index.hbs", Object.assign(
    PageConfig.getStore("smscMgmt"),
    { mode: req.params.mode }
  ));
});

app.get("/operator-summary", function (req, res) {
  res.render("operator-summary/index.hbs", PageConfig.getStore("operatorSummary"));
});

app.get("/logo-upload", function (req, res) {
  res.render("logo-upload/index.hbs", PageConfig.getStore("logoUpload"));
});
app.get("/user-profile", function (req, res) {
  res.render("user-profile/index.hbs", PageConfig.getStore("user-profile"));
});
app.get("/error-code", function (req, res) {
  res.render("error-code/index.hbs", PageConfig.getStore("error-code"));
});
app.get("/downloadReport", function (req, res) {
  res.render("downloadReport/index.hbs", Object.assign(
    PageConfig.getStore("downloadReport")
  ));
});
app.get("*", function (req, res) {
  res.status(404).send("404 - Not Found!!!");
});

// Express Backend Endpoints
app.use('/api/billing_type/' , billing_type);


var server = app.listen(8099, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log("Genesis listening at http://%s:%s", host, port);
});
