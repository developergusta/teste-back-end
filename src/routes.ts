import { Router } from "express";
import { UserController } from "./controllers/UserController";

const routes = Router();

const userController = new UserController();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management and retrieval
 */

/**
 * @swagger
 * /users:
 *  get:
 *      summary: Get all users
 *      responses:
 *          200:
 *              description: The list of users
 *              content:             
 *                  application/json:
 *                      schema:
 *                          type: array
 *                              items:
 *                                  $ref: '#/components/schemas/User'
 */
routes.get("/users", userController.listUsers);
routes.get("/users/:user_id", userController.getUser);
routes.post("/users", userController.create);
routes.put("/users/:user_id", userController.update);
routes.delete("/users", userController.delete);


export { routes } ;