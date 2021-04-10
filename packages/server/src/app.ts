import socialRoutes from "@colyseus/social/express";
import bodyParser from "body-parser";
import compression from "compression";  // compresses requests
import cors from "cors";
import express from "express";
import flash from "express-flash";
import lusca from "lusca";
import * as fs from "fs";

const app = express();
// Express configuration
app.set("port", 3001);
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(flash());
app.use(cors());
app.use(lusca.xframe("SAMEORIGIN"));
app.use(lusca.xssProtection(true));

app.use("/social/", socialRoutes);
app.use("/", express.static("./public"));

app.get("*", function (req, res) {
    if (req.accepts('html')) {
        // Respond with html page.
        fs.readFile(__dirname + '/../public/index.html', 'utf-8', (err, page) => {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(page);
            res.end();
        });
    } else if (req.accepts('json')) {
        res.status(404).send({error: 'Not found'});
    } else {
        res.status(404).type('txt').send('Not found');
    }
});

export default app;
