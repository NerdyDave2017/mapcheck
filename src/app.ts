import express from "express";
const app = express();
import dotenv from "dotenv";
import bodyparser from "body-parser";

import connectDB from "./database";
import cors from "cors";

import errorMiddleware from "./apis/middlewares/error.middleware";

import routes from "./apis/routes/index.routes"

dotenv.config();

var whitelist = ["*"];
var corsOptions = {
  origin: whitelist,
  credentials: true,
};

app.use(cors(corsOptions));
app.set("trust proxy", 1); // trust first proxy

//Parse Request to body-parser
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(express.json());
// app.use(express.urlencoded());
app.use(express.static("public"));



// mongoDB connection
connectDB();

app.get('/', (request, response) => {
  response.send('Hello world!');
});
// Load Routers
app.use("/api/v1", routes)

app.use(errorMiddleware);

export default app;
