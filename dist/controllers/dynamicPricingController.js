"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dynamicPricing = void 0;
const client_1 = require("@prisma/client");
const zod_1 = __importDefault(require("zod"));
const globalContants_1 = require("../globalContants");
const prisma = new client_1.PrismaClient();
//we are using zod for data validation
const headersSchema = zod_1.default.object({
    zone: zod_1.default.string().transform((str) => str.toUpperCase()),
    organization_id: zod_1.default.string().transform((str) => parseInt(str, 10)),
    total_distance: zod_1.default.string().transform((str) => parseInt(str, 10)),
    item_type: zod_1.default.string().transform((str) => str.toUpperCase()),
});
const dynamicPricing = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parsedHeaders = headersSchema.safeParse(req.headers);
    console.log(parsedHeaders);
    if (!parsedHeaders.success) {
        // Handle parsing errors (e.g., return error response)
        return res.status(400).json({ message: "Invalid headers format" });
    }
    const { zone, organization_id, total_distance, item_type } = parsedHeaders.data;
    const zoneSchema = zod_1.default.nativeEnum(globalContants_1.Zone);
    const zoneCheck = zoneSchema.safeParse(zone);
    const itemTypeSchema = zod_1.default.nativeEnum(globalContants_1.Type);
    const itemCheck = itemTypeSchema.safeParse(item_type);
    if (!itemCheck.success && !zoneCheck.success)
        return res.status(400).json({ message: "Invalid data format" });
    const result = yield prisma.pricing.findFirst({
        where: {
            orgId: organization_id,
            zone: zone,
            item: { type: item_type },
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
    const itemKmPrice = item_type === globalContants_1.Type.PERISHABLE ? 1.5 : 1;
    const distancePrice = distanceBeyondBase * itemKmPrice * 100;
    const totalPrice = fixPrice + distancePrice;
    res.status(200).json({
        msg: `Total price for this delivery system is ${totalPrice} in cents or ${totalPrice / 100} in euros`,
    });
});
exports.dynamicPricing = dynamicPricing;
module.exports = { dynamicPricing: exports.dynamicPricing };
