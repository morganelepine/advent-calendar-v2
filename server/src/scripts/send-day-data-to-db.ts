import { AppDataSource } from "../data-source";
import * as fs from "fs";
import * as csv from "csv-parser";
import { Day } from "../entity/day.entity";

async function importDayCSV(filePath: string) {
    await AppDataSource.initialize();

    const days: Day[] = [];

    fs.createReadStream(filePath)
        .pipe(csv())
        .on("data", (data) => {
            const day = new Day();
            day.dayNumber = data.dayNumber;
            day.image = data.image;
            days.push(day);
        })
        .on("end", async () => {
            await AppDataSource.manager.save(days);
            console.log("Données (jours) importées avec succès !");
            await AppDataSource.destroy();
        });
}

importDayCSV("src/data/day_migration_data.csv");
