import express from 'express';
import User from './routes/User.js';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
import cors from "cors";

export const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
    useTempFiles: true
    })
);

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); // or the specific domain you want to allow
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

app.use("/api/v1", User);

app.get("/", (req, res) => {
    res.send("Welcome to Task Manager API");
});
