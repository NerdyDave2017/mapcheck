import bcrypt from "bcrypt";


export const matchPassword = async (enteredPassword: string, password: string) : Promise<boolean> => {
  return await bcrypt.compare(enteredPassword, password);
}