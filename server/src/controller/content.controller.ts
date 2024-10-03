import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { Content } from "../entity/content.entity";
import { Day } from "../entity/day.entity";

export class ContentController {
    private readonly contentRepository = AppDataSource.getRepository(Content);
    private readonly dayRepository = AppDataSource.getRepository(Day);

    async getAll(request: Request, response: Response, next: NextFunction) {
        return this.contentRepository.find();
    }

    async getOne(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id);

        const content = await this.contentRepository.findOne({
            where: { id },
        });

        if (!content) {
            return response.status(404).json({ message: "Content not found" });
        }
        return content;
    }

    async create(request: Request, response: Response, next: NextFunction) {
        const { type, content1, content2, content3, content4, dayId } =
            request.body;

        const day = await this.dayRepository.findOne({
            where: { id: dayId },
        });
        if (!day) {
            return response.status(404).json({ message: "Day not found" });
        }

        const contentToCreate = new Content();
        contentToCreate.type = type;
        contentToCreate.content1 = content1;
        contentToCreate.content2 = content2;
        contentToCreate.content3 = content3;
        contentToCreate.content4 = content4;
        contentToCreate.day = day;

        await this.contentRepository.save(contentToCreate);

        return response
            .status(200)
            .json({ message: "Content created successfully", contentToCreate });
    }

    async update(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id);
        const { type, content1, content2, content3, content4 } = request.body;

        const contentToUpdate = await this.contentRepository.findOne({
            where: { id },
        });

        contentToUpdate.type = type;
        contentToUpdate.content1 = content1;
        contentToUpdate.content2 = content2;
        contentToUpdate.content3 = content3;
        contentToUpdate.content4 = content4;

        await this.contentRepository.save(contentToUpdate);

        response.status(200).json({ message: "update", contentToUpdate });
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id);

        let contentToRemove = await this.contentRepository.findOneBy({ id });

        if (!contentToRemove) {
            return response.status(404).json({ message: "Content not found" });
        }

        await this.contentRepository.remove(contentToRemove);

        return "Content has been removed";
    }
}
