import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

// CREATE Store
export const createStore = async (req: Request, res: Response) => {
  const { storeName, ...props } = req.body;

  console.log({ "storeName....": storeName });

  try {
    const createStore = await prisma.stores.create({
      data: { storeName, ...props },
    });

    res.status(200).json({ success: true, data: createStore });
  } catch (err) {
    res.status(500).json({ success: false, message: "Internal Server Error!" });
  }
};

// GET STORES
export const getStores = async (req: Request, res: Response) => {
  try {
    const stores = await prisma.stores.findMany();

    res.status(200).json({ success: true, data: stores });
  } catch (error) {
    console.error("Error fetching stores:", error);
    res.status(500).json({ success: false, message: "Internal Server Error!" });
  }
};

//UPDATE Store
export const updateStore = async (req: Request, res: Response) => {
  const { storeId } = req.params;

  const { storeName, state, city } = req.body;

  try {
    const existingStore = await prisma.stores.findUnique({
      where: { storeId },
    });

    if (!existingStore) {
      return res
        .status(400)
        .json({ success: false, message: "Store ID is not found" });
    }

    const updateStore = await prisma.stores.update({
      where: { storeId },
      data: { storeName, state, city },
    });

    res.status(200).json({ success: true, data: updateStore });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to update store" });
  }
};

export const deleteStore = async (req: Request, res: Response) => {
  const { storeId } = req.params;

  console.log({
    "store...": storeId,
  });

  try {
    const existingStore = await prisma.stores.findUnique({
      where: { storeId },
    });

    console.log(existingStore);

    if (!existingStore) {
      return res
        .status(404)
        .json({ success: false, message: "Store not found!" });
    }

    console.log("CEHCK....DATA");

    // Perform delete operation
    const removeData = await prisma.stores.delete({
      where: { storeId },
    });

    console.log({ "REMOVE>>>>DATA>>>": removeData });

    res
      .status(200)
      .json({ success: true, message: "Store deleted successfully!" });
  } catch (error) {
    console.log(JSON.stringify(error, null, 2));
    res.status(500).json({ success: false, message: "Internal server error!" });
  }
};
