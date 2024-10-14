import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { User } from "../entity/user.entity";
import { Day } from "../entity/day.entity";
import { Score } from "../entity/score.entity";

export class ScoreController {
    private readonly userRepository = AppDataSource.getRepository(User);
    private readonly dayRepository = AppDataSource.getRepository(Day);
    private readonly scoreRepository = AppDataSource.getRepository(Score);

    async getUser(uuid: string) {
        const user = await this.userRepository.findOne({
            where: { uuid },
        });
        return user;
    }

    async getDay(id: number) {
        const day = await this.dayRepository.findOne({
            where: { id },
        });
        return day;
    }

    async awardPoints(
        request: Request,
        response: Response,
        next: NextFunction
    ) {
        const { userUuid, dayId, points, reason } = request.body;

        const user = await this.getUser(userUuid);
        const day = await this.getDay(dayId);

        const scoreOfTheDay = await this.scoreRepository.find({
            where: {
                user: { id: user.id },
                day: { id: day.id },
                reason: reason,
            },
        });

        if (
            reason === "l'ouverture d'un contenu" &&
            scoreOfTheDay.length >= 5
        ) {
            return "All points for content openings have been awarded";
        }
        if (
            reason === "une bonne réponse à un jeu" &&
            scoreOfTheDay.length >= 4
        ) {
            return "All points for the game have been awarded";
        }

        const score = new Score();
        score.user = user;
        score.day = day;
        score.points = points;
        score.reason = reason;
        await this.scoreRepository.save(score);

        user.score += points;
        await this.userRepository.save(user);

        return "Score is saved";
    }

    async getUserScore(
        request: Request,
        response: Response,
        next: NextFunction
    ) {
        const uuid = request.params.uuid;

        const user = await this.userRepository.findOne({
            where: { uuid },
            relations: ["scoreHistory", "scoreHistory.day"],
        });

        if (!user) {
            return "Unregistered user";
        }

        const scoresByDate = user.scoreHistory.reduce(
            (groupedScores, score) => {
                const earnedAtDate = score.earnedAt.toLocaleDateString("fr-FR");

                if (!groupedScores[earnedAtDate]) {
                    groupedScores[earnedAtDate] = [];
                }

                groupedScores[earnedAtDate].push({
                    id: score.id,
                    points: score.points,
                    reason: score.reason,
                    day: score.day,
                    earnedAt: score.earnedAt,
                });

                return groupedScores;
            },
            {} as Record<string, any[]>
        );

        return { score: user.score, scoresByDate: scoresByDate };
    }
}
