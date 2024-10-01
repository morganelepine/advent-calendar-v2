import { AppDataSource } from "../data-source";
import { Calendar } from "../entity/calendar.entity";
import { Day } from "../entity/day.entity";
import { Content } from "../entity/content.entity";

const anecdote =
    "Les crackers de Noël, ces tubes en papier qui font un 'pop' lorsqu'on les ouvre, sont une invention anglaise du 19ème siècle. Thomas J. Smith, un confiseur, cherchait à populariser ses bonbons en les emballant dans du papier festif. Inspiré par le bruit du bois qui craque dans la cheminée, il a eu l'idée d'ajouter un petit mécanisme explosif pour un effet surprise.";

const quotes = [
    "Noël agite une baguette magique sur ce monde et voici, tout est plus doux et plus beau.",
    "La magie de Noël, c'est croire à l'impossible.",
    "Noël, c'est le temps de l'année où tout le monde revient à la maison.",
    "La meilleure chose à propos de Noël est qu'il peut être n'importe où.",
    "Noël est un temps de joie, de paix et de bonne volonté.",
    "Le meilleur cadeau de Noël est l'amour.",
    "C'est le temps de l'année pour être joyeux.",
    "La joie de Noël est une joie qui ne peut être prise.",
    "Noël est un état d'esprit.",
    "La lumière de Noël brille dans nos cœurs.",
    "Noël est un moment de partage et de bonheur.",
    "Chaque jour est un cadeau, surtout à Noël.",
    "Noël n'est pas un moment ni une saison, mais un état d'esprit.",
    "Il n'y a pas de meilleure période pour être ensemble.",
    "Noël est un moment pour rêver.",
    "La magie de Noël est dans l'air.",
    "À Noël, nous célébrons la vie.",
    "Noël est le temps des souvenirs.",
    "C'est un temps de réflexion et de gratitude.",
    "Les traditions de Noël sont ce qui rend cette période spéciale.",
    "Le temps passé en famille est le meilleur cadeau de Noël.",
    "Les petits moments de bonheur font les plus grands souvenirs.",
    "Noël est un moment de réflexion sur l'année passée.",
    "Il y a toujours de la magie dans l'air pendant Noël.",
];

async function seedCalendar() {
    const calendarRepository = AppDataSource.getRepository(Calendar);
    const dayRepository = AppDataSource.getRepository(Day);
    const contentRepository = AppDataSource.getRepository(Content);

    // Create calendar
    const calendar = new Calendar();
    calendar.title = "Noël";

    await calendarRepository.save(calendar);
    console.log("A calendar has been added to the database.");

    // Add days to the calendar
    for (let i = 1; i <= 24; i++) {
        const day = new Day();
        day.calendar = calendar;
        day.dayNumber = i;

        const contentQuote = new Content();
        contentQuote.day = day;
        contentQuote.type = "quote";
        contentQuote.content = quotes[i - 1];

        const contentTip = new Content();
        contentTip.day = day;
        contentTip.type = "tip";
        contentTip.title = "L'origine des crackers de Noël";
        contentTip.content = anecdote;

        const contentVideo = new Content();
        contentVideo.day = day;
        contentVideo.type = "video";
        contentVideo.title = "Christmas Canon - TransSiberian Orchestra";
        contentVideo.content = "Cm-WAIyBO1A";

        const contentRecipe = new Content();
        contentRecipe.day = day;
        contentRecipe.type = "recipe";
        contentRecipe.title = "Chocolat chaud";
        contentRecipe.content =
            "Faites chauffer du lait avec du chocolat noir fondu, ajoutez un peu de sucre et une pincée de cannelle, puis mélangez jusqu'à obtenir une texture onctueuse.";

        const contentGame = new Content();
        contentGame.day = day;
        contentGame.type = "game";
        contentGame.title = "Jeu du pendu";
        contentGame.content = "Pendu";

        await dayRepository.save(day);
        await contentRepository.save(contentQuote);
        await contentRepository.save(contentTip);
        await contentRepository.save(contentVideo);
        await contentRepository.save(contentRecipe);
        await contentRepository.save(contentGame);
    }
    console.log(
        "24 days and 5 contents per day have been added to the calendar."
    );
}

AppDataSource.initialize()
    .then(async () => {
        await seedCalendar();
        await AppDataSource.destroy();
    })
    .catch((error) => console.log(error));
