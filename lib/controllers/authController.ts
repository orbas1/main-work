import { registerUser } from "../services/authService";

export async function register(data: {
  name?: string;
  email: string;
  password: string;
  phone?: string;
  location?: string;
  bio?: string;
  expertise?: string;
  payment?: string;
  taxId?: string;
  portfolio?: string;
  title?: string;
  image?: string;
  introVideo?: string;
  resume?: string;
  coverLetter?: string;
}) {
  const user = await registerUser(data);
  return { id: user.id, email: user.email, name: user.name };
}
