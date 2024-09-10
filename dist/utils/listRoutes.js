"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listRoutes = listRoutes;
function listRoutes(router) {
    const routes = [];
    router.stack.forEach((middleware) => {
        if (middleware.route) {
            // If the router stack has a route object, list it
            Object.keys(middleware.route.methods).forEach((method) => {
                routes.push({
                    method: method.toUpperCase(),
                    path: middleware.route.path,
                });
            });
        }
        else if (middleware.name === "router") {
            // If the router stack has a router object, list its routes
            middleware.handle.stack.forEach((handler) => {
                const route = handler.route;
                if (route) {
                    Object.keys(route.methods).forEach((method) => {
                        routes.push({ method: method.toUpperCase(), path: route.path });
                    });
                }
            });
        }
    });
    return routes;
}
