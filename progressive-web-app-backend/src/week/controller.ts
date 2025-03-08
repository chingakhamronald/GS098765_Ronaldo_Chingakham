import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const getWeek = async (req: Request, res: Response) => {
  try {
    const week = await prisma.week.findMany();

    res.status(200).json({ success: true, data: week });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error!" });
  }
};
