import { registerUser } from "../services/authService";

export async function register(data: { name?: string; email: string; password: string }) {
  const user = await registerUser(data);
  return { id: user.id, email: user.email, name: user.name };
}
