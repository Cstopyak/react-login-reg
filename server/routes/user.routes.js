const { authenticate } = require('../config/jwt.config');
const loginRegController = require('../controllers/loginReg.controller');
const UserController= require('../controllers/user.controller');
   

    module.exports = (app) => {
        app.post("/api/register", loginRegController.register);
        app.post("api/login", loginRegController.login);
        
        //authenticate and goes through JWT
        app.get("/api/users", authenticate, UserController.index);
        app.get("api/logout", authenticate, loginRegController.logout);
    }