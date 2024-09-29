import { DayController } from "../controller/day.controller";

export const DayRoutes = [
    {
        method: "get",
        route: "/days",
        controller: DayController,
        action: "getAll",
    },
    {
        method: "get",
        route: "/days/:id",
        controller: DayController,
        action: "getOne",
    },
    {
        method: "get",
        route: "/days/:id/contents",
        controller: DayController,
        action: "getDayContents",
    },
    {
        method: "post",
        route: "/days",
        controller: DayController,
        action: "create",
    },
    {
        method: "put",
        route: "/days/:id",
        controller: DayController,
        action: "update",
    },
    {
        method: "delete",
        route: "/days/:id",
        controller: DayController,
        action: "remove",
    },
];
