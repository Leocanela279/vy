import { createUserService } from "../services/auth.service";

type RegisterBody = {
  username: string;
  email: string;
  password: string;
}
export const register = async (req: Request): Promise<Response> => {
  const { username, email, password } = await req.json() as RegisterBody;

  const user = createUserService(username,email,password)

  return Response.json({user})
}
export const login = (req: Request): Response => {

  return Response.json({message:"Logged in", status:200})
}
