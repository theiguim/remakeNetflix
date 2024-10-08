import express from "express";
import {sequelize} from "./database"
import { adminJs, adminJsRouter } from "./adminjs";
import path from "path"
import {router} from "./routers"
import cors from "cors"

const app = express();

app.use(cors());

app.use(express.static(path.join("public")));

app.use(express.json());

app.use(adminJs.options.rootPath, adminJsRouter);

app.use(router);

const PORT = 3000;

app.listen(PORT, ()=> {
    sequelize.authenticate().then(()=>{
        console.log("DB connection sucessfull");
    })
    console.log(`Server running on ${PORT}`)
});