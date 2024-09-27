import { AppDataSource } from "../data-source";
import { Calendar } from "../entity/Calendar";
import { Day } from "../entity/day.entity";
import { Content } from "../entity/content.entity";

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

        const content = new Content();
        content.day = day;
        content.type = "quote";
        content.textContent = quotes[i - 1];

        await dayRepository.save(day);
        await contentRepository.save(content);
    }
    console.log("24 days and quotes have been added to the calendar.");
}

AppDataSource.initialize()
    .then(async () => {
        await seedCalendar();
        await AppDataSource.destroy();
    })
    .catch((error) => console.log(error));
