import db from "../db/db"


export const createUserService = (username: string, email: string, password: string) => {
  const user = db.query("INSERT INTO users (username,email,password) VALUES (?,?,?) RETURNING username,email")

return user.get(username,email,password)
}
