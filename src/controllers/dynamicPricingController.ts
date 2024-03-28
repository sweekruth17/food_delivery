import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import z from "zod";
import { Type, Zone } from "../globalContants";
const prisma = new PrismaClient();
//we are using zod for data validation

const headersSchema = z.object({
  zone: z.string().transform((str) => str.toUpperCase()),
  organization_id: z.string().transform((str) => parseInt(str, 10)),
  total_distance: z.string().transform((str) => parseInt(str, 10)),
  item_type: z.string().transform((str) => str.toUpperCase()),
});

export const dynamicPricing = async (req: Request, res: Response) => {
  const parsedHeaders = headersSchema.safeParse(req.headers);
  console.log(parsedHeaders);
  if (!parsedHeaders.success) {
    // Handle parsing errors (e.g., return error response)
    return res.status(400).json({ message: "Invalid headers format" });
  }
  const { zone, organization_id, total_distance, item_type } =
    parsedHeaders.data;
  const zoneSchema = z.nativeEnum(Zone);
  const zoneCheck = zoneSchema.safeParse(zone);
  const itemTypeSchema = z.nativeEnum(Type);
  const itemCheck = itemTypeSchema.safeParse(item_type);
  if (!itemCheck.success && !zoneCheck.success)
    return res.status(400).json({ message: "Invalid data format" });

  const result = await prisma.pricing.findFirst({
    where: {
      orgId: organization_id,
      zone: zone as Zone,
      item: { type: item_type as Type },
    },
  });
  if (!result) {
    return res
      .status(400)
      .json({ message: "Pricing not found for this combination" });
  }
  console.log(req.headers);
  const { baseDistance, kmPrice, fixPrice } = result;
  const distanceBeyondBase = total_distance - baseDistance;
  const itemKmPrice = item_type === Type.PERISHABLE ? 1.5 : 1;
  const distancePrice = distanceBeyondBase * itemKmPrice * 100;
  const totalPrice = fixPrice + distancePrice;

  res.status(200).json({
    msg: `Total price for this delivery system is ${totalPrice} in cents or ${
      totalPrice / 100
    } in euros`,
  });
};
module.exports = { dynamicPricing };
