import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import variables from "./utils/variable";

const app = express()
const port = variables.app.port

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})