import variables from "./variable";
import bcrypt from "bcrypt";

const ROUNDS = Number(variables.AUTH.SALT_ROUNDS);
// Hash password before persisting 
export const hashpassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(ROUNDS);
  return await bcrypt.hash(password, salt);
};



//Compare password
export const comparePassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword);
};
