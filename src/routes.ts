import { Router } from "express";
import { UserController } from "./controllers/UserController";

const routes = Router();

const userController = new UserController();

routes.get("/users", userController.listUsers);
routes.get("/users/:user_id", userController.getUser);
routes.post("/users", userController.create);
routes.put("/users/:user_id", userController.update);
routes.delete("/users", userController.delete);


export { routes } ;