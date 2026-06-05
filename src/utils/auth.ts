import bcrypt from 'bcrypt';

export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, saltRounds);
}

export const comparePasswords = async (password: string, hashedPassword: string): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword);
}

export const generateAuthToken = (userId: string): string => {
  // Implement token generation logic (e.g., using JWT)
  return 'token';
}