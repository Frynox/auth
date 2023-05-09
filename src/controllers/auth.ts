import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/user";

export const loginUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  // Check if the user exists
  const user = await User.findOne({ username });
  if (!user || user.password !== password) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // Create and sign the tokens
  const accessToken = jwt.sign(
    { username: user.username },
    process.env.ACCESS_TOKEN_SECRET!,
    { expiresIn: "5m" }
  );
  const refreshToken = jwt.sign(
    { username: user.username },
    process.env.REFRESH_TOKEN_SECRET!,
    { expiresIn: "7d" }
  );

  res.json({ accessToken, refreshToken });
};

export const refreshUserToken = (req: Request, res: Response) => {
  const refreshToken = req.body.token;

  // Check if the token exists and is valid
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!, (err, user) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }

    // Create and sign a new access token
    const accessToken = jwt.sign(
      { username: (user as any).username },
      process.env.ACCESS_TOKEN_SECRET!,
      { expiresIn: "5m" }
    );

    res.json({ accessToken });
  });
};

export const whoAmI = (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Missing token" });
  }

  // Check if the token is valid
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!, (err, user) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }

    res.json({ username: (user as any).username });
  });
};
