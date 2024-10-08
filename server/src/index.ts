import * as express from "express";
import * as bodyParser from "body-parser";
import { Application, Request, Response } from "express";
import { AppDataSource } from "./data-source";
import { UserRoutes } from "./routes/user.routes";
import { CalendarRoutes } from "./routes/calendar.routes";
import { DayRoutes } from "./routes/day.routes";
import { ContentRoutes } from "./routes/content.routes";

function registerRoutes(app: Application, routes: any[]) {
    routes.forEach((route) => {
        // console.log(
        //     `Registering route: ${route.method.toUpperCase()} ${route.route}`
        // );
        (app as any)[route.method](
            route.route,
            (req: Request, res: Response, next: Function) => {
                const result = new (route.controller as any)()[route.action](
                    req,
                    res,
                    next
                );
                if (result instanceof Promise) {
                    result.then((result) =>
                        result !== null && result !== undefined
                            ? res.send(result)
                            : undefined
                    );
                } else if (result !== null && result !== undefined) {
                    res.json(result);
                }
            }
        );
    });
}

AppDataSource.initialize()
    .then(async () => {
        // create express app
        const app = express();

        const cors = require("cors");
        app.use(cors());
        // app.use(cors({
        //     origin: ['http://localhost:8081'],
        //     methods: ['GET', 'POST'],
        // }));

        const PORT = process.env.PORT || 3000;
        app.use(bodyParser.json());

        // register express routes from defined application routes
        registerRoutes(app, UserRoutes);
        registerRoutes(app, CalendarRoutes);
        registerRoutes(app, DayRoutes);
        registerRoutes(app, ContentRoutes);

        // setup express app here
        // ...

        // start express server
        app.listen(PORT);

        console.log(
            "Express server has started on port 3000. Open http://localhost:3000/users to see results"
        );
    })
    .catch((error) => console.log(error));
