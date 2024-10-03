import { AppDataSource } from "../data-source";
import * as fs from "fs";
import * as csv from "csv-parser";
import { Content } from "../entity/content.entity";

async function importCSV(filePath: string) {
    await AppDataSource.initialize();

    const contents: Content[] = [];

    fs.createReadStream(filePath)
        .pipe(csv())
        .on("data", (data) => {
            const content = new Content();
            content.type = data.type;
            content.title = data.title;
            content.content1 = data.content1;
            content.content2 = data.content2;
            content.content3 = data.content3;
            content.content4 = data.content4;
            content.day = data.dayId;
            contents.push(content);
        })
        .on("end", async () => {
            await AppDataSource.manager.save(contents);
            console.log("Données importées avec succès !");
            await AppDataSource.destroy();
        });
}

importCSV("src/data/content_migration_data.csv");
