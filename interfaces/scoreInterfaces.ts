export interface ScoreDetail {
    firstLogin: number;
    dayOpening: number;
    contentOpening: number;
    gameCorrectAnswer: number;
}

export interface Score {
    dayNumber: number;
    scoreTotal: number;
    scoreDetails: ScoreDetail;
}
