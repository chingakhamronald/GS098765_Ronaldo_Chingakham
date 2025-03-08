import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const getPlanning = async (req: Request, res: Response) => {
  try {
    const planning = await prisma.planning.findMany({
      select: {
        week: true,
        units: true,
        store: {
          select: {
            storeId: true,
            storeName: true,
          },
        },
        sku: {
          select: {
            skuId: true,
            skuName: true,
            price: true,
            cost: true,
          },
        },
      },
    });

    res.status(200).json({ success: true, data: planning });
  } catch (err) {
    res.status(500).json({ success: false, message: "Internal server error!" });
  }
};
