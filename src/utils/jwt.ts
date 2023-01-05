import jwt, { SignOptions } from "jsonwebtoken";
import config from "../config";

const accessTokenPrivateKey = config.jwt.accessTokenPrivateKey || "";
const accessTokenPublicKey = config.jwt.accessTokenPublicKey || "";
export const signJwt = (payload: Object, options: SignOptions = {}) => {
  return jwt.sign(payload, accessTokenPrivateKey, options);
};

export const verifyJwt = <T>(token: string): T | null => {
  try {
    return jwt.verify(token, accessTokenPrivateKey) as T;
  } catch (error) {
    return null;
  }
};
