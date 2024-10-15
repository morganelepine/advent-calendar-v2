import { ContentController } from "../controllers/content.controller";

export const ContentRoutes = [
    {
        method: "get",
        route: "/contents",
        controller: ContentController,
        action: "getAll",
    },
    {
        method: "get",
        route: "/contents/:id",
        controller: ContentController,
        action: "getOne",
    },
    {
        method: "put",
        route: "/contents/:id",
        controller: ContentController,
        action: "update",
    },
    {
        method: "post",
        route: "/contents",
        controller: ContentController,
        action: "create",
    },
    {
        method: "delete",
        route: "/contents/:id",
        controller: ContentController,
        action: "remove",
    },
];
