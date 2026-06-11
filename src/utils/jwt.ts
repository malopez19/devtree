import jwt from 'jsonwebtoken';

export const generateJWT = (userId: string) => {
  const payload = { userId };
  const secretKey = process.env.JWT_SECRET_KEY;
  const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
  return token;
}