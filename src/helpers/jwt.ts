import jwt from 'jsonwebtoken';

export const validateToken = (token: string): boolean => {
  const decodedToken = jwt.decode(token);
  if (decodedToken == null || typeof decodedToken === 'string') {
    return false;
  }
  const currentTime = Math.floor(Date.now() / 1000);
  const expTime: number = decodedToken.exp;
  if (expTime - currentTime > 0) {
    return true;
  }
  return false;
};
