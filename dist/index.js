"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const dynamicPricingRoute_1 = __importDefault(require("./routes/dynamicPricingRoute"));
const swagger_1 = __importDefault(require("./utils/swagger"));
const app = (0, express_1.default)();
const port = parseInt(process.env.PORT, 10) || 3000;
app.use(body_parser_1.default.json());
app.use("/fooddelivery", dynamicPricingRoute_1.default);
app.get("/", (req, res) => {
    res.send("yes i am alive!!!!!!!");
});
const main = () => {
    console.log("Application connected to PostgressDB ......");
    app.listen(port, () => {
        console.log(`Server is running on port 3000`);
        (0, swagger_1.default)(app, port);
    });
};
main();
