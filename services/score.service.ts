import AsyncStorage from "@react-native-async-storage/async-storage";
import { Score } from "@/interfaces/scoreInterfaces";
import { ScoreType } from "@/enums/enums";

export const generateScoresData = (): Score[] => {
    const scoresData: Score[] = [];
    for (let i = 1; i <= 24; i++) {
        scoresData.push({
            dayNumber: i,
            scoreTotal: 0,
            scoreDetails: {
                firstLogin: 0,
                dayOpening: 0,
                contentOpening: 0,
                gameCorrectAnswer: 0,
            },
        });
    }
    return scoresData;
};

export const loadScores = async (): Promise<Score[]> => {
    const savedScores = await AsyncStorage.getItem("scoresData");
    return savedScores ? JSON.parse(savedScores) : generateScoresData();
};

export const saveScores = async (scoresData: Score[]): Promise<void> => {
    await AsyncStorage.setItem("scoresData", JSON.stringify(scoresData));
};

export const updateScores = async (
    dayId: number,
    scoreType: number
): Promise<void> => {
    const scoresData = await loadScores();

    const scoreOfTheDay = scoresData.find(
        (score: Score) => score.dayNumber === dayId
    );

    if (scoreOfTheDay) {
        const scoreDetails = scoreOfTheDay.scoreDetails;
        let addedScore = 0;

        switch (scoreType) {
            case ScoreType.ContentOpening: // 10 ou 15 points * 4 (* 24)
                addedScore = await checkContentOpeningScore(
                    dayId,
                    scoreOfTheDay
                );
                break;
            case ScoreType.GameCorrectAnswer: // 10 ou 20 points * 3 (* 12)
                addedScore = await checkGameScore(dayId, scoreOfTheDay);
                break;
            case ScoreType.DayOpening: // 25 points (* 24)
                if (scoreDetails.dayOpening <= 25) {
                    scoreDetails.dayOpening = 25;
                    addedScore = 25;
                }
                break;
            case ScoreType.FirstLogin: // 40 points (* 1)
                if (scoreDetails.firstLogin === 0) {
                    scoreDetails.firstLogin = 40;
                    addedScore = 40;
                }
                break;
        }

        scoreOfTheDay.scoreTotal += addedScore;
    }

    saveScores(scoresData);
};

export const getTotalScore = async (): Promise<number> => {
    const scores = await loadScores();
    let totalScore: number = 0;

    if (scores) {
        scores.forEach((score: Score) => {
            totalScore += score.scoreTotal;
        });
    }

    return totalScore;
};

export const checkContentOpeningScore = async (
    dayId: number,
    scoreOfTheDay: Score
): Promise<number> => {
    const today = new Date().getDate();

    let addedScore = 0;
    const scoreOnTime = 15;
    const scoreLate = 10;

    if (today === dayId && scoreOfTheDay.scoreDetails.contentOpening < 60) {
        scoreOfTheDay.scoreDetails.contentOpening += scoreOnTime;
        addedScore += scoreOnTime;
    } else if (scoreOfTheDay.scoreDetails.contentOpening < 40) {
        scoreOfTheDay.scoreDetails.contentOpening += scoreLate;
        addedScore += scoreLate;
    }

    return addedScore;
};

export const checkGameScore = async (
    dayId: number,
    scoreOfTheDay: Score
): Promise<number> => {
    const today = new Date().getDate();

    let addedScore = 0;
    const scoreOnTime = 20;
    const scoreLate = 10;

    if (today === dayId && scoreOfTheDay.scoreDetails.gameCorrectAnswer < 60) {
        scoreOfTheDay.scoreDetails.gameCorrectAnswer += scoreOnTime;
        addedScore += scoreOnTime;
    } else if (scoreOfTheDay.scoreDetails.gameCorrectAnswer < 30) {
        scoreOfTheDay.scoreDetails.gameCorrectAnswer += scoreLate;
        addedScore += scoreLate;
    }

    return addedScore;
};
