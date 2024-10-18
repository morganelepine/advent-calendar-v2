interface Content {
    id: number;
    type: "quote" | "recipe" | "anecdote" | "idea" | "game";
    title: string;
    content1: string;
    content2: string;
    content3: string;
    content4: string;
    content5: string;
}

export const getContentTitle = (
    content: Content,
    ideas: Content[],
    games: Content[]
) => {
    if (ideas.length > 0) {
        return "Se divertir";
    }
    if (games.length > 0) {
        return "S'amuser";
    }
    switch (content.type) {
        case "quote":
            return "S'inspirer";
        case "recipe":
            return "Se régaler";
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
) => {
    if (ideas.length > 0) {
        return "se-divertir_oyxijv";
    }
    if (games.length > 0) {
        return "s-amuser_y6vgfx";
    }
    switch (content.type) {
        case "quote":
            return "s-inspirer_pwl3gx";
        case "anecdote":
            return "s-instruire_xnjxha";
    }
};

export const classifyGames = (games: Content[]) => {
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
