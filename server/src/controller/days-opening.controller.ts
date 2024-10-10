import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { DaysOpening } from "../entity/days-opening.entity";
import { Day } from "../entity/day.entity";

export class DaysOpeningController {
    private readonly dayRepository = AppDataSource.getRepository(Day);
    private readonly daysOpeningRepository =
        AppDataSource.getRepository(DaysOpening);

    async isDayOpen(userUuid: string, dayId: number): Promise<boolean> {
        const day = await this.dayRepository.findOne({
            where: { id: dayId },
        });
        if (!day) {
            return false;
        }

        const dayIsOpen = await this.daysOpeningRepository.findOne({
            where: {
                userUuid: userUuid,
                day: { id: dayId },
            },
        });

        return !!dayIsOpen;
    }

    async checkIfDayIsOpen(request: Request, response: Response) {
        const userUuid = request.params.uuid;
        const dayId = parseInt(request.params.day);
        const dayIsOpen = await this.isDayOpen(userUuid, dayId);
        return dayIsOpen;
    }

    async getAll(request: Request, response: Response, next: NextFunction) {
        return this.daysOpeningRepository.find();
    }

    async create(request: Request, response: Response, next: NextFunction) {
        const { userUuid, dayId } = request.body;

        const day = await this.dayRepository.findOne({
            where: { id: dayId },
        });
        if (!day) {
            return "Day not found";
        }

        const dayIsAlreadOpen = await this.daysOpeningRepository.findOne({
            where: { userUuid: userUuid, day: { id: dayId } },
        });
        if (dayIsAlreadOpen) {
            return "Day is already opened";
        }

        const daysOpening = new DaysOpening();
        daysOpening.userUuid = userUuid;
        daysOpening.day = day;

        await this.daysOpeningRepository.save(daysOpening);
        return "Day is opened";
    }
}
