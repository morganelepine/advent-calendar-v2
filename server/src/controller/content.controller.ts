import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { Content } from "../entity/content.entity";
import { Day } from "../entity/day.entity";

export class ContentController {
    private contentRepository = AppDataSource.getRepository(Content);
    private dayRepository = AppDataSource.getRepository(Day);

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
        const { type, urlContent, textContent, dayId } = request.body;

        const day = await this.dayRepository.findOne({
            where: { id: dayId },
        });
        if (!day) {
            return response.status(404).json({ message: "Day not found" });
        }

        const content = new Content();
        content.type = type;
        content.urlContent = urlContent;
        content.textContent = textContent;
        content.day = day;

        await this.contentRepository.save(content);

        return response
            .status(200)
            .json({ message: "Content created successfully", content });
    }

    async update(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id);
        const { type, urlContent, textContent } = request.body;

        const content = await this.contentRepository.findOne({
            where: { id },
        });

        content.type = type;
        content.urlContent = urlContent;
        content.textContent = textContent;

        await this.contentRepository.save(content);

        response.status(200).json({ message: "update", content });
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
