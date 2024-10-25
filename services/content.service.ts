import { Content } from '../interfaces/contentInterface';

export const getContentTitle = (
    content: Content,
    ideas: Content[],
    games: Content[]
) : string => {
    if (ideas.length > 0) {
        return "Se divertir";
    }
    if (games.length > 0) {
        return "S'amuser";
    }
    switch (content.type) {
        case "quote":
            return "S'inspirer";
        case "anecdote":
            return "S'instuire";
        default:
            return "Contenu du jour";
    }
};

export const getContentBackgroundImage = (
    content: Content,
    ideas: Content[],
    games: Content[]
) : string => {
    if (ideas.length > 0) {
        return "se-divertir_xvdksq";
    }
    if (games.length > 0) {
        return "s-amuser_vn8ugi";
    }
    switch (content.type) {
        case "quote":
            return "s-inspirer_zwls2a";
        case "anecdote":
            return "s-instruire_xybqas";
        default:
            return "se-regaler_mnonwh";
    }
};

export const classifyGames = (games: Content[]) : {
        // Maybe creer un type pour que ça soit lisible ^^
        pendu?: Content;
        jeu?: Content;
        quizCitation: Content[];
        quizNoel: Content[];
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
            case "pendu":
                gamesByType.pendu = game;
                type = "game";
                break;
            case "jeu":
                gamesByType.jeu = game;
                type = "game";
                break;
            case "quiz-citation":
                gamesByType.quizCitation.push(game);
                type = "quiz";
                break;
            case "quiz-noel":
                gamesByType.quizNoel.push(game);
                type = "quiz";
                break;
        }
    });

    return { gamesByType, type };
};
