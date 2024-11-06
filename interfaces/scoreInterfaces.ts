export interface Score {
    dayNumber: number;
    scoreTotal: number;
    scoreDetails: ScoreDetail;
}

export interface ScoreDetail {
    dayOpening: number;
    contentOpening: number;
    gameCorrectAnswer: number;
}
