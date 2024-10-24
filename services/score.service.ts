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

export const saveScores = async (scoresData: any) => {
    await AsyncStorage.setItem("scoresData", JSON.stringify(scoresData));
};

export const updateScores = async (dayId: number, scoreType: string) => {
    const scoresData = await loadScores();

    const scoreOfTheDay = scoresData.find(
        (score: Score) => score.dayNumber === dayId
    );

    if (scoreOfTheDay) {
        const scoreDetails = scoreOfTheDay.scoreDetails;
        let addedScore = 0;

        switch (scoreType) {
            case "contentOpening": // 10 ou 15 points * 4 (* 24)
                addedScore = await checkContentOpeningScore(
                    dayId,
                    scoreOfTheDay
                );
                break;
            case "gameCorrectAnswer": // 10 ou 20 points * 3 (* 12)
                addedScore = await checkGameScore(dayId, scoreOfTheDay);
                break;
            case "dayOpening": // 25 points (* 24)
                if (scoreDetails[1].dayOpening <= 25) {
                    scoreDetails[1].dayOpening = 25;
                    addedScore = 25;
                }
                break;
            case "firstLogin": // 40 points (* 1)
                if (scoreDetails[0].firstLogin === 0) {
                    scoreDetails[0].firstLogin = 40;
                    addedScore = 40;
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

export const checkContentOpeningScore = async (
    dayId: number,
    scoreOfTheDay: Score
) => {
    const today = new Date().getDate();

    let addedScore = 0;
    const scoreOnTime = 15;
    const scoreLate = 10;

    if (today === dayId && scoreOfTheDay.scoreDetails[2].contentOpening < 60) {
        scoreOfTheDay.scoreDetails[2].contentOpening += scoreOnTime;
        addedScore += scoreOnTime;
    } else if (scoreOfTheDay.scoreDetails[2].contentOpening < 40) {
        scoreOfTheDay.scoreDetails[2].contentOpening += scoreLate;
        addedScore += scoreLate;
    }

    return addedScore;
};

export const checkGameScore = async (dayId: number, scoreOfTheDay: Score) => {
    const today = new Date().getDate();

    let addedScore = 0;
    const scoreOnTime = 20;
    const scoreLate = 10;

    if (
        today === dayId &&
        scoreOfTheDay.scoreDetails[3].gameCorrectAnswer < 60
    ) {
        scoreOfTheDay.scoreDetails[3].gameCorrectAnswer += scoreOnTime;
        addedScore += scoreOnTime;
    } else if (scoreOfTheDay.scoreDetails[3].gameCorrectAnswer < 30) {
        scoreOfTheDay.scoreDetails[3].gameCorrectAnswer += scoreLate;
        addedScore += scoreLate;
    }

    return addedScore;
};
