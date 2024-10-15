import { CalendarController } from "../controllers/calendar.controller";

export const CalendarRoutes = [
    {
        method: "get",
        route: "/calendars",
        controller: CalendarController,
        action: "getAll",
    },
    {
        method: "get",
        route: "/calendars/:id",
        controller: CalendarController,
        action: "getOne",
    },
];
