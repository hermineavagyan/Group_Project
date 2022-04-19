const UserController  = require("../controllers/user.controller");
const {authenticate} = require("../config/jwt.config")
const {authenticateRole} = require("../config/jwt.config")

module.exports = (app)=>{
    app.get("/api/allUsers", authenticate, authenticateRole(['U']), UserController.findAllUsers);
    //app.get("/api/allUsers",UserController.findAllUsers);
    app.get("/api/allUsers", UserController.findAllUsers);
    app.post("/api/users/register", UserController.register);
    app.post("/api/users/login", UserController.login);
    app.post("/api/users/logout", UserController.logout);
    app.delete("/api/users/:id", UserController.deleteOneUser);
    app.get("/api/users", authenticate, UserController.getLoggedInUser);

    //app.get("/api/users", UserController.getLoggedInUser);

    //This is accessed by only Admin user
//route.get('/users', authenticateRole(['M']), handler)
//This is accessed by anyone
//route.get('/posts', authenticateRole(['M','U','A']))
}