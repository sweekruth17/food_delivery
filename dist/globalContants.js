"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Type = exports.Zone = exports.ZonePricing = exports.KmPrice = void 0;
var KmPrice;
(function (KmPrice) {
    KmPrice[KmPrice["PERISHABLE"] = 1.5] = "PERISHABLE";
    KmPrice[KmPrice["NONPERISHABLE"] = 1] = "NONPERISHABLE";
})(KmPrice || (exports.KmPrice = KmPrice = {}));
var ZonePricing;
(function (ZonePricing) {
    ZonePricing[ZonePricing["CENTRAL"] = 9] = "CENTRAL";
    ZonePricing[ZonePricing["WEST"] = 4] = "WEST";
    ZonePricing[ZonePricing["NORTH"] = 7] = "NORTH";
    ZonePricing[ZonePricing["SOUTH"] = 8] = "SOUTH";
    ZonePricing[ZonePricing["EAST"] = 6] = "EAST";
})(ZonePricing || (exports.ZonePricing = ZonePricing = {}));
var Zone;
(function (Zone) {
    Zone["CENTRAL"] = "CENTRAL";
    Zone["WEST"] = "WEST";
    Zone["NORTH"] = "NORTH";
    Zone["SOUTH"] = "SOUTH";
    Zone["EAST"] = "EAST";
})(Zone || (exports.Zone = Zone = {}));
var Type;
(function (Type) {
    Type["PERISHABLE"] = "PERISHABLE";
    Type["NONPERISHABLE"] = "NONPERISHABLE";
})(Type || (exports.Type = Type = {}));
