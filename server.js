
require('dotenv').config();

const express = require("express"),
    app = express(),
    port = process.env.PORT,
    cors = require("cors"),
    cookieParser = require("cookie-parser");
    server = app.listen(port, () => console.log(`ready to go on port ${port}`));





app.use(cookieParser());
app.use(cors({credentials: true, origin:'http://localhost:3000'}));
app.use(express.json()); 
app.use(express.urlencoded({extended: true}));

// bring routes in with the project.
require('./server/routes/user.routes')(app);
require('./server/config/database.config');

