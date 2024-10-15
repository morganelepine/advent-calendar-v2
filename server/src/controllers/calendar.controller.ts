import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { Calendar } from "../entity/calendar.entity";

export class CalendarController {
    private readonly calendarRepository = AppDataSource.getRepository(Calendar);

    async getAll(request: Request, response: Response, next: NextFunction) {
        return this.calendarRepository.find();
    }

    async getOne(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id);

        const calendar = await this.calendarRepository.findOne({
            where: { id },
        });

        if (!calendar) {
            return "unknown calendar";
        }

        return calendar;
    }
}
