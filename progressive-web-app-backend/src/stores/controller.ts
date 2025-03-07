import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getStores = async (req: any, res: any) => {
  try {
    // Fetch all stores from the database
    const stores = await prisma.stores.findMany();

    // Send the result as JSON
    res.status(200).json({ success: true, data: stores });
  } catch (error) {
    console.error("Error fetching stores:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
