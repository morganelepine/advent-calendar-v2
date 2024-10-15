import { DaysOpeningController } from "../controllers/days-opening.controller";

export const DaysOpeningRoutes = [
    {
        method: "get",
        route: "/days-opened",
        controller: DaysOpeningController,
        action: "getAll",
    },
    {
        method: "post",
        route: "/days-opened",
        controller: DaysOpeningController,
        action: "create",
    },
    {
        method: "get",
        route: "/days-opened/:uuid/:day",
        controller: DaysOpeningController,
        action: "checkIfDayIsOpen",
    },
];
