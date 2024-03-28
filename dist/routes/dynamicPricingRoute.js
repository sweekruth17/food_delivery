"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dynamicPricingController_1 = require("../controllers/dynamicPricingController");
const router = (0, express_1.Router)();
/**
 * @openapi
 * /fooddelivery/dynamicpricing:
 *   get:
 *     tags:
 *       - DynamicPricing
 *     description: Calculates dynamic delivery cost based on Zone, organization_id, total_distance and item_type
 *     parameters:
 *       - in: header
 *         name: zone
 *         required: true
 *         schema:
 *           type: string
 *           description: Zone for delivery
 *       - in: header
 *         name: organization_id
 *         required: true
 *         schema:
 *           type: string
 *           description: Organization ID
 *       - in: header
 *         name: total_distance
 *         required: true
 *         schema:
 *           type: number
 *           description: Total distance for delivery
 *       - in: header
 *         name: item_type
 *         required: true
 *         schema:
 *           type: string
 *           description: Type of item (e.g., PERISHABLE, NON_PERISHABLE)
 *     responses:
 *       200:
 *         description: Successful response with total delivery cost
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Message indicating the total cost
 *       400:
 *         description: Bad request (invalid format or data not found)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 */
router.get("/dynamicpricing", dynamicPricingController_1.dynamicPricing);
router.get("/dynamicpricing", dynamicPricingController_1.dynamicPricing);
router.get("/ok", (req, res) => {
    const { zone, organization_id, total_distance, item_type } = req.headers;
    console.log(req.headers);
    res.status(200).json({ msg: "hellllllllo" });
});
exports.default = router;
