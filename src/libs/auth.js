import { nanoid } from "nanoid";
import { SignJWT, jwtVerify } from "jose";
import { serialize } from "cookie";

export class AuthError extends Error {}

export async function verifyAuth(token, res) {
  if (!token) throw new AuthError("Tidak Ada Token");
  try {
    const verified = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET_KEY)
    );
    return verified.payload;
  } catch (err) {
    throw new AuthError("Token Tidak valid.");
  }
}

export async function setUserCookie(data, res) {
  const token = await new SignJWT(data)
    .setProtectedHeader({ alg: "HS256" })
    .setJti(nanoid())
    .setIssuedAt()
    .setExpirationTime("30d")
    .sign(new TextEncoder().encode(process.env.JWT_SECRET_KEY));

  const serialized = serialize(process.env.JWT_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
  });

  res.setHeader("Set-Cookie", serialized);
  return res;
}

export function expireUserCookie(res) {
  const serialized = serialize(process.env.JWT_NAME, null, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: -1,
    path: "/",
  });
  res.setHeader("Set-Cookie", serialized);
  return res;
}
