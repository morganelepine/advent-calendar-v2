import AsyncStorage from "@react-native-async-storage/async-storage";
import {Score} from '../interfaces/scoreInterfaces';

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
    dayId: number | null,
    score: number,
    scoreType: string
): Promise<void> => {
    const scoresData = await loadScores();

    const scoreOfTheDay = scoresData.find(
        (score: Score) => score.dayNumber === dayId
    );

    if (scoreOfTheDay) {
        const scoreDetails = scoreOfTheDay.scoreDetails;
        let addedScore = 0;

        switch (scoreType) {
            case "contentOpening": // 12 points * 5 (* 24)
                if (scoreDetails.contentOpening <= 60) {
                    scoreDetails.contentOpening = score;
                    addedScore = score;
                }
                break;
            case "gameCorrectAnswer": // 20 points * 3 (* 12)
                if (scoreDetails.gameCorrectAnswer <= 60) {
                    scoreDetails.gameCorrectAnswer = score;
                    addedScore = score;
                }
                break;
            case "dayOpening": // 25 points (* 24)
                if (scoreDetails.dayOpening <= 25) {
                    scoreDetails.dayOpening = score;
                    addedScore = score;
                }
                break;
            case "firstLogin": // 40 points (* 1)
                if (scoreDetails.firstLogin === 0) {
                    scoreDetails.firstLogin = score;
                    addedScore = score;
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
