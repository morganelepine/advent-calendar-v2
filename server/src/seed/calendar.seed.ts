import { AppDataSource } from "../data-source";
import { Calendar } from "../entity/calendar.entity";
import { Day } from "../entity/day.entity";

async function seedCalendar() {
    const calendarRepository = AppDataSource.getRepository(Calendar);
    const dayRepository = AppDataSource.getRepository(Day);

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

        await dayRepository.save(day);
    }
    console.log("24 days have been added to the calendar.");
}

AppDataSource.initialize()
    .then(async () => {
        await seedCalendar();
        await AppDataSource.destroy();
    })
    .catch((error) => console.log(error));
