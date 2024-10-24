import {
    checkContentOpeningScore,
    checkGameScore,
} from "../../services/score.service";

interface Score {
    dayNumber: number;
    scoreTotal: number;
    scoreDetails: [
        { firstLogin: number },
        { dayOpening: number },
        { contentOpening: number },
        { gameCorrectAnswer: number }
    ];
}

const createScoreOfTheDay = (): Score => ({
    dayNumber: 24,
    scoreTotal: 25,
    scoreDetails: [
        { firstLogin: 0 },
        { dayOpening: 25 },
        { contentOpening: 0 },
        { gameCorrectAnswer: 0 },
    ],
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

    it("Should add 15 points if content is opened ON TIME and score is < 60 ", async () => {
        mockDate();

        scoreOfTheDay.scoreDetails[2].contentOpening = 30;
        const addedScore = await checkContentOpeningScore(24, scoreOfTheDay);

        expect(scoreOfTheDay.scoreDetails[2].contentOpening).toBe(45);
        expect(addedScore).toBe(15);
    });

    it("Should add only 10 points if content is opened LATE and score is < 40 ", async () => {
        mockDate();

        scoreOfTheDay.scoreDetails[2].contentOpening = 20;
        const addedScore = await checkContentOpeningScore(20, scoreOfTheDay);

        expect(scoreOfTheDay.scoreDetails[2].contentOpening).toBe(30);
        expect(addedScore).toBe(10);
    });

    it("Should NOT add any points if content is opened ON TIME but score is > 60 ", async () => {
        mockDate();

        scoreOfTheDay.scoreDetails[2].contentOpening = 60;
        const addedScore = await checkContentOpeningScore(24, scoreOfTheDay);

        expect(scoreOfTheDay.scoreDetails[2].contentOpening).toBe(60);
        expect(addedScore).toBe(0);
    });

    it("Should NOT add any points if content is opened LATE and score is > 40 ", async () => {
        mockDate();

        scoreOfTheDay.scoreDetails[2].contentOpening = 40;
        const addedScore = await checkContentOpeningScore(20, scoreOfTheDay);

        expect(scoreOfTheDay.scoreDetails[2].contentOpening).toBe(40);
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

        scoreOfTheDay.scoreDetails[3].gameCorrectAnswer = 40;
        const addedScore = await checkGameScore(24, scoreOfTheDay);

        expect(scoreOfTheDay.scoreDetails[3].gameCorrectAnswer).toBe(60);
        expect(addedScore).toBe(20);
    });

    it("Should add only 10 points if game is played LATE and score is < 30 ", async () => {
        mockDate();

        scoreOfTheDay.scoreDetails[3].gameCorrectAnswer = 20;
        const addedScore = await checkGameScore(20, scoreOfTheDay);

        expect(scoreOfTheDay.scoreDetails[3].gameCorrectAnswer).toBe(30);
        expect(addedScore).toBe(10);
    });

    it("Should NOT add any points if game is played ON TIME but score is > 60 ", async () => {
        mockDate();

        scoreOfTheDay.scoreDetails[3].gameCorrectAnswer = 60;
        const addedScore = await checkGameScore(24, scoreOfTheDay);

        expect(scoreOfTheDay.scoreDetails[3].gameCorrectAnswer).toBe(60);
        expect(addedScore).toBe(0);
    });

    it("Should NOT add any points if game is played LATE and score is > 30 ", async () => {
        mockDate();

        scoreOfTheDay.scoreDetails[3].gameCorrectAnswer = 30;
        const addedScore = await checkGameScore(20, scoreOfTheDay);

        expect(scoreOfTheDay.scoreDetails[3].gameCorrectAnswer).toBe(30);
        expect(addedScore).toBe(0);
    });
});
