import bodyParser from "body-parser";
import express, { Express, Request, Response } from "express";
import dotenv, { config } from "dotenv";
dotenv.config();
import foodDeleveryRouter from "./routes/dynamicPricingRoute";
import swaggerDocs from "./utils/swagger";
const app = express();

const port: number = parseInt(<string>process.env.PORT, 10) || 3000;

app.use(bodyParser.json());
app.use("/fooddelivery", foodDeleveryRouter);
app.get("/", (req: Request, res) => {
  res.send("yes i am alive!!!!!!!");
});

const main = () => {
  console.log("Application connected to PostgressDB ......");
  app.listen(port, () => {
    console.log(`Server is running on port 3000`);
    swaggerDocs(app, port);
  });
};

main();
