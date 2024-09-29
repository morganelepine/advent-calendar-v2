import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { Day } from "../entity/day.entity";

export class DayController {
    private dayRepository = AppDataSource.getRepository(Day);

    private validateDayId(request: Request, response: Response): number | null {
        const id = parseInt(request.params.id);
        if (isNaN(id)) {
            response.status(400).json({ message: "Invalid day ID" });
            return null;
        }
        return id;
    }

    async getAll(request: Request, response: Response, next: NextFunction) {
        return this.dayRepository.find();
    }

    async getOne(request: Request, response: Response, next: NextFunction) {
        try {
            const id = this.validateDayId(request, response);
            const day = await this.dayRepository.findOne({
                where: { id },
            });

            if (!day) {
                return response.status(404).json({ message: "Day not found" });
            }

            return day;
        } catch (error) {
            return response
                .status(500)
                .json({ message: "Server error", error });
        }
    }

    async getDayContents(
        request: Request,
        response: Response,
        next: NextFunction
    ) {
        try {
            const id = this.validateDayId(request, response);
            const day = await this.dayRepository.findOne({
                where: { id },
                relations: ["contents"],
            });

            if (!day) {
                return response.status(404).json({ message: "Day not found" });
            }

            return day.contents;
        } catch (error) {
            return response
                .status(500)
                .json({ message: "Server error", error });
        }
    }

    async create(request: Request, response: Response, next: NextFunction) {
        try {
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
        } catch (error) {
            return response
                .status(500)
                .json({ message: "Server error", error });
        }
    }

    async update(request: Request, response: Response, next: NextFunction) {
        try {
            const id = this.validateDayId(request, response);

            const { dayNumber, isOpen, openAt } = request.body;

            const day = await this.dayRepository.findOne({
                where: { id },
            });

            day.dayNumber = dayNumber;
            day.isOpen = isOpen;
            day.openAt = openAt;

            await this.dayRepository.save(day);

            response.status(200).json({ message: "update", day });
        } catch (error) {
            return response
                .status(500)
                .json({ message: "Server error", error });
        }
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        try {
            const id = this.validateDayId(request, response);

            let dayToRemove = await this.dayRepository.findOneBy({ id });
            if (!dayToRemove) {
                return response.status(404).json({ message: "Day not found" });
            }

            await this.dayRepository.remove(dayToRemove);

            return "day has been removed";
        } catch (error) {
            return response
                .status(500)
                .json({ message: "Server error", error });
        }
    }
}
