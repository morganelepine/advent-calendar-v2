import AsyncStorage from "@react-native-async-storage/async-storage";

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

export const generateScoresData = () => {
    const scoresData = [];
    for (let i = 1; i <= 24; i++) {
        scoresData.push({
            dayNumber: i,
            scoreTotal: 0,
            scoreDetails: [
                { firstLogin: 0 },
                { dayOpening: 0 },
                { contentOpening: 0 },
                { gameCorrectAnswer: 0 },
            ],
        });
    }
    return scoresData;
};

export const loadScores = async () => {
    const savedScores = await AsyncStorage.getItem("scoresData");
    return savedScores ? JSON.parse(savedScores) : generateScoresData();
};

export const saveScores = async (scoresData: Score) => {
    await AsyncStorage.setItem("scoresData", JSON.stringify(scoresData));
};

export const updateScores = async (
    dayId: number | null,
    score: number,
    scoreType: string
) => {
    const scoresData = await loadScores();

    const scoreOfTheDay = scoresData.find(
        (score: Score) => score.dayNumber === dayId
    );

    if (scoreOfTheDay) {
        const scoreDetails = scoreOfTheDay.scoreDetails;
        let addedScore = 0;

        switch (scoreType) {
            case "contentOpening": // 12 points * 5 (* 24)
                if (scoreDetails[2].contentOpening <= 60) {
                    scoreDetails[2].contentOpening = score;
                    addedScore = score;
                }
                break;
            case "gameCorrectAnswer": // 20 points * 3 (* 12)
                if (scoreDetails[3].gameCorrectAnswer <= 60) {
                    scoreDetails[3].gameCorrectAnswer = score;
                    addedScore = score;
                }
                break;
            case "dayOpening": // 25 points (* 24)
                if (scoreDetails[1].dayOpening <= 25) {
                    scoreDetails[1].dayOpening = score;
                    addedScore = score;
                }
                break;
            case "firstLogin": // 40 points (* 1)
                if (scoreDetails[0].firstLogin === 0) {
                    scoreDetails[0].firstLogin = score;
                    addedScore = score;
                }
                break;
        }

        scoreOfTheDay.scoreTotal += addedScore;
    }

    saveScores(scoresData);
};

export const getTotalScore = async () => {
    const scores = await loadScores();
    let totalScore: number = 0;

    if (scores) {
        scores.forEach((score: Score) => {
            totalScore += score.scoreTotal;
        });
    }

    return totalScore;
};
