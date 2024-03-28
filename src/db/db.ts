import { PrismaClient } from "@prisma/client"; // this holds the connection logic to our DB
import { Type, Zone } from "../globalContants";
const prisma = new PrismaClient();

// here if we are getting data from user we need data validation from a lib like zod
//now we are manually adding the data
async function insertItem(type: Type, description: string) {
  try {
    const result = await prisma.item.create({
      data: {
        type,
        description,
      },
      select: {
        type: true,
        description: true,
      },
    });
    console.log(result);
  } catch (error) {
    console.log("Incorrect item data is provided");
  }
}

async function insertOrganization(name: string) {
  try {
    const result = await prisma.organization.create({
      data: {
        name,
      },
      select: {
        name: true,
      },
    });
    console.log(result);
  } catch (error) {
    console.log("Incorrect item data is provided");
  }
}

async function insertPricing(
  orgId: number,
  itemId: number,
  zone: Zone,
  baseDistance: number,
  fixPrice: number,
  kmPrice: number
) {
  try {
    const result = await prisma.pricing.create({
      data: {
        orgId,
        itemId,
        zone,
        baseDistance,
        fixPrice,
        kmPrice,
      },
      select: {
        orgId: true,
        itemId: true,
        zone: true,
        baseDistance: true,
        fixPrice: true,
        kmPrice: true,
      },
    });
    console.log(result);
  } catch (error) {}
}
const organizationsData = [
  { name: "Pizza Palace" },
  { name: "Burger Barn" },
  { name: "Burrito Paradise" },
  { name: "Noodle Nation" },
  { name: "Fresh & Green" },
  { name: "Sweet Treats" },
  { name: "Spicy Delight" },
  { name: "Coffee Corner" },
];
const itemsData = [
  { type: Type.PERISHABLE, description: "Large Pizza" },
  { type: Type.PERISHABLE, description: "Double Cheeseburger" },
  { type: Type.PERISHABLE, description: "Burrito Bowl" },
  { type: Type.PERISHABLE, description: "Pad Thai Noodles" },
  { type: Type.PERISHABLE, description: "Salad with Dressing" },
  { type: Type.NONPERISHABLE, description: "Box of Cookies" },
  { type: Type.PERISHABLE, description: "Chicken Tikka Masala" },
  { type: Type.NONPERISHABLE, description: "Coffee Beans" },
];

const pricingData = [
  {
    zone: Zone.CENTRAL,
    baseDistance: 5,
    fixPrice: 1000, // 10 euros in cents
    kmPrice: 150, // Per kilometer price in cents (converted from 1.5 euros)
    itemId: 1, // Large Pizza (perishable)
    item: { connect: { id: 1 } },
    orgId: 1, // Pizza Palace
    organization: { connect: { id: 1 } },
  },
  {
    zone: Zone.WEST,
    baseDistance: 3,
    fixPrice: 800, // 8 euros in cents
    kmPrice: 120, // Per kilometer price in cents (converted from 1.2 euros)
    itemId: 2, // Double Cheeseburger (perishable)
    item: { connect: { id: 2 } },
    orgId: 2, // Burger Barn
    organization: { connect: { id: 2 } },
  },
  {
    zone: Zone.NORTH,
    baseDistance: 7,
    fixPrice: 1200, // 12 euros in cents
    kmPrice: 170, // Per kilometer price in cents (converted from 1.7 euros)
    itemId: 3, // Burrito Bowl (perishable)
    item: { connect: { id: 3 } },
    orgId: 3, // Burrito Paradise
    organization: { connect: { id: 3 } },
  },
  {
    zone: Zone.SOUTH,
    baseDistance: 4,
    fixPrice: 900, // 9 euros in cents
    kmPrice: 100, // Per kilometer price in cents (converted from 1.0 euros)
    itemId: 4, // Pad Thai Noodles (perishable)
    item: { connect: { id: 4 } },
    orgId: 4, // Noodle Nation
    organization: { connect: { id: 4 } },
  },
  {
    zone: Zone.CENTRAL,
    baseDistance: 2,
    fixPrice: 500, // 5 euros in cents
    kmPrice: 80, // Per kilometer price in cents (converted from 0.8 euros)
    itemId: 5, // Salad with Dressing (non-perishable)
    item: { connect: { id: 5 } },
    orgId: 5, // Fresh & Green
    organization: { connect: { id: 5 } },
  },
  {
    zone: Zone.EAST,
    baseDistance: 6,
    fixPrice: 700, // 7 euros in cents
    kmPrice: 100, // Per kilometer price in cents (converted from 1.0 euros)
    itemId: 6, // Box of Cookies (non-perishable)
    item: { connect: { id: 6 } },
    orgId: 6, // Sweet Treats
    organization: { connect: { id: 6 } },
  },
  {
    zone: Zone.NORTH,
    baseDistance: 8,
    fixPrice: 1400, // 14 euros in cents
    kmPrice: 180, // Per kilometer price in cents (converted from 1.8 euros)
    itemId: 7, // Chicken Tikka Masala (perishable)
    item: { connect: { id: 7 } },
    orgId: 7, // Spicy Delight
    organization: { connect: { id: 7 } },
  },
  {
    zone: Zone.CENTRAL,
    baseDistance: 1,
    fixPrice: 400, // 4 euros in cents
    kmPrice: 50, // Per kilometer price in cents (converted from 0.5 euros)
    itemId: 8, // Coffee Beans (non-perishable)
    item: { connect: { id: 8 } },
    orgId: 8, // Coffee Corner
    organization: { connect: { id: 8 } },
  },
];

export async function deleteData() {
  await prisma.item.deleteMany();
  await prisma.organization.deleteMany();
}

export async function insertAllData() {
  //delete old data when we are doing new insert
  //   deleteData();
  organizationsData.map((data) => {
    insertOrganization(data.name);
  });
  itemsData.map((data) => {
    insertItem(data.type, data.description);
  });
  pricingData.map((data) => {
    insertPricing(data.orgId, data.itemId, data.zone, data.baseDistance,data.fixPrice,data.kmPrice);
  });
}
insertAllData();
