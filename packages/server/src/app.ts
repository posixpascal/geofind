import socialRoutes from "@colyseus/social/express";
import bodyParser from "body-parser";
import compression from "compression";  // compresses requests
import cors from "cors";
import express from "express";
import flash from "express-flash";
import lusca from "lusca";

const app = express();
// Express configuration
app.set("port", process.env.GAMESERVER_PORT);
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(flash());
app.use(cors());
app.use(lusca.xframe("SAMEORIGIN"));
app.use(lusca.xssProtection(true));

app.use("/social/", socialRoutes);
app.use("/", express.static("./public"));

export default app;
