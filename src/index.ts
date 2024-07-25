// Import necessary libraries
import express, { Request, Response, NextFunction } from "express";
import createError from "http-errors";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import http from "http";
import "reflect-metadata";
import { AppDataSource } from "./config/data-source";
import route from "./routes";
import i18next from "./i18n";
import i18nextMiddleware from "i18next-http-middleware";

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Middleware
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(i18nextMiddleware.handle(i18next));
app.use((req: Request, res: Response, next: NextFunction) => {
  res.locals.t = req.t;
  next();
});

// Routes
app.use("", route);

// Error handling
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
    res.status(500);
    res.render("error");
});

// Init DB
AppDataSource.initialize()
    .then(() => {
        console.log('Data-source has been initialized.');
    })
    .catch((err) => {
        console.error('Error during Data-source initialization: ', err);
    });

// Serve
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
