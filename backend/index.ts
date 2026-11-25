import { authRoutes } from "./routes/auth.routes";

const server = Bun.serve({
  port: 3000,
  routes: {
    "/health": () => new Response("OK"),
  ...authRoutes,
  }
})
console.log(`Listening on: ${server.url}`)
