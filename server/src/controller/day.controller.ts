import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { Day } from "../entity/day.entity";

export class DayController {
    private dayRepository = AppDataSource.getRepository(Day);

    async getAll(request: Request, response: Response, next: NextFunction) {
        return this.dayRepository.find();
    }

    async getOne(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id);

        const day = await this.dayRepository.findOne({
            where: { id },
        });

        if (!day) {
            return "unknown day";
        }
        return day;
    }

    async create(request: Request, response: Response, next: NextFunction) {
        const { calendar, dayNumber, isOpen, openAt } = request.body;

        const day = new Day();
        day.calendar = calendar;
        day.dayNumber = dayNumber;
        day.isOpen = isOpen;
        day.openAt = openAt;

        await this.dayRepository.save(day);

        return response
            .status(200)
            .json({ message: "day created successfully", day });
    }

    async update(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id);
        const { dayNumber, isOpen, openAt } = request.body;

        const day = await this.dayRepository.findOne({
            where: { id },
        });

        day.dayNumber = dayNumber;
        day.isOpen = isOpen;
        day.openAt = openAt;

        await this.dayRepository.save(day);

        response.status(200).json({ message: "update", day });
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id);

        let dayToRemove = await this.dayRepository.findOneBy({ id });

        if (!dayToRemove) {
            return "this day not exist";
        }

        await this.dayRepository.remove(dayToRemove);

        return "day has been removed";
    }
}
