// utils/listRoutes.ts
import { Router } from "express";

export function listRoutes(router: Router) {
  const routes: Array<{ method: string; path: string }> = [];

  router.stack.forEach((middleware: any) => {
    if (middleware.route) {
      // If the router stack has a route object, list it
      Object.keys(middleware.route.methods).forEach((method) => {
        routes.push({
          method: method.toUpperCase(),
          path: middleware.route.path,
        });
      });
    } else if (middleware.name === "router") {
      // If the router stack has a router object, list its routes
      middleware.handle.stack.forEach((handler: any) => {
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
