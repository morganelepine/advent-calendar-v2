import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { User } from "../entity/user.entity";

export class UserController {
    private readonly userRepository = AppDataSource.getRepository(User);

    async getAll(request: Request, response: Response, next: NextFunction) {
        return this.userRepository.find();
    }

    async getOne(request: Request, response: Response, next: NextFunction) {
        const uuid = request.params.uuid;

        const user = await this.userRepository.findOne({
            where: { uuid },
        });

        if (!user) {
            return "Unregistered user";
        }
        return user;
    }

    async save(request: Request, response: Response, next: NextFunction) {
        const { uuid, score } = request.body;
        const user = Object.assign(new User(), {
            uuid,
            score,
        });
        await this.userRepository.save(user);
        return "User has been created";
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const uuid = request.params.uuid;

        const userToRemove = await this.userRepository.findOneBy({ uuid });
        if (!userToRemove) {
            return "This user not exist";
        }

        await this.userRepository.remove(userToRemove);
        return "User has been removed";
    }
}
