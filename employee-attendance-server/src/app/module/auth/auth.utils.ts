import jwt, { JwtPayload } from 'jsonwebtoken';

export const createToken = (
  jwtPayload: { email: string; role: string },
  secret: string,
  expiresIn: string,
) => {
  return jwt.sign(jwtPayload, secret, {
    expiresIn,
  });
};

export const verifyToken = (token: string, secret: string) => {
  return jwt.verify(token, secret) as JwtPayload;
};

export const generateVerificationCode = () => {
  const verificationCode = Math.floor(1000 + Math.random() * 9000);
  const verificationExpires = Date.now() + 60000;
  return { verificationCode, verificationExpires };
};
