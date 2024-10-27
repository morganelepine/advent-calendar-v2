import { Content } from "@/interfaces/contentInterface";
import { ContentType, GameType } from "@/enums/enums";

interface GamesByType {
    pendu?: Content;
    jeu?: Content;
    quizCitation: Content[];
    quizNoel: Content[];
}

export const getContentTitle = (
    content: Content,
    ideas: Content[],
    games: Content[]
): string => {
    if (ideas.length > 0) {
        return "Se divertir";
    }
    if (games.length > 0) {
        return "S'amuser";
    }
    switch (content.type) {
        case ContentType.Quote:
            return "S'inspirer";
        case ContentType.Anecdote:
            return "S'instuire";
        default:
            return "Contenu du jour";
    }
};

export const getContentBackgroundImage = (
    content: Content,
    ideas: Content[],
    games: Content[]
): string => {
    if (ideas.length > 0) {
        return "se-divertir_xvdksq";
    }
    if (games.length > 0) {
        return "s-amuser_vn8ugi";
    }
    switch (content.type) {
        case ContentType.Quote:
            return "s-inspirer_zwls2a";
        case ContentType.Anecdote:
            return "s-instruire_xybqas";
        default:
            return "se-regaler_mnonwh";
    }
};

export const classifyGames = (
    games: Content[]
): {
    gamesByType: GamesByType;
    type: string;
} => {
    const gamesByType: {
        pendu?: Content;
        jeu?: Content;
        quizCitation: Content[];
        quizNoel: Content[];
    } = { quizCitation: [], quizNoel: [] };

    let type = "";

    games.forEach((game) => {
        switch (game.content5) {
            case GameType.Pendu:
                gamesByType.pendu = game;
                type = ContentType.Game;
                break;
            case GameType.Jeu:
                gamesByType.jeu = game;
                type = ContentType.Game;
                break;
            case GameType.QuizCitation:
                gamesByType.quizCitation.push(game);
                type = ContentType.Quiz;
                break;
            case GameType.QuizNoel:
                gamesByType.quizNoel.push(game);
                type = ContentType.Quiz;
                break;
        }
    });

    return { gamesByType, type };
};
