import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { User } from "../entity/user.entity";

export class UserController {
    private userRepository = AppDataSource.getRepository(User);

    async getAll(request: Request, response: Response, next: NextFunction) {
        return this.userRepository.find();
    }

    async getOne(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id);

        const user = await this.userRepository.findOne({
            where: { id },
        });

        if (!user) {
            return "unregistered user";
        }
        return user;
    }

    async save(request: Request, response: Response, next: NextFunction) {
        const { username, email, password, role } = request.body;

        const user = Object.assign(new User(), {
            username,
            email,
            password,
            role,
        });

        return this.userRepository.save(user);
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id);

        let userToRemove = await this.userRepository.findOneBy({ id });

        if (!userToRemove) {
            return "this user not exist";
        }

        await this.userRepository.remove(userToRemove);

        return "user has been removed";
    }
}
