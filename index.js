const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const flash = require('express-flash');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const database = require("./config/database.js");
database.connect();

const routeAdmin = require("./routes/admin/index.route.js");
const routeClient = require("./routes/client/index.route.js");
const systemConfig = require("./config/system.js");
const system = require('./config/system.js');

const app = express();
const port = process.env.PORT;

// Flash
app.use(cookieParser('HHKALKS'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());
// End Flash

// parse application/json
app.use(bodyParser.json());

app.set("views", "./views");
app.set("view engine", "pug");

app.use(express.static('public'));

// App local Variables (chỉ dùng được trong các file pug)
app.locals.prefixAdmin = systemConfig.prefixAdmin;

routeAdmin.index(app);
routeClient.index(app);

app.listen(port, () => {
    console.log(`Đang chạy trên cổng ${port}`);
})