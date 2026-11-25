import { login, register } from "../controllers/auth.contoller";

export const authRoutes = {
  "/auth/register": {
     POST : register
   },
  "/auth/login": login
}
