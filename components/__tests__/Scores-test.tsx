import {
    updateScores,
    checkContentOpeningScore,
    checkGameScore,
} from "@/services/score.service";
import { Score } from "@/interfaces/scoreInterfaces";
import { ScoreType } from "@/enums/enums";

const createScoreOfTheDay = (): Score => ({
    dayNumber: 24,
    scoreTotal: 40,
    scoreDetails: {
        dayOpening: 0,
        contentOpening: 0,
        game: {
            correctAnswer: 0,
            played: false,
        },
    },
});

const mockDate = () => {
    const date = new Date(2024, 10, 24);
    jest.spyOn(global, "Date").mockImplementation(() => date);
};

describe("Check content opening score", () => {
    let scoreOfTheDay: Score;

    beforeEach(() => {
        scoreOfTheDay = createScoreOfTheDay();
    });

    it("Should add 20 points if content is opened ON TIME and score is < 80 ", async () => {
        mockDate();

        scoreOfTheDay.scoreDetails.contentOpening = 40;
        const addedScore = await checkContentOpeningScore(24, scoreOfTheDay);

        expect(scoreOfTheDay.scoreDetails.contentOpening).toBe(60);
        expect(addedScore).toBe(20);
    });

    it("Should add only 10 points if content is opened LATE and score is < 40 ", async () => {
        mockDate();

        scoreOfTheDay.scoreDetails.contentOpening = 20;
        const addedScore = await checkContentOpeningScore(20, scoreOfTheDay);

        expect(scoreOfTheDay.scoreDetails.contentOpening).toBe(30);
        expect(addedScore).toBe(10);
    });

    it("Should NOT add any points if content is opened ON TIME but score is > 80 ", async () => {
        mockDate();

        scoreOfTheDay.scoreDetails.contentOpening = 80;
        const addedScore = await checkContentOpeningScore(24, scoreOfTheDay);

        expect(scoreOfTheDay.scoreDetails.contentOpening).toBe(80);
        expect(addedScore).toBe(0);
    });

    it("Should NOT add any points if content is opened LATE and score is > 40 ", async () => {
        mockDate();

        scoreOfTheDay.scoreDetails.contentOpening = 40;
        const addedScore = await checkContentOpeningScore(20, scoreOfTheDay);

        expect(scoreOfTheDay.scoreDetails.contentOpening).toBe(40);
        expect(addedScore).toBe(0);
    });
});

describe("Check game score", () => {
    let scoreOfTheDay: Score;

    beforeEach(() => {
        scoreOfTheDay = createScoreOfTheDay();
    });

    it("Should add 20 points if game is played ON TIME and score is < 60 ", async () => {
        mockDate();

        scoreOfTheDay.scoreDetails.game.correctAnswer = 0;
        const addedScore = await checkGameScore(24, scoreOfTheDay);

        expect(scoreOfTheDay.scoreDetails.game.correctAnswer).toBe(20);
        expect(addedScore).toBe(20);
    });

    it("Should add only 10 points if game is played LATE and score is < 30 ", async () => {
        mockDate();

        scoreOfTheDay.scoreDetails.game.correctAnswer = 0;
        const addedScore = await checkGameScore(20, scoreOfTheDay);

        expect(scoreOfTheDay.scoreDetails.game.correctAnswer).toBe(10);
        expect(addedScore).toBe(10);
    });

    it("Should NOT add any points if game is played ON TIME but score is > 60 ", async () => {
        mockDate();

        scoreOfTheDay.scoreDetails.game.correctAnswer = 60;
        const addedScore = await checkGameScore(24, scoreOfTheDay);

        expect(scoreOfTheDay.scoreDetails.game.correctAnswer).toBe(60);
        expect(addedScore).toBe(0);
    });

    it("Should NOT add any points if game is played LATE and score is > 30 ", async () => {
        mockDate();

        scoreOfTheDay.scoreDetails.game.correctAnswer = 30;
        const addedScore = await checkGameScore(20, scoreOfTheDay);

        expect(scoreOfTheDay.scoreDetails.game.correctAnswer).toBe(30);
        expect(addedScore).toBe(0);
    });

    it("Should NOT add any points if game is ALREADY PLAYED", async () => {
        mockDate();

        scoreOfTheDay.scoreDetails.game.played = true;

        await updateScores(20, ScoreType.GameCorrectAnswer);

        expect(scoreOfTheDay.scoreDetails.game.correctAnswer).toBe(0);
    });
});
