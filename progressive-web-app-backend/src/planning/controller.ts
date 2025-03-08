import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const getPlanning = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1; // Default page = 1;
    const limit = parseInt(req.query.limit as string) || 20; // Default limit = 20;
    const skip = (page - 1) * limit;

    //Fetch total count
    const totalCount = await prisma.planning.count();

    //Fetching pagination data
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
        weekId: {
          select: {
            month: true,
            monthLabel: true,
            weekName: true,
          },
        },
      },
      skip,
      take: limit,
      orderBy: { week: "asc" },
    });

    res.status(200).json({
      success: true,
      data: planning,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalCount / limit),
        totalItems: totalCount,
        hasNextPage: page * limit < totalCount,
        hasPrevPage: page > 1,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Internal server error!" });
  }
};
