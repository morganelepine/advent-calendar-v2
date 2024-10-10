import { AppDataSource } from "../data-source";
import { User } from "../entity/user.entity";
import { Calendar } from "../entity/calendar.entity";
import { Day } from "../entity/day.entity";

async function seedDB() {
    const userRepository = AppDataSource.getRepository(User);
    const calendarRepository = AppDataSource.getRepository(Calendar);
    const dayRepository = AppDataSource.getRepository(Day);

    // Insert users
    const user1 = new User();
    user1.uuid = "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d";
    user1.score = 20;
    await userRepository.save(user1);

    const user2 = new User();
    user2.uuid = "1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed";
    user2.score = 40;
    await userRepository.save(user2);

    console.log("Two users have been added to the database.");

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
        await seedDB();
        await AppDataSource.destroy();
    })
    .catch((error) => console.log(error));
