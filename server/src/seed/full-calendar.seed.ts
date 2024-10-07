import { AppDataSource } from "../data-source";
import { Calendar } from "../entity/calendar.entity";
import { Day } from "../entity/day.entity";
import { Content } from "../entity/content.entity";

const content1 =
    "Les crackers de Noël, ces tubes en papier qui font un 'pop' lorsqu'on les ouvre, sont une invention anglaise du 19ème siècle. Thomas J. Smith, un confiseur, cherchait à populariser ses bonbons en les emballant dans du papier festif. Inspiré par le bruit du bois qui craque dans la cheminée, il a eu l'idée d'ajouter un petit mécanisme explosif pour un effet surprise.";
const content2 =
    "Noël agite une baguette magique sur ce monde et voici, tout est plus doux et plus beau.";
const content3 = "Norman Vincent Peale";
const content4 = "Cm-WAIyBO1A";

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
        contentQuote.content1 = content1;
        contentQuote.content2 = content2;
        contentQuote.content3 = content3;
        contentQuote.content4 = content4;

        const contentTip = new Content();
        contentTip.day = day;
        contentTip.type = "anecdote";
        contentTip.title = "La légende du Jólakötturinn";
        contentTip.content1 = content1;
        contentTip.content2 = content2;
        contentTip.content3 = content3;
        contentTip.content4 = content4;

        const contentVideo = new Content();
        contentVideo.day = day;
        contentVideo.type = "idea";
        contentVideo.title = "Christmas Canon (TransSiberian Orchestra)";
        contentVideo.content1 = content1;
        contentVideo.content2 = content2;
        contentVideo.content3 = content3;
        contentVideo.content4 = content4;

        const contentRecipe = new Content();
        contentRecipe.day = day;
        contentRecipe.type = "recipe";
        contentRecipe.title = "Chocolat chaud";
        contentRecipe.content1 = content1;
        contentRecipe.content2 = content2;
        contentRecipe.content3 = content3;
        contentRecipe.content4 = content4;

        const contentGame = new Content();
        contentGame.day = day;
        contentGame.type = "game";
        contentGame.title = "Devinette";
        contentGame.content1 = content1;
        contentGame.content2 = content2;
        contentGame.content3 = content3;
        contentGame.content4 = content4;

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
