import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/user.entity";
import { Day } from "./entity/day.entity";
import { DaysOpening } from "./entity/days-opening.entity";
import { Content } from "./entity/content.entity";
import { Score } from "./entity/score.entity";
import { config } from "dotenv";
config();

const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DATABASE, NODE_ENV } =
    process.env;

export const AppDataSource = new DataSource({
    type: "mysql",
    host: DB_HOST,
    port: parseInt(DB_PORT),
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    synchronize: NODE_ENV === "dev",
    logging: false,
    entities: [User, Day, DaysOpening, Content, Score], // "entity/*.js"
    migrations: [],
    subscribers: [],
});
