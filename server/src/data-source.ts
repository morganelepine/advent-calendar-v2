import "reflect-metadata";
import { DataSource } from "typeorm";
import { config } from "dotenv";
config();

const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DATABASE, NODE_ENV } =
    process.env;

export const AppDataSource = new DataSource({
    type: "postgres", // mysql
    host: DB_HOST,
    port: parseInt(DB_PORT),
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    synchronize: true,
    logging: false,
    entities:
        NODE_ENV === "dev" ? ["src/entity/**/*.ts"] : ["dist/entity/**/*.js"],
    migrations: [],
    subscribers: [],
});
