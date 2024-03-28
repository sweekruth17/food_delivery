"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use(body_parser_1.default.json());
app.get("/", (req, res) => {
    res.send("yes i am alive!!!!!!!");
});
const main = () => {
    // Connect to PostgressDB via prisma ORM
    console.log("Application connected to PostgressDB ......");
    app.listen(port, () => {
        console.log(`Server is running on port 3000`);
    });
};
main();
