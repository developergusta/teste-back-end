import { Request, Response } from "express";
import { IUserCreate } from "../interfaces/IUserCreate";
import { User } from "../models/User";
import { UserService } from "../services/UserService";



export class UserController {

    async create(request: Request, response: Response) {
        const { email, birth_date, first_name, last_name, nick_name, password, phone_number }: IUserCreate = request.body;

        const usersService = new UserService();
        const user = await usersService.create({ email, birth_date, first_name, last_name, nick_name, password, phone_number });

        return response.json(user);
    }

    async listUsers(response: Response) {
        const usersService = new UserService();
        const users = await usersService.list();

        return response.json(users)
    }

    async getUser(request: Request, response: Response) {
        try {
            const { user_id } = request.params;

            const usersService = new UserService();
            const user = await usersService.findByUserId(user_id);
            return response.json(user)
        } catch (error) {
            console.error(error.message)
            return response.json({ message: 'User not found' })
        }
    }

    async update(request: Request, response: Response) {
        try {
            const { user_id } = request.params;
            const { email, birth_date, first_name, last_name, nick_name, password, phone_number }: IUserCreate = request.body;
            const usersService = new UserService();
            await usersService.update(user_id, { email, birth_date, first_name, last_name, nick_name, password, phone_number });
            return response.json({ message: 'User updated' })
        } catch (error) {
            console.error(error.message)
            return response.json({ message: 'Error on update' })
        }
    }

    async delete(request: Request, response: Response) {
        const { user_id } = request.body;
        const usersService = new UserService();
        const removed = await usersService.delete(user_id);

        if (!removed) {
            return response.json({ message: 'User not found' })
        } else {
            return response.json({ message: 'User removed' })
        }
    }

}