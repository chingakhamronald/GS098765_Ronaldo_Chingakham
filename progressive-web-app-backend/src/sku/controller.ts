import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

// CREATE Store
export const createSku = async (req: Request, res: Response) => {
  const {
    skuName,
    cost,
    skuId,
    department,
    price,
    class: categories,
  } = req.body;

  try {
    const createSku = await prisma.sku.create({
      data: { skuName, cost, class: categories, skuId, department, price },
    });

    res.status(200).json({ success: true, data: createSku });
  } catch (err) {
    res.status(500).json({ success: false, message: "Internal Server Error!" });
  }
};

// GET STORES
export const getSku = async (req: Request, res: Response) => {
  try {
    const sku = await prisma.sku.findMany();

    res.status(200).json({ success: true, data: sku });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error!" });
  }
};

//UPDATE Store
export const updateSku = async (req: Request, res: Response) => {
  const { skuId } = req.params;

  const { skuName, cost, price } = req.body;

  try {
    const existingStore = await prisma.sku.findUnique({
      where: { skuId },
    });

    if (!existingStore) {
      return res
        .status(400)
        .json({ success: false, message: "SKU Id is not found" });
    }

    const updateStore = await prisma.sku.update({
      where: { skuId },
      data: { skuId, skuName, cost, price },
    });

    res.status(200).json({ success: true, data: updateStore });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to update store" });
  }
};

export const deleteSku = async (req: Request, res: Response) => {
  const { skuId } = req.params;

  try {
    const existingStore = await prisma.sku.findUnique({
      where: { skuId },
    });

    if (!existingStore) {
      return res
        .status(404)
        .json({ success: false, message: "SKU not found!" });
    }

    // Perform delete operation
    await prisma.sku.delete({
      where: { skuId },
    });

    res
      .status(200)
      .json({ success: true, message: "Sku deleted successfully!" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error!" });
  }
};
